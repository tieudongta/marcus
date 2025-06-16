import { TimeSystem } from '../src/TimeSystem.mjs';
import { Player } from '../src/Player.mjs';
import { Activity } from '../src/Activity.mjs';

async function simulateControlledDay() {
  const logger = msg => console.log(`[LOG] ${msg}`);
  const timeSystem = new TimeSystem(6, 1, [], logger);
  const player = new Player('Jack', 1, { str: 8, int: 12, agi: 10 });

  // Register player for time updates (passive stat decay, etc.)
  timeSystem.register(player);

  // Initial conditions
  player.stats.energy.current = 80;
  player.stats.hunger.current = 80;
  player.wallet.add(10);

  console.log(`Simulation begins: Day ${timeSystem.currentDay}, Hour ${timeSystem.currentTime}`);

  // Define basic activities
  const eatActivity = new Activity('Eat (Free)', 1, {}, { hunger: +40 });
  const restActivity = new Activity('Rest', 1, {}, { energy: +20, hunger: -5 });
  const exploreActivity = new Activity('Explore', 1, {}, { energy: -10, hunger: -5, xp: +5 });

  // Simulate one full day (from current time until hour 24)
  while (timeSystem.currentDay === 1 && timeSystem.currentTime < 24) {
    console.log(`\n[Hour ${timeSystem.currentTime}]`);

    let chosenActivity = null;

    if (player.stats.hunger.current < 50) {
      chosenActivity = eatActivity;
    } else if (player.stats.energy.current < 40) {
      chosenActivity = restActivity;
    } else {
      chosenActivity = exploreActivity;
    }

    console.log(`Performing: ${chosenActivity.name}`);
    chosenActivity.perform(player);
    timeSystem.advanceTime(1); // Always 1 hour per action

    console.log(`Stats -> Energy: ${player.stats.energy.current.toFixed(1)}, Hunger: ${player.stats.hunger.current.toFixed(1)}, XP: ${player.xp}`);
  }

  console.log(`\nEnd of Day ${timeSystem.currentDay}. Final Stats:`);
  console.log(`Energy: ${player.stats.energy.current.toFixed(1)} / ${player.stats.energy.max}`);
  console.log(`Hunger: ${player.stats.hunger.current.toFixed(1)} / ${player.stats.hunger.max}`);
  console.log(`Gold: ${player.wallet.balance}g, XP: ${player.xp}`);
}

simulateControlledDay();
