import { expect } from 'chai';
import { Material } from '../../../items/Material.mjs';
import { Weapon } from '../../../items/Weapon.mjs';

describe('Material Class', () => {
    let sharpStone, repairKit, sword;

    beforeEach(() => {
        sharpStone = new Material({
            name: 'Sharp Stone',
            description: 'A rare stone used to enhance weapons.',
            rarity: 'Rare',
            effect: 'enhance',
            boostValue: 5
        });

        repairKit = new Material({
            name: 'Repair Kit',
            description: 'Used to restore durability of equipment.',
            rarity: 'Common',
            effect: 'repair',
            boostValue: 10
        });

        sword = new Weapon({
            name: 'Iron Sword',
            attackPower: 10,
            durability: 50
        });
    });

    it('should initialize correctly', () => {
        expect(sharpStone.name).to.equal('Sharp Stone');
        expect(sharpStone.effect).to.equal('enhance');
        expect(sharpStone.boostValue).to.equal(5);

        expect(repairKit.effect).to.equal('repair');
        expect(repairKit.boostValue).to.equal(10);
    });

    it('should enhance weapon attack power', () => {
        sharpStone.applyEffect(sword);
        expect(sword.attackPower).to.equal(15); // 10 + 5 enhancement
    });

    it('should repair weapon durability', () => {
        repairKit.applyEffect(sword);
        expect(sword.durability).to.equal(60); // 50 + 10 repair boost
    });

    it('should not apply incorrect effects', () => {
        repairKit.applyEffect(sword);
        expect(sword.attackPower).to.equal(10); // No change in attack power
    });
});