import chalk from "chalk";
import { ItemObjective, LocationObjective, TimeObjective } from "./objectives/Objective.mjs";
import { Location } from "../world/Location.mjs";
import { formatTimeLeft } from "../utils/formatDateTime.mjs";
import { Item } from "../items/Item.mjs";
import { itemPresets } from "../data/items/itemPresets.mjs";

export class Quest {
  constructor({ id, type, name, description, reward, stages = [], trigger }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.reward = reward;
    this.completed = false;
    this.stages = stages;
    this.currentStage = 0;
    this.trigger = trigger || null;
  }
  start(player) {
    console.log(chalk.magenta("📜 Starting quest..."));

    // Only auto-provide items for deliver quests
    if (this.type === "deliver") {
      const stage = this.stages[this.currentStage];
      for (const obj of stage.objectives) {
        console.log(player);
        if (obj instanceof ItemObjective) {
          const itemAlreadyHeld = player.inventory.hasItemById(obj.item);
          if (!itemAlreadyHeld) {
            const item = new Item(itemPresets[obj.item]);
            player.addItemToInventory(item);
            console.log(chalk.yellow("Object added: "), item);
            console.log(chalk.yellow(`📦 Player received quest item: ${item.name}`));
          }
        }
      }
    }
  }

  update(player) {
    const stage = this.stages[this.currentStage];

    for (const obj of stage.objectives) {
      if (obj instanceof LocationObjective && obj.validate(player.currentLocation)) {
        obj.completed = true;
      }
      if (obj instanceof ItemObjective && player.inventory.hasItemById(obj.item)) {
        obj.completed = true;
      }
      if (obj instanceof TimeObjective && obj.validate(Date.now())) {
        obj.completed = true;
      }
    }

    const allComplete = stage.objectives.every(o => o.completed);
    if (allComplete) {
      if (this.currentStage < this.stages.length - 1) {
        this.currentStage++;
        console.log(chalk.blue(`➡️ Stage advanced to: ${this.stages[this.currentStage].name}`));
      } else {
        this.complete(player);
        console.log(chalk.greenBright("🏁 Quest completed!"));
      }
    }
  }

  get currentObjectives() {
    return this.stages[this.currentStage]?.objectives || [];
  }

  complete(player) {
    this.completed = true;
    this.reward?.grant(player);
    player.addCompletedQuest(this);
  }
  checkCompleted() {
    const allComplete = this.currentObjectives.every(obj => obj.isCompleted());
    if (allComplete) {
      this.advanceStage();
    }
  }
}
export class FetchQuest extends Quest {
  constructor({ id, name, type, description, reward, stages, trigger }) {
    super({ id, name,type, description, reward, stages, trigger });
  }
}