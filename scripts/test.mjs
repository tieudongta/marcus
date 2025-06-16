import { ask } from "./utils/ask.mjs";
import { setupPlayer, setupSystems } from "./utils/setupGame.mjs";
import { generateLocation } from "./utils/generateLocation.mjs";

// === INIT GAME ===
const player = setupPlayer();
const { travelSystem, encounterManager } = setupSystems(player);

console.log("\n📦 Delivery Quest: You have a cargo order!");

// === PICK DELIVERY ORDER ===
const [from, to] = generateLocation();
console.log(`\n📍 Planning route from ${from} to ${to}...`);

const allRoutes = travelSystem.findAllPaths(from, to);
if (!allRoutes.length) {
  console.error("❌ No available routes found.");
  process.exit(1);
}

const options = travelSystem.selectRoute(allRoutes);
console.log(`\nFound ${options.length} route(s). Choose one:`);
options.forEach((opt, idx) => {
  console.log(`${idx + 1}) Time: ${opt.totalTime}h, Energy: ${opt.totalEnergy}`);
  console.log(`   Route: ${opt.route.map(loc => loc.name).join(" -> ")}`);
});

const routeIndex = parseInt(await ask("Select a route (1 or 2): "), 10) - 1;
const selected = options[routeIndex];
if (!selected) {
  console.error("❌ Invalid route selection.");
  process.exit(1);
}

console.log(`\n🧭 Starting journey from ${from} to ${to}...\n`);

let currentIdx = 0;
while (currentIdx < selected.route.length - 1) {
  const current = selected.route[currentIdx];
  const next = selected.route[currentIdx + 1];
  const connection = current.connections.find(c => c.name === next.name);

  if (!connection) {
    console.error(`❌ No connection from ${current.name} to ${next.name}`);
    break;
  }

  const travelTime = connection.duration;
  const energyCost = travelTime * 5;

  const action = await ask(
    `Next: ${current.name} -> ${next.name} (${travelTime}h, -${energyCost} energy). Move now? (yes/no): `
  );

  if (action.toLowerCase().startsWith("y")) {
    const encounterBefore = await encounterManager.triggerEncounter(player, current);
    if (encounterBefore?.interrupt) {
      console.log(` Encounter prevented travel at ${current.name}`);
      continue;
    }

    player.timeSystem.advanceTime(travelTime);
    player.loseEnergy(energyCost);
    player.currentLocation = next;
    travelSystem.currentLocation = next;
    currentIdx++;

    console.log(`🚶 Arrived at ${next.name}. Now: ${player.timeSystem.FullTime}, Energy left: ${player.energy}`);

    const encounterAfter = await encounterManager.triggerEncounter(player, next);
    if (encounterAfter?.interrupt) {
      console.log(`⚠️ Post-arrival encounter at ${next.name} interrupted the flow.`);
    }

  } else {
    let proceed = false;
    while (!proceed) {
      const wait = await ask("⏳ Waiting... Ready to move on? (yes): ");
      if (wait.toLowerCase().startsWith("y")) {
        proceed = true;
      }
    }
  }
}

console.log('Delivery complete at '+to);
console.log(`📅 Current Time: ${player.timeSystem.FullTime}`);
console.log(`⚡ Remaining Energy: ${player.energy}`);
process.exit(0);
