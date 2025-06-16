import { expect } from "chai";
import { Inventory } from "../../../items/Inventory.mjs";
import { Item } from "../../../items/Item.mjs";


describe("Inventory Class", () => {
    let inventory, sword, potion;

    beforeEach(() => {
        inventory = new Inventory();
        sword = new Item({ name: "Iron Sword", type: "weapon", effect: 10 });
        potion = new Item({ name: "Health Potion", type: "potion", effect: 20, stackable: true });
    });
        it("should add a valid item to inventory", () => {
        inventory.addItem(sword);
        const containsSword = inventory.items.some(entry => entry.item.name === 'Iron Sword');
        expect(containsSword).to.be.true;
    });

    it("should increase quantity if stackable item is added again", () => {
        inventory.addItem(potion);
        inventory.addItem(potion);

        const entry = inventory.items.find(entry => entry.item.name === 'Health Potion');
        expect(entry).to.not.be.undefined;
        expect(entry.quantity).to.equal(2);
    });

    it("should treat non-stackable items as separate entries", () => {
        inventory.addItem(sword);
        inventory.addItem(sword);

        const matchingItems = inventory.items.filter(entry => entry.item.name === 'Iron Sword');
        expect(matchingItems.length).to.equal(2);
    });

    it("should not add invalid item", () => {
        const result = inventory.addItem("not-an-item");
        expect(result).to.be.false;
    });
});