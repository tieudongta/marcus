import { Weapon } from "../../items/Weapon.mjs";
import { Potion } from "../../items/Potion.mjs";
import { Item } from "../../items/Item.mjs";
import { Material } from "../../items/Material.mjs";
import { Tool } from "../../items/Tool.mjs";
export const itemPresets = {
    //Weapon
    wooden_sword: new Weapon({
    name: "Wooden Sword",
    description: "A sturdy basic sword.",
    attackPower: 12,
    price: 10,
    durability: 100,
    rarity: "common"
  }),
  bronze_sword: new Weapon({
    name: "Bronze Sword",
    attackPower: 10,
    durability: 80,
    price: 30,
    stackable: false,
    rarity: "common",
  }),
  iron_sword: new Weapon({
    name: "Iron Sword",
    attackPower: 20,
    durability: 100,
    price: 50,
    stackable: false,
    rarity: "common",
  }),
  elf_dagger : new Weapon({
    name: "Elven Dagger",
    description: "Swift and deadly.",
    attackPower: 8,
    price: 40,
    durability: 80,
    rarity: "uncommon"
  }),
  
//Potion
  healing_herbs: new Potion({
    name: "Healing Herbs",
    description: "Heals 10 HP",
    effectAmount: 10,
    price: 10,
    rarity: "common"
  }),
  minor_health_potion: new Potion({
    name: "Minor Healing Potion",
    description: "Heals 20 HP",
    effectAmount: 20,
    price: 15,
    rarity: "common"
  }),
  health_potion: new Potion({
    name: "Health Potion",
    description: "Restores 50 HP",
    effectAmount: 50,
    price: 25,
    stackable: true,
    rarity: "common",
  }),
  energy_elixir: new Potion({
    name: "Energy Elixir",
    description: "Restores 15 energy",
    effectAmount: 15,
    price: 18,
    rarity: "common"
  }),
// Material
  cheese: new Item({
    name: "Cheese Piece",
    description: "Might attract rodents.",
    type: "item",
    durability: 0,
    stackable: true,
    price: 5,
    rarity: "common"
  }),
  sealed_scroll: new Item({
    name: "Sealed Scroll",
    description: "The scroll is sealed. You don't know what inside.",
    type: "item",
    durability: 0,
    stackable: true,
    price: 0,
    rarity: "common"
  }),

  fur: new Item({
    name: "Rat Fur",
    description: "Soft but smelly.",
    type: "material",
    durability: 10,
    stackable: true,
    price: 8,
    rarity: "common"
  }),
  magic_scroll: new Item({
    name: "Magic Scroll",
    description: "Unknown magic scroll.",
    type: "magic",
    durability: 10,
    stackable: true,
    price: 100,
    rarity: "rare"
  }),
  package: new Item({
    name: "Package",
    description: "A package to deliver.",
    type: "item",
    durability: 10,
    stackable: false,
    price: 1000,
    rarity: "common"
  }),
  bread: new Item({
    name: "Bread",
    description: "Not good food.",
    type: "item",
    durability: 10,
    stackable: true,
    price: 1,
    rarity: "common"
  }),
  iron_shard: new Material({
    name: "Iron Shard",
    description: "Used to enhance basic weapons.",
    effect: "enhance",
    boostValue: 5,
    price: 10,
    rarity: "common"
  }),
  crystal_powder: new Material({
    name: "Crystal Powder",
    description: "Used to repair magical tools.",
    effect: "repair",
    boostValue: 10,
    price: 20,
    rarity: "rare"
  }),
  // Tool
  mining_pick: new Tool({
    name: "Mining Pick",
    description: "Can be used to gather minerals.",
    effect: "gather",
    boostValue: 0,
    price: 30,
    durability: 40,
    rarity: "common"
  }),
  spell_pen: new Tool({
    name: "Enchanter's Spell Pen",
    description: "Pen used writing Spell.",
    effect: "enhance",
    boostValue: 8,
    price: 45,
    durability: 30,
    rarity: "uncommon"
  }),
  legendary_amulet: new Item({
    name: "Legendary Amulet",
    description: "Unknown Amulet.",
    type: "item",
    durability: 10,
    stackable: true,
    price: 1,
    rarity: "epic"
  }),
};
