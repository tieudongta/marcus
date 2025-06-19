import { Character } from "../characters/Character.mjs";
import { Location } from "../world/Location.mjs";
import { TimeSystem } from "../core/TimeSystem.mjs";
import { TravelSystem } from "../core/TravelSystem.mjs";
import { EncounterSystem } from "../core/EncounterSystem.mjs";
import { encounterPresets } from "../data/encounters/encounterPresets.mjs";
import { ask } from "./utils/ask.mjs";
import { startGameLoop } from "./gameLoop.mjs";
import playerInstance from "./utils/playerInstance.mjs";
import { QuestSystem } from "../core/QuestSystem.mjs";
import { KillQuest } from "../quests/KillQuest.mjs";
// const player = new Character({
//   name: "Hero",
//   race: "Elf",
//   energy: 100,
//   currentLocation: Location.fromName("Elaria"),
//   timeSystem: new TimeSystem(),
// });
// player.agility = 10;

const player = playerInstance;
player.activeQuests = player.activeQuests || [];
const travelSystem = new TravelSystem(player);
travelSystem.currentLocation = player.currentLocation;
const questManager = new QuestSystem(player);
const encounterSystem = new EncounterSystem(encounterPresets, { ask, questManager });
//console.error(player,encounterSystem, questManager);
console.log("🎮 Welcome to the Delivery Quest RPG!");
await startGameLoop(player, travelSystem, encounterSystem, questManager);
