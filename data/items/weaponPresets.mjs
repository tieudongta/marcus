import { Weapon } from '../../items/Weapon.mjs';
export const weaponTemplates = {
  sword: new Weapon({
    name: 'Sword',
    description: 'A sharp blade',
    attackPower: 10,
    durability: 100,
    rarity: 'common'
  }),
  axe: new Weapon({
    name: 'Axe',
    description: 'Heavy and powerful',
    attackPower: 15,
    durability: 80,
    rarity: 'uncommon'
  }),
  bow: new Weapon({
    name: 'Bow',
    description: 'Long range weapon',
    attackPower: 8,
    durability: 120,
    rarity: 'common'
  }),
};
