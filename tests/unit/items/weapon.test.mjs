import { expect } from 'chai';
import { Weapon } from '../../../items/Weapon.mjs';
import { Material } from '../../../items/Material.mjs';
import { Character } from '../../../characters/Character.mjs';

describe('Weapon Class', () => {
    it('should apply upgrades correctly', () => {
        const weapon = new Weapon({ name: 'Sword', attackPower: 10, durability: 100 });
        const material = new Material({ name: 'Sharp Stone', effect: 'enhance', boostValue: 5 });

        weapon.upgrade(material);
        expect(weapon.attackPower).to.equal(15);
    });
});
describe("Weapon Equipping", () => {
    let character, weapon;

    beforeEach(() => {
        character = new Character({ name: "Hero" });
        weapon = new Weapon({ name: "Sword", attackPower: 20 });
    });

    it("should equip weapon correctly", () => {
        character.equipWeapon(weapon);
        expect(character.equippedWeapon).to.equal(weapon);
        expect(character.getOffense()).to.equal(weapon.attackPower + character.attributeStats.get('strength')); // Base 5 + 20 weapon power
    });

    it("should degrade weapon after attack", () => {
        character.equipWeapon(weapon);
        const initialDurability = weapon.durability;
        character.equippedWeapon.degrade();
        expect(weapon.durability).to.equal(initialDurability - 1);
    });
});