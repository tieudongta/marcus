import { Material } from "../items/Material.mjs";
import { Tool } from "../items/Tool.mjs";

export class Shop {
    constructor({
        name = "General Shop",
        description = "Sell and Buy any Item",
        type = ["Any"],
        items = [],
        location = "" }) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.items = items;
    }
    listItems() {
        return this.items.map((it, i) => `${i + 1}) ${it.name} - ${it.price}g`).join("\n");
    }
    getItem(index) {
        return this.items[index];
    }
    buy(index, player) {
        const entry = this.getItem(index);
        if (!entry) return "Invalid item.";
        if (!player.spend(entry.price)) {
            return "Not enough gold.";
        }
        player.inventory.addItem(entry.itemObj);
        return `✅ Bought ${entry.name} for ${entry.price}g.`;
    }
    sell(item, player) {
        const value = Math.floor(item.value || 10);
        player.addGold(value);
        return `✅ Sold ${item.name} for ${value}g.`;
    }
}