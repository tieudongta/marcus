import { Item } from "../items/Item.mjs";

export class Inventory {
    constructor() {
        this.items = []; // Each item has: { item: Item, quantity: number }
    }
    mergeInventory(otherInventory) {
        if (!(otherInventory instanceof Inventory)) {
            console.warn("mergeInventory failed: not an Inventory instance");
            return false;
        }

        for (const { item, quantity } of otherInventory.items) {
            for (let i = 0; i < quantity; i++) {
                this.addItem(item); // relies on existing stackable logic
            }
        }

        console.log("Inventory merged successfully.");
        return true;
    }

    hasItem(item) {
        if (!item) return false; // Prevents error when item is undefined
        return this.items.some(entry => entry.item.name === item.name);
    }
    getItemByName(name) {
        const entry = this.items.find(entry => entry.item.name === name);
        return entry ? entry.item : null;
    }

    addItem(item) {
        if (!(item instanceof Item)) {
            console.warn("addItem failed: not an instance of Items");
            return false;
        }

        // If item is stackable, check if it's already in inventory
        if (item.stackable) {
            const existing = this.items.find(entry => entry.item.name === item.name);
            if (existing) {
                existing.quantity += 1;
                console.log(`Stacked 1 more ${item.name}. Now have ${existing.quantity}.`);
                return true;
            }
        }

        // Add new item entry
        this.items.push({ item, quantity: 1 });
        console.log(`Added ${item.name} to inventory.`);
        return true;
    }

    removeItem(item) {
        if (!(item instanceof Item)) return false;

        const index = this.items.findIndex(entry => entry.item.name === item.name);

        if (index === -1) {
            console.log(`${item.name} not found!`);
            return false;
        }

        if (this.items[index].item.stackable && this.items[index].quantity > 1) {
            this.items[index].quantity -= 1;
            console.log(`Removed one ${item.name}. Remaining: ${this.items[index].quantity}`);
        } else {
            this.items.splice(index, 1);
            console.log(`Removed ${item.name} from inventory.`);
        }

        return true;
    }
    removeItemByName(name) {
        const entry = this.items.find(entry => entry.item.name === name);
        if (!entry) {
            console.log(`${name} not found in inventory.`);
            return false;
        }
        return this.removeItem(entry.item);
    }

    getItemList() {
        return this.items
            .map(({ item, quantity }, index) => `${index + 1}) ${item.name} x${quantity}`)
            .join("\n");
    }

    useItem(name, target) {
        const entry = this.items.find(entry => entry.item.name === name);
        if (!entry) {
            console.log(`${name} not found in inventory.`);
            return false;
        }

        if (typeof entry.item.consume === "function") {
            entry.item.consume(target);
            entry.quantity--;
            if (entry.quantity <= 0) {
                this.removeItem(entry.item);
            }
            console.log(`${target.name} used ${name}.`);
            return true;
        }

        console.log(`${name} is not usable.`);
        return false;
    }

}
