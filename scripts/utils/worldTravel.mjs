import { TravelSystem } from "../../core/TravelSystem.mjs";
import { ask, closeInput } from "./input.mjs";

export async function handleTravel(player) {
    const travelSystem = new TravelSystem(player);
    travelSystem.showMap();

    const options = travelSystem.getAvailableDestination();
    if (options.length === 0) {
        console.log("❌ No destinations available from here.");
        return;
    }

    console.log("\n🌍 Where would you like to travel?");
    options.forEach((loc, idx) => {
        const duration = travelSystem.currentLocation.connections.find(c => c.name === loc.name)?.duration ?? '?';
        console.log(`${idx + 1}) ${loc.name} (${duration}h)`);
    });

    const input = await ask("Enter destination number: ");
    const index = parseInt(input, 10) - 1;
    const chosen = options[index];

    if (!chosen) {
        console.log("❌ Invalid choice.");
        return;
    }

    const success = travelSystem.moveTo(chosen.name);
    if (success) {
        console.log(`✨ You have arrived at ${chosen.name}.`);
        console.log(chosen.description);
    }
}
