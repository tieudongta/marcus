import { Item } from "../../items/Item.mjs";
import { handleCombat } from "./combatHandler.mjs";

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
    handler: async (player, { ask, choice }) => {
      console.log("🧑‍🦱 The merchant greets you warmly and offers a rare trinket.");
      return { interrupt: false };
    },
  },
  {
    id: "traveling_bard",
    name: "Traveling Bard",
    type: "social",
    description: "A bard sings tales in the town square, drawing a small crowd.",
    race: "Elf",
    region: ["city", "village"],
    timeOfDay: ["Evening"],
    handler: async (player, { ask, choice }) => {
      console.log("🎶 The bard’s tale lifts your spirits. Morale +1.");
      player.morale = (player.morale || 0) + 1;
      return { interrupt: false };
    },
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
    handler: async (player, { ask, choice }) => {
      console.log("🌉 The bridge is out. You must find a way across or around.");
      return { interrupt: false };
    },
  },
  {
    id: "mudslide",
    type: "environment",
    name: "Mudslide",
    race: "Any",
    region: ["hills", "jungle"],
    timeOfDay: ["Morning", "Afternoon"],
    description: "The path is buried in thick, wet mud. Progress is slow.",
    handler: async (player, { ask, choice }) => {
      console.log("🌧️ Your boots sink into heavy muck. Lose 1 hour.");
      player.timeSystem.advanceTime(1);
      return { interrupt: false };
    },
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
    handler: async (player, { ask, choice }) => {
      console.log("🌿 You gather herbs and restore 10 health.");
      //TODO: if health === healthMax addItem
      player.health = Math.min(player.maxHealth, player.health + 10);
      return { interrupt: false };
    },
  },
  {
    id: "abandoned_cart",
    type: "resource",
    name: "Abandoned Cart",
    region: ["road", "plains"],
    timeOfDay: ["Afternoon"],
    race: "Any",
    description: "An abandoned supply cart lies beside the road.",
    handler: async (player, { ask, choice }) => {
      console.log("🛒 You salvage some rations and cloth.");
      player.inventory.addItem(new Item({ name: "Rations", quantity: 2 }));
      return { interrupt: false };
    },
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
    handler: async (player, { ask, choice }) => {
      console.log("📜 You discover old runes that hint at a forgotten empire.");
      return { interrupt: false };
    },
  },
  {
    id: "singing_stone",
    type: "lore",
    name: "Singing Stone",
    region: ["mountains", "ruins"],
    timeOfDay: ["Night"],
    race: "Dwarf",
    description: "A stone hums with a deep resonance. Your bones vibrate as you approach.",
    handler: async (player, { ask, choice }) => {
      console.log("🎵 A voice echoes in your mind... knowledge or madness?");
      return { interrupt: false };
    },
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
    prompt: "Do you give rations? (yes/no)",
    handler: async (player, { ask, choice }) => {
      if (choice?.toLowerCase() === "yes") {
        player.inventory.removeItem("Bread", 1);
        console.log("❤️ The child smiles. Morale +1.");
        player.morale = (player.morale || 0) + 1;
      } else {
        console.log("😞 The child walks away hungry.");
      }
      return { interrupt: false };
    },
  },
  {
    id: "injured_enemy",
    type: "moral",
    name: "Injured Enemy",
    region: ["battlefield", "road"],
    timeOfDay: ["Afternoon"],
    race: "Orc",
    description: "An enemy soldier lies bleeding. He looks up, terrified. Mercy or blade?",
    prompt: "Will you help him or finish him off? (help/kill)",
    handler: async (player, { ask, choice }) => {
      let input = choice;
      if (!input && ask) {
        input = await ask?.("Will you help him or finish him off? (help/kill)");
      }
      if (!input) {
        console.log("No input received, moving on...");
        return { interrupt: false };
      }
      input = input.trim().toLowerCase();

      if (input === "help") {
        console.log("🕊️ You tend to his wounds. Karma +1.");
        player.karma = (player.karma || 0) + 1;
      } else {
        console.log("🗡️ You end his suffering quickly.");
      }
      return { interrupt: false };
    },
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
