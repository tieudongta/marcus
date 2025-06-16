// utils/questSystem.mjs
import { generateLocation } from "./generationLocation.mjs";

/**
 * Generates and returns a new quest object.
 */
export function generateNewQuest() {
    const [from, to] = generateLocation();
    console.log("DEBUG generateLocation:", from, to);
    console.log(`\n📦 New Delivery Quest: ${from} → ${to}`);
    return {
        from,
        to,
        status: "assigned",
        progress: 0,
        route: [],
    };
}

/**
 * Checks if the quest can be completed at the current location.
 */
export function completeQuest(player, currentLocation) {
    if (player.activeQuest && currentLocation.name === player.activeQuest.to.name) {
        console.log(`\n✅ Quest Complete! Delivered to ${currentLocation.name}.`);
        player.activeQuest.status = "completed";
        return true;
    }
    return false;
}

/**
 * Displays the current active quest.
 */
export function viewActiveQuest(player) {
    const quest = player.activeQuest;
    if (!quest) {
        console.log("\n📭 No active quest.");
        return;
    }
    const { from, to, status } = quest;
    console.log(`\n📜 Current Quest: ${status.toUpperCase()}`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
}
