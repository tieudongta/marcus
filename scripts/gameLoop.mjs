
import { generateLocation } from "./utils/generationLocation.mjs";
import { showPlayerMenu, showPlayerStats, showInventory } from "./utils/playerMenu.mjs";
import { ask } from "./utils/ask.mjs";
import { visitShop } from "./utils/playerMenu.mjs";
import { generateNewQuest, completeQuest, viewActiveQuest } from "./utils/questSystem.mjs";
import { QuestSystem } from "../core/QuestSystem.mjs";
import { DeliveryQuest } from "../quests/DeliveryQuest.mjs";



export async function startGameLoop(player, travelSystem, encounterSystem) {
    const questManager = new QuestSystem();
    let active = true;

    let currentQuest = questManager.createQuestFromTemplate('deliver');
    questManager.addQuest(currentQuest);
    while (active) {
        const { from, to } = currentQuest.data;

        console.log(`\n🎯 Quest Assigned: Deliver package from ${from} to ${to}`);

        const allRoutes = travelSystem.findAllPaths(from, to);
        if (!allRoutes.length) {
            console.error("❌ No valid routes found.");
            currentQuest.status = "failed";
            continue;
        }

        const routeOptions = travelSystem.selectRoute(allRoutes);
        console.log(`\n📍 Available Routes:`);
        routeOptions.forEach((opt, i) => {
            console.log(`${i + 1}) Time: ${opt.totalTime}h, Energy: ${opt.totalEnergy}`);
            console.log(`   Path: ${opt.route.map(loc => loc.name).join(" → ")}`);
        });

        const routeIndex = parseInt(await ask("Select a route: "), 10) - 1;
        const selectedRoute = routeOptions[routeIndex];
        if (!selectedRoute) {
            console.log("⚠️ Invalid selection. Restarting...");
            continue;
        }
        player.currentLocation = from;
        currentQuest.data.route = selectedRoute.route;
        currentQuest.status = "in_progress";
        currentQuest.data.progress = 0;
        while (currentQuest.data.progress < selectedRoute.route.length - 1) {
            const current = currentQuest.data.route[currentQuest.data.progress];
            const next = currentQuest.data.route[currentQuest.data.progress + 1];
            const connection = current.connections.find(c => c.name === next.name);

            if (!connection) {
                console.error(`❌ No connection from ${current.name} to ${next.name}`);
                currentQuest.failQuest("Broken path");
                break;
            }

            let proceed = false;
            if (player.health <= 0) {
                console.log("\n💀 You have been defeated. Game Over.");
                currentQuest.status = "failed";
                proceed = true;
            }

            while (!proceed) {
                console.log(`\n🚚 Current Quest: Deliver package from ${from} to ${to}`);
                console.log(`📍 You are at ${current.name}. Next stop: ${next.name}`);
                const choice = await showPlayerMenu(player, current); // Make sure this menu shows 1-Travel, 2-Rest, etc.

                switch (choice) {
                    case 1: {
                        const travelTime = connection.duration;
                        const energyCost = travelTime * 5;

                        const before = await encounterSystem.triggerEncounter(player, current);
                        if (before?.interrupt) {
                            console.log("⚠️ Encounter interrupted travel.");
                            break;
                        }

                        player.timeSystem.advanceTime(travelTime);
                        player.loseEnergy(energyCost);
                        player.currentLocation = next;
                        travelSystem.currentLocation = next;
                        currentQuest.data.progress++;

                        console.log(`\n🚶 Arrived at ${next.name}`);
                        console.log(`🕒 Time: ${player.timeSystem.FullTime}`);
                        console.log(`⚡ Energy: ${player.energy}`);

                        const after = await encounterSystem.triggerEncounter(player, next);
                        if (after?.interrupt) {
                            console.log("⚠️ Post-arrival encounter affected progress.");
                        }

                        proceed = true;
                        break;
                    }
                    case 2:
                        player.isResting = true;
                        player.recoverEnergy(20);
                        player.heal(10);
                        player.timeSystem.advanceTime(1);
                        player.isResting = false;
                        console.log("🛌 You rested for 1 hour.");
                        break;
                    case 3:
                        player.isResting = true;
                        player.recoverEnergy(120);
                        player.heal(60);
                        player.timeSystem.advanceTime(6);
                        player.isResting = false;
                        console.log("💤 You slept for 6 hours.");
                        break;
                    case 4:
                        showInventory(player);
                        break;
                    case 5:
                        showPlayerStats(player);
                        break;
                    case 6:
                        console.log(questManager.getQuestStatusText());
                        break;
                    case 7:
                        if (current?.shops?.length) {
                            await visitShop(player, current);
                        } else {
                            console.log("🛍️ No shop at this location.");
                        }
                        break;
                    case 8:
                        console.log("👋 Exiting game.");
                        return;
                    default:
                        console.log("❓ Invalid choice.");
                }
            }

            if (currentQuest.status === "failed") break;
        }

        // Quest outcome
        if (
            currentQuest.status !== "failed" &&
            currentQuest.data.progress === currentQuest.data.route.length - 1
        ) {
            currentQuest.advanceStage();
            currentQuest.status = "completed";
            
            console.log(`\n✅ Delivery completed at ${to}!`);
            console.log(`🕒 Final Time: ${player.timeSystem.FullTime}`);
            console.log(`⚡ Final Energy: ${player.energy}`);
            questManager.grantQuestReward(player, currentQuest);
        } else if (currentQuest.status === "failed") {
            console.log(`\n❌ Quest failed. ${currentQuest.failQuest("Reason")}. Better luck next time.`);
        }

        if (player.energy <= 0 || player.health <= 0) {
            console.log("💀 You have exhausted yourself. Game Over.");
            active = false;
        }

        const cont = await ask("🎮 Start a new delivery quest? (yes/no): ");
        if (cont.trim().toLowerCase().startsWith("y")) {
            currentQuest = questManager.createQuestFromTemplate('deliver');
            questManager.addQuest(currentQuest);
        } else {
            active = false;
        }
    }

    console.log("🛑 Game session ended.");
}

