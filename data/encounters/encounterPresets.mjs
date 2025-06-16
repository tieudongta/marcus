import { Item } from "../../items/Item.mjs";
import { handleCombat } from "./combatHandler.mjs";
import { handleEnvironmentEncounter } from "./environmentHandler.mjs";
import { handleLoreEncounter } from "./loreHandler.mjs";
import { handleMoralEncounter } from "./moralHandler.mjs";
import { handleResourceEncounter } from "./resourceHandler.mjs";
import { handleSocialEncounter } from "./socialHandler.mjs";

export const encounterPresets = [
  // --- COMBAT ---
  {
    id: 'wolf',
    name: 'Pack of Wolves',
    type: 'combat',
    description: 'A hungry pack of wolves surrounds the party, eyes glowing in the dark.',
    race: 'Beast',
    region: ['forest', 'mountains'],
    timeOfDay: ['Morning','Night'],
    difficulty: 'easy',
    handler: handleCombat,
    prompt: "You hear rustling in the bushes. You feel danger inside. Do you want to go ahead? Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },
  {
    id: 'bandit',
    name: 'Bandit Ambush',
    type: 'combat',
    description: 'Thieves leap from the brush, blades drawn.',
    race: 'Human',
    region: ['road', 'forest', 'hills'],
    timeOfDay: ['Afternoon', 'Night'],
    difficulty: 'medium',
    handler: handleCombat,
    prompt: "A passenger told you there were bandits ahead. Do you keep going on? Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },

  // --- SOCIAL ---
  {
    id: "wandering_merchant",
    name: "Wandering Merchant",
    type: "social",
    description: "A merchant with a rickety cart offers you goods and a story.",
    race: 'Human',
    region: ["road", "forest"],
    timeOfDay: ["Morning", "Afternoon"],
    difficulty: 'easy',
    handler: handleSocialEncounter,
    prompt: "🧑‍🦱 The merchant greets you warmly and offers a rare trinket. Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },
  {
    id: "traveling_bard",
    name: "Traveling Bard",
    type: "social",
    description: "A bard sings tales in the town square, drawing a small crowd.",
    race: "Elf",
    region: ["city", "village"],
    timeOfDay: ["Evening"],
    handler: handleSocialEncounter,
    prompt: "The bard is very talented. Do you want to stop by? Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },

  // --- ENVIRONMENT ---
  {
    id: "collapsed_bridge",
    type: "environment",
    name: "Collapsed Bridge",
    race: "Any",
    region: ["river", "mountains"],
    timeOfDay: ["Any"],
    description: "A stone bridge has collapsed. Crossing will take skill or time.",
    handler: handleEnvironmentEncounter,
    prompt: "🌉 The bridge is out. You must find a way across or around. Do you go across? Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },
  {
    id: "mudslide",
    type: "environment",
    name: "Mudslide",
    race: "Any",
    region: ["hills", "jungle"],
    timeOfDay: ["Morning", "Afternoon"],
    description: "The path is buried in thick, wet mud. Progress is slow.",
    handler: handleEnvironmentEncounter,
    prompt: "🌧️ You decided to go ahead. Choose an action (yes/no): ",
    choices: ["Yes", "No"]
  },

  // --- RESOURCE ---
  {
    id: "healing_herbs",
    type: "resource",
    name: "Healing Herbs",
    region: ["forest", "hills"],
    timeOfDay: ["Morning"],
    race: "Elf",
    description: "You spot a patch of glowing green herbs.",
    handler: handleResourceEncounter,
    prompt: "🌿 The herbs are valuable and can restore up to 10 health. Do you want to stop and collect? Choose an action (yes/no): ",
    choices: ["yes", "no"]
  },
  {
    id: "abandoned_cart",
    type: "resource",
    name: "Abandoned Cart",
    region: ["road", "plains"],
    timeOfDay: ["Afternoon"],
    race: "Any",
    description: "An abandoned supply cart lies beside the road.",
    handler: handleResourceEncounter,
    prompt: "🛒 There might be some valuable things inside the cart. Do you want to stop and have a look. Choose an action (yes/no): ",
    choices: ["yes", "no"]
  },

  // --- LORE ---
  {
    id: "ancient_tablet",
    type: "lore",
    name: "Ancient Tablet",
    region: ["desert", "ruins"],
    timeOfDay: ["Any"],
    race: "Orc",
    description: "A half-buried tablet etched with runes stands before you.",
    handler: handleLoreEncounter,
    prompt: "📜 The old runes look intriguing. Do you want to stop by and have a look. Choose an action (yes/no): ",
    choices: ["yes", "no"]
  },
  {
    id: "singing_stone",
    type: "lore",
    name: "Singing Stone",
    region: ["mountains", "ruins"],
    timeOfDay: ["Night"],
    race: "Dwarf",
    description: "A stone hums with a deep resonance. Your bones vibrate as you approach.",
    handler: handleLoreEncounter,
    prompt: "🎵 A voice echoes in your mind... knowledge or madness?",
    choices: ["yes", "no"]
  },

  // --- MORAL ---
  {
    id: "begging_child",
    type: "moral",   
    name: "Hungry Child",
    region: ["city", "road"],
    timeOfDay: ["Any"],
    race: "Halfling",
    description: "A dirty child asks for food with tearful eyes.",
    
    handler: handleMoralEncounter,
    prompt: "Do you want to give the poor kid some food? (yes/no)",
    choices: ["yes", "no"]
  },
  {
    id: "injured_enemy",
    type: "moral",
    name: "Injured Enemy",
    region: ["battlefield", "road"],
    timeOfDay: ["Afternoon"],
    race: "Orc",
    description: "An enemy soldier lies bleeding. He looks up, terrified. Mercy or blade?",
    handler: handleMoralEncounter,
    prompt: "Will you finish him off? Choose an action (yes/no)",
    choices: ["yes", "no"]
  },

  // --- RANDOM ---
  {
    id: "lucky_coin",
    type: "random",
    name: "Lucky Coin",
    region: ["forest", "road"],
    race: "Any",
    timeOfDay: ["Any"],
    description: "You find a shiny coin glinting in the dirt.",
    handler: async (player, { ask, choice }) => {
      console.log("🪙 You feel lucky. Luck +1 for today!");
      player.luck = (player.luck || 0) + 1;
      return { interrupt: false };
    },
  },
  {
    id: "mysterious_fog",
    type: "random",
    name: "Mysterious Fog",
    region: ["swamp", "hills"],
    race: "Any",
    timeOfDay: ["Night", "Dawn"],
    description: "A thick fog rolls in. Shapes dance in the mist, and you feel disoriented.",
    handler: async (player, { ask, choice }) => {
      console.log("🌫️ You wander in circles. Lose 5 energy.");
      player.loseEnergy(5);

      return { interrupt: false };
    },
  },
];
