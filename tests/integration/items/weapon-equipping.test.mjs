import { expect } from "chai";
import sinon from 'sinon';
import { Character } from "../../../characters/Character.mjs";
import { Weapon } from "../../../items/Weapon.mjs";
describe("Weapon Equipping and Offense Calculation", () => {
    let character, sword, axe, bow;

    beforeEach(() => {
        character = new Character({ name: "Hero" });
        character.attributeStats.set("strength", 10); // Base strength

        sword = new Weapon({ name: "Sword", attackPower: 15, durability: 50 });
        axe = new Weapon({ name: "Axe", attackPower: 20, durability: 40 });
        bow = new Weapon({ name: "Bow", attackPower: 12, durability: 30 });
    });

    it("should correctly calculate offense with different weapons", () => {
        character.equipWeapon(sword);
        expect(character.getOffense()).to.equal(10 + 15); // Strength + Sword power

        character.equipWeapon(axe);
        expect(character.getOffense()).to.equal(10 + 20); // Strength + Axe power

        character.equipWeapon(bow);
        expect(character.getOffense()).to.equal(10 + 12); // Strength + Bow power
    });

    it("should degrade weapon after multiple uses", () => {
        character.equipWeapon(sword);
        const initialDurability = sword.durability;
        sword.degrade();
        expect(sword.durability).to.equal(initialDurability - 1);
    });

    it("should reset offense if weapon breaks", () => {
        character.equipWeapon(sword);
        sword.durability = 1; // Almost broken
        sword.degrade(); // Weapon breaks
        expect(character.getOffense()).to.equal(character.attributeStats.get("strength")); // Back to base strength
    });

    it("should equip weapon correctly and log action", () => {
        const logSpy = sinon.spy(console, "log");
        character.equipWeapon(sword);
        expect(logSpy.calledWith("Hero equipped Sword.")).to.be.true;
        logSpy.restore();
    });
});