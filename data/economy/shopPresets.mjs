import { Shop } from "../../economy/Shop.mjs";
import { itemPresets } from "../items/itemPresets.mjs";
export const shopPresets = {
  generalStore: new Shop({
    name: "General Store",
    description: "A shop offering a variety of goods for adventurers.",
    type: ["general"],
    items: Object.values(itemPresets).map(item => ({
      name: item.name,
      price: item.price || 10,
      itemObj: item,
    })),
  }),

  weaponSmith: new Shop({
    name: "The Iron Anvil",
    description: "Smithy specializing in weapons and armor.",
    type: ["weapon", "armor"],
    items: Object.values(itemPresets)
      .filter(item => item.type === "weapon" || item.type === "armor")
      .map(item => ({
        name: item.name,
        price: item.price || 20,
        itemObj: item,
      })),
  }),

  potionShop: new Shop({
    name: "Alchemist's Corner",
    description: "Potions and elixirs for all your needs.",
    type: ["potion"],
    items: Object.values(itemPresets)
      .filter(item => item.type === "potion")
      .map(item => ({
        name: item.name,
        price: item.price || 15,
        itemObj: item,
      })),
  }),

  materialDepot: new Shop({
    name: "Miner's Supply",
    description: "Materials and crafting components.",
    type: ["material"],
    items: Object.values(itemPresets)
      .filter(item => item.type === "material")
      .map(item => ({
        name: item.name,
        price: item.price || 5,
        itemObj: item,
      })),
  }),

  toolStore: new Shop({
    name: "Tool Shed",
    description: "Tools for adventurers and craftsmen.",
    type: ["tool"],
    items: Object.values(itemPresets)
      .filter(item => item.type === "tool")
      .map(item => ({
        name: item.name,
        price: item.price || 25,
        itemObj: item,
      })),
  }),

  foodMarket: new Shop({
    name: "Fresh Market",
    description: "Edible goods and delicacies.",
    type: ["food", "item"],
    items: Object.values(itemPresets)
      .filter(item => item.type === "food" || item.type === "item")
      .map(item => ({
        name: item.name,
        price: item.price || 10,
        itemObj: item,
      })),
  }),
};
