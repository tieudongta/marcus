import { expect } from "chai";
import { createItemFromConfig } from "../../../factory/items/itemFactory.mjs";
import { Weapon } from "../../../items/Weapon.mjs";
import { Potion } from "../../../items/Potion.mjs";
import { Item } from "../../../items/Item.mjs";

describe("createItemFromConfig", () => {
    it("should create a Weapon instance from string preset", () => {
        const item = createItemFromConfig("bronze_sword");
        expect(item).to.be.instanceOf(Weapon);
        expect(item.name).to.equal("Bronze Sword");
    });

    it("should create a Potion instance from string preset", () => {
        const item = createItemFromConfig("health_potion");
        expect(item).to.be.instanceOf(Potion);
        expect(item.name).to.equal("Health Potion");
    });

    it("should create an Item instance from string preset with unknown type", () => {
        const customItemConfig = {
            name: "Magic Stone",
            type: "trinket", // unknown type
            stackable: false
        };
        const item = createItemFromConfig(customItemConfig);
        expect(item).to.be.instanceOf(Item);
        expect(item.name).to.equal("Magic Stone");
    });

    it("should create a Weapon from config object", () => {
        const config = {
            name: "Steel Sword",
            type: "weapon",
            attackPower: 20,
            durability: 100,
            stackable: false
        };
        const item = createItemFromConfig(config);
        expect(item).to.be.instanceOf(Weapon);
        expect(item.attackPower).to.equal(20);
    });

    it("should throw error on invalid input", () => {
        expect(() => createItemFromConfig("nonexistent_item")).to.throw("Invalid config object");
        expect(() => createItemFromConfig(null)).to.throw("Invalid config object");
        expect(() => createItemFromConfig(undefined)).to.throw("Invalid config object");
    });
});
describe("createItemFromConfig", () => {
    it("creates a Weapon from a preset name", () => {
        const item = createItemFromConfig("bronze_sword");
        expect(item).to.be.instanceOf(Weapon);
        expect(item.name).to.equal("Bronze Sword");
        expect(item.attackPower).to.equal(10);
    });

    it("creates a Potion from a preset name", () => {
        const item = createItemFromConfig("health_potion");
        expect(item).to.be.instanceOf(Potion);
        expect(item.name).to.equal("Health Potion");
        expect(item.effectAmount).to.equal(50);
    });

    it("creates an Item when type is unknown or missing", () => {
        const item = createItemFromConfig({
            name: "Unknown Object",
            type: "mystery",
            stackable: true
        });
        expect(item).to.be.instanceOf(Item);
        expect(item.name).to.equal("Unknown Object");
    });

    it("creates a Weapon from direct config object", () => {
        const item = createItemFromConfig({
            name: "Steel Blade",
            type: "weapon",
            attackPower: 25,
            durability: 100,
            stackable: false
        });
        expect(item).to.be.instanceOf(Weapon);
        expect(item.name).to.equal("Steel Blade");
    });

    it("throws an error for unknown preset name", () => {
        expect(() => createItemFromConfig("nonexistent")).to.throw("Invalid config object");
    });

    it("throws an error for null or undefined", () => {
        expect(() => createItemFromConfig(null)).to.throw("Invalid config object");
        expect(() => createItemFromConfig(undefined)).to.throw("Invalid config object");
    });
});