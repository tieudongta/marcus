
import { Weapon } from '../../items/Weapon.mjs';
export const weaponPresets = {
  bronzeSword: {
    name: 'Bronze Sword',
    attackPower: 10,
    durability: 50,
    rarity: 'common',
  },
  ironAxe: {
    name: 'Iron Axe',
    attackPower: 15,
    durability: 60,
    rarity: 'uncommon',
  },
  flameBlade: {
    name: 'Flame Blade',
    attackPower: 25,
    durability: 70,
    rarity: 'rare',
  },
  frostHammer: {
    name: 'Frost Hammer',
    attackPower: 30,
    durability: 80,
    rarity: 'epic',
  },
  voidEdge: {
    name: 'Void Edge',
    attackPower: 50,
    durability: 100,
    rarity: 'legendary',
  },
};

export function createWeaponFromPreset(presetName, overrides = {}) {
  const base = weaponPresets[presetName];
  if (!base) throw new Error(`Unknown weapon preset: ${presetName}`);
  return new Weapon({ ...base, ...overrides });
}
