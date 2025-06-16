import { Item } from "../../items/Item.mjs";
import { Potion } from "../../items/Potion.mjs";
import { Weapon } from "../../items/Weapon.mjs";
import { Tool } from "../../items/Tool.mjs";
import { Material } from "../../items/Material.mjs";
import { itemPresets } from '../../data/items/itemPresets.mjs'





export function createItem(config) {
    const resolvedConfig = typeof config === "string" ? itemPresets[config] : config;

    if (!resolvedConfig || typeof resolvedConfig !== "object") {
        throw new Error("Invalid config object");
    }

    switch (resolvedConfig.type) {
        case "weapon":
            return new Weapon(resolvedConfig);
        case "potion":
            return new Potion(resolvedConfig);
        case "tool":
            return new Tool(resolvedConfig);
        case "material":
            return new Material(resolvedConfig);
        default:
            return new Item(resolvedConfig);
    }
}
