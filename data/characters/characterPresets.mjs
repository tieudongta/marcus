//data/characters/characterPresets.mjs
export const characterConfigs = {
  goblin: {
    name: "Goblin",
    level: 1,
    race: "goblin",
    walletInitial: 5,
    inventory: ["bronze_sword", "health_potion"],
    statTemplate: ["goblin","normal"],
  },
  rat: {
    name: "Giant Rat",
    level: 1,
    race: 'mammal',
    walletInitial: 5,
    inventory: ["cheese", "fur"],
    statTemplate: ["rat"],
  },
  orc: {
    name: "Orc Warrior",
    race: "orc",
    level: 1,
    walletInitial: 20,
    inventory: ["bronze_sword", "health_potion", "iron_sword"],
    statTemplate: ["orc"],
  },
  wolf: {
    name: "Wolf",
    race: "mammal",
    level: 1,
    walletInitial: 20,
    inventory: ["bronze_sword", "health_potion", "iron_sword"],
    statTemplate: ["orc"],
  },
  bandit: {
    name: "Bandit",
    race: "human",
    level: 1,
    walletInitial: 20,
    inventory: ["health_potion", "iron_sword"],
    statTemplate: ["strong","orc"],
  }

};