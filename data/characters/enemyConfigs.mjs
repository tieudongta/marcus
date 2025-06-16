// src/factory/data/enemyConfigs.mjs

export const enemyConfigs = {
  goblin: {
    name: "Goblin",
    level: 1,
    walletInitial: 5,
    lootTable: ["bronze_sword", "health_potion"],
    statTemplate: "normal",
    randomizeAttributes: false,
    randomizePersonality: false
  },
  rat: {
    name: "Giant Rat",
    level: 1,
    walletInitial: 5,
    lootTable: ["cheese", "fur"],
    statTemplate: "rat",
    randomizeAttributes: false,
    randomizePersonality: false
  },
  orc: {
    name: "Orc Warrior",
    level: 1,
    walletInitial: 20,
    lootTable: ["bronze_sword", "health_potion", "ironSword"],
    statTemplate: "strong",
    randomizeAttributes: false,
    randomizePersonality: false
  }
};
