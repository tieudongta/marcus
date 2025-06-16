import { shopPresets } from "../economy/shopPresets.mjs";

export const worldMap = {
  Elf_Lands: {
    race: "Elf",
    capital: "Elaria",
    towns: ["Silverbrook", "Feygrove", "Moonhollow"]
  },
  Orc_Territory: {
    race: "Orc",
    capital: "Gor'mok",
    towns: ["Grimscar", "Bloodhollow", "Skullpass"]
  },
  Human_Kingdom: {
    race: "Human",
    capital: "Valebridge",
    towns: ["Riversend", "Northhold", "Eastmere"]
  },
  Dwarf_Hold: {
    race: "Dwarf",
    capital: "Stonehearth",
    towns: ["Irondeep", "Moltenreach"]
  },
  Goblin_Wastes: {
    race: "Goblin",
    capital: "Snagtooth",
    towns: ["Muckfen", "Rustpit", "Grottop"]
  },
  Halfling_Hamlets: {
    race: "Halfling",
    capital: "Meadowhome",
    towns: ["Applebury", "Willowpond", "Hillfoot"]
  }
};
export const locations = {
  // Elf
  Elaria: { 
    name: "Elaria",
    description: "Hidden deep within an ancient, magically warded forest, where moonlight never fades and time flows gently.",
    race: "Elf",
    type: "capital",
    region: "forest",
    connections: [
      { name: "Silverbrook", duration: 2 },
      { name: "Feygrove", duration: 1 },
      { name: "Moonhollow", duration: 3 }
    ],
    shops: [shopPresets.generalStore]
  },
  Silverbrook: {
    name: "Silverbrook",
    description: "A serene riverside village known for its shimmering waters and silver birch trees.",
    race: "Elf",
    type: "town",
    region: "forest",
    connections: [
      { name: "Elaria", duration: 2 },
      { name: "Grimscar", duration: 4 },
      { name: "Riversend", duration: 3 }
    ],
    shops: []
  },
  Feygrove: {
    name: "Feygrove",
    description: "A mystical thicket where the veil between worlds is thin and nature spirits whisper.",
    race: "Elf",
    type: "town",
    region: "forest",
    connections: [
      { name: "Elaria", duration: 1 },
      { name: "Irondeep", duration: 4 }
    ],
    shops: []
  },
  Moonhollow: {
    name: "Moonhollow",
    description: "A quiet settlement bathed in eternal moonlight, perfect for elven stargazers.",
    race: "Elf",
    type: "town",
    region: "forest",
    connections: [
      { name: "Elaria", duration: 3 },
      { name: "Willowpond", duration: 3 }
    ],
    shops: []
  },

  // Orc
  "Gor'mok": {
    name: "Gor'mok",
    description: "A formidable stone fortress towering above the scorched plains of orc territory.",
    race: "Orc",
    type: "capital",
    region: "plains",
    connections: [
      { name: "Grimscar", duration: 1 },
      { name: "Bloodhollow", duration: 2 },
      { name: "Skullpass", duration: 2 }
    ],
    shops: [shopPresets.generalStore]
  },
  Grimscar: {
    name: "Grimscar",
    description: "Scarred by ancient battles, this border town is a proving ground for young warriors.",
    race: "Orc",
    type: "town",
    region: "plains",
    connections: [
      { name: "Gor'mok", duration: 1 },
      { name: "Silverbrook", duration: 4 }
    ],
    shops: []
  },
  Bloodhollow: {
    name: "Bloodhollow",
    description: "A shadowy pit of gladiatorial combat, where orcs test their might and endurance.",
    race: "Orc",
    type: "town",
    region: "plains",
    connections: [
      { name: "Gor'mok", duration: 2 },
      { name: "Rustpit", duration: 3 }
    ],
    shops: []
  },
  Skullpass: {
    name: "Skullpass",
    description: "A narrow mountain pass guarded with the bones of fallen invaders.",
    race: "Orc",
    type: "town",
    region: "mountains",
    connections: [
      { name: "Gor'mok", duration: 2 },
      { name: "Grottop", duration: 4 }
    ],
    shops: []
  },

  // Human
  Valebridge: {
    name: "Valebridge",
    description: "Bustling with trade and diplomacy, the human capital connects all corners of the realm.",
    race: "Human",
    type: "capital",
    region: "plains",
    connections: [
      { name: "Riversend", duration: 1 },
      { name: "Northhold", duration: 2 },
      { name: "Eastmere", duration: 2 }
    ],
    shops: [shopPresets.generalStore]
  },
  Riversend: {
    name: "Riversend",
    description: "A trade town at the edge of human lands, bridging cultures with Elvenkind.",
    race: "Human",
    type: "town",
    region: "plains",
    connections: [
      { name: "Valebridge", duration: 1 },
      { name: "Silverbrook", duration: 3 }
    ],
    shops: []
  },
  Northhold: {
    name: "Northhold",
    description: "A snowy outpost famed for cavalry and the Hall of Shields.",
    race: "Human",
    type: "town",
    region: "mountains",
    connections: [
      { name: "Valebridge", duration: 2 },
      { name: "Hillfoot", duration: 2 }
    ],
    shops: []
  },
  Eastmere: {
    name: "Eastmere",
    description: "A lakeside city with a bustling market and fishing docks.",
    race: "Human",
    type: "town",
    region: "lake",
    connections: [
      { name: "Valebridge", duration: 2 },
      { name: "Moltenreach", duration: 3 }
    ],
    shops: []
  },

  // Dwarf
  Stonehearth: {
    name: "Stonehearth",
    description: "A subterranean bastion carved into the heart of the mountains.",
    race: "Dwarf",
    type: "capital",
    region: "mountains",
    connections: [
      { name: "Irondeep", duration: 1 },
      { name: "Moltenreach", duration: 2 }
    ],
    shops: [shopPresets.generalStore]
  },
  Irondeep: {
    name: "Irondeep",
    description: "Renowned for its forges and master smiths, guarded by runes.",
    race: "Dwarf",
    type: "town",
    region: "mountains",
    connections: [
      { name: "Stonehearth", duration: 1 },
      { name: "Feygrove", duration: 4 }
    ],
    shops: []
  },
  Moltenreach: {
    name: "Moltenreach",
    description: "Bubbling with lava flows and ancient forge fires.",
    race: "Dwarf",
    type: "town",
    region: "volcano",
    connections: [
      { name: "Stonehearth", duration: 2 },
      { name: "Eastmere", duration: 3 }
    ],
    shops: []
  },

  // Goblin
  Snagtooth: {
    name: "Snagtooth",
    description: "A scrapyard city of cunning traps, odd markets, and clanging metal.",
    race: "Goblin",
    type: "capital",
    region: "swamp",
    connections: [
      { name: "Muckfen", duration: 1 },
      { name: "Rustpit", duration: 2 },
      { name: "Grottop", duration: 2 }
    ],
    shops: [shopPresets.generalStore]
  },
  Muckfen: {
    name: "Muckfen",
    description: "A swampy bog of shanties and scavenger dens.",
    race: "Goblin",
    type: "town",
    region: "swamp",
    connections: [
      { name: "Snagtooth", duration: 1 },
      { name: "Applebury", duration: 2 }
    ],
    shops: []
  },
  Rustpit: {
    name: "Rustpit",
    description: "A metal scrapyard turned weapon workshop.",
    race: "Goblin",
    type: "town",
    region: "swamp",
    connections: [
      { name: "Snagtooth", duration: 2 },
      { name: "Bloodhollow", duration: 3 }
    ],
    shops: []
  },
  Grottop: {
    name: "Grottop",
    description: "A damp cavern outpost packed with explosive surprises.",
    race: "Goblin",
    type: "town",
    region: "swamp",
    connections: [
      { name: "Snagtooth", duration: 2 },
      { name: "Skullpass", duration: 4 }
    ],
    shops: []
  },

  // Halfling
  Meadowhome: {
    name: "Meadowhome",
    description: "A pastoral paradise of round hills, flower fields, and pipe smoke.",
    race: "Halfling",
    type: "capital",
    region: "plains",
    connections: [
      { name: "Applebury", duration: 1 },
      { name: "Willowpond", duration: 2 },
      { name: "Hillfoot", duration: 2 }
    ],
    shops: [shopPresets.generalStore]
  },
  Applebury: {
    name: "Applebury",
    description: "Orchards and cider farms fill this merry hamlet.",
    race: "Halfling",
    type: "town",
    region: "plains",
    connections: [
      { name: "Meadowhome", duration: 1 },
      { name: "Muckfen", duration: 2 }
    ],
    shops: []
  },
  Willowpond: {
    name: "Willowpond",
    description: "Built beside a tranquil pond, this town lives slow and sings often.",
    race: "Halfling",
    type: "town",
    region: "plains",
    connections: [
      { name: "Meadowhome", duration: 2 },
      { name: "Moonhollow", duration: 3 }
    ],
    shops: []
  },
  Hillfoot: {
    name: "Hillfoot",
    description: "A burrow-lined hilltop home to clever traders and fat cats.",
    race: "Halfling",
    type: "town",
    region: "hills",
    connections: [
      { name: "Meadowhome", duration: 2 },
      { name: "Northhold", duration: 2 }
    ],
    shops: []
  }
};


