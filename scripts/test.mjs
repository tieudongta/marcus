import chalk from "chalk";
import playerInstance from "./utils/playerInstance.mjs";
import { FetchQuest } from "../quests/Quest.mjs";
import { questPresets } from "../data/quests/questTemplates.mjs";
import { QuestSystem } from "../core/QuestSystem.mjs";
import { QuestFactory } from "../factory/quests/QuestFactory.mjs";
import { Objective } from "../quests/objectives/Objective.mjs";
import { locations } from "../data/world/locationPresets.mjs";
import { Location } from "../world/Location.mjs";
import { itemPresets } from "../data/items/itemPresets.mjs";
import { Item } from "../items/Item.mjs";
import { startGameLoop } from "./gameLoop.mjs";
import playerInstance from "./utils/playerInstance.mjs";
import { TravelSystem } from "../core/TravelSystem.mjs";
import { EncounterSystem } from "../core/EncounterSystem.mjs";
import { encounterPresets } from "../data/encounters/encounterPresets.mjs";
import { QuestSystem } from "../core/QuestSystem.mjs";
import { ask } from "./utils/ask.mjs";

// DOM Elements
const logEl = document.getElementById("log");
const inputEl = document.getElementById("player-input");
const submitBtn = document.getElementById("submit-button");

let inputResolver = null;

// Override `ask` to use UI
function logText(text) {
  logEl.innerHTML += text + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

function overrideAsk(promptText) {
  logText(`📝 ${promptText}`);
  return new Promise((resolve) => {
    inputResolver = resolve;
  });
}

// Attach input handler
submitBtn.addEventListener("click", () => {
  if (inputResolver) {
    const value = inputEl.value;
    inputEl.value = "";
    logText(`👉 ${value}`);
    inputResolver(value);
    inputResolver = null;
  }
});

// Re-bind `ask` globally
const globalAsk = overrideAsk;
Object.defineProperty(window, "ask", {
  value: globalAsk,
  writable: false,
});

// Patch `ask` module
import * as askModule from "./utils/ask.mjs";
askModule.ask = globalAsk;

// Start game
(async () => {
  const player = playerInstance;
  const travelSystem = new TravelSystem(player);
  travelSystem.currentLocation = player.currentLocation;
  const questManager = new QuestSystem(player);
  const encounterSystem = new EncounterSystem(encounterPresets, { ask: globalAsk, questManager });

  logText("🎮 Welcome to the Delivery Quest RPG!");
  await startGameLoop(player, travelSystem, encounterSystem, questManager);
})();

function displayQuest(quest) {
  console.log(chalk.bold.cyan(`\n🎯 QUEST: ${quest.name}`));
  console.log(chalk.gray(quest.description));

  console.log(chalk.yellowBright(`\n📍 Stage ${quest.currentStage + 1}/${quest.stages.length}: ${quest.stages[quest.currentStage].name}`));
  console.log(chalk.dim(`   ${quest.stages[quest.currentStage].description}`));

  console.log("\n📌 Objectives:");
  const currentStage = quest.stages[quest.currentStage];
  currentStage.objectives.forEach((obj, idx) => {
    const status = obj.isCompleted() ? chalk.green("✔ Completed") : chalk.gray("✘ Incomplete");
    const desc = obj.isCompleted() ? chalk.strikethrough(obj.description) : obj.description;
    console.log(` ${chalk.bold(`#${idx + 1}`)} - ${desc} ${status}`);
  });

  const progressPercent = Math.floor(((quest.currentStage + 1) / quest.stages.length) * 100);
  const progressBar = chalk.magentaBright("█".repeat(progressPercent / 10)).padEnd(10, chalk.dim("░"));

  console.log(`\n📊 Progress: [${progressBar}] ${progressPercent}%`);

  if (quest.completed) {
    console.log(chalk.bgGreen.black.bold("\n✅ QUEST COMPLETE"));
  }
}
function arriveAtLocation(quest, locationName) {
  const locObj = quest.objectives.find(obj => obj instanceof LocationObjective);
  if (locObj && locObj.validate(locationName)) {
    locObj.completed = true;
    console.log(chalk.green(`📍 Location objective complete: ${locObj.description}`));
  } else {
    console.log(chalk.red(`❌ You are not at the correct location.`));
  }
}

const player = playerInstance;
const questManager = new QuestSystem(player);
if(questManager.availableQuests.length > 0) {
  console.log(chalk.magenta(questManager.availableQuests.map(q => q.name).join(", ")));
}
const quest = questManager.availableQuests[0];
player.acceptQuest(questManager, quest);

console.error(player.inventory);
quest.update(player);
displayQuest(quest);
quest.update(player);
displayQuest(quest);
player.currentLocation = new Location(locations["Gor'mok"]);
quest.update(player);
displayQuest(quest);