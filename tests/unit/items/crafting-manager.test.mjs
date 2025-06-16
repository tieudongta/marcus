import { expect } from 'chai';
import { Material } from '../../../items/Material.mjs';
import { Weapon } from '../../../items/Weapon.mjs';
import { CraftingManager } from '../../../factory/items/CraftingManager.mjs';

describe('Crafting System', () => {
    let sharpStone, magicDust, sword;

    beforeEach(() => {
        sharpStone = new Material({
            name: 'Sharp Stone',
            description: 'Enhances weapon sharpness.',
            rarity: 'Rare',
            effect: 'enhance',
            boostValue: 5
        });

        magicDust = new Material({
            name: 'Magic Dust',
            description: 'Infuses weapons with magical energy.',
            rarity: 'Legendary',
            effect: 'enhance',
            boostValue: 10
        });

        sword = new Weapon({
            name: 'Iron Sword',
            attackPower: 10,
            durability: 50
        });
    });

    it('should apply multiple materials correctly', () => {
        CraftingManager.craft(sword, [sharpStone, magicDust]);
        expect(sword.attackPower).to.equal(25); // 10 base + 5 + 10 enhancement
    });

    it('should combine materials into a stronger one', () => {
        const newMaterial = CraftingManager.combineMaterials([sharpStone, magicDust]);
        expect(newMaterial.name).to.equal('Combined Sharp Stone & Magic Dust');
        expect(newMaterial.boostValue).to.equal(15); // 5 + 10 combined boost
    });
});