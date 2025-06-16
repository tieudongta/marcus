import { expect } from 'chai';
import { createWeaponFromPreset, weaponPresets } from '../../../factory/items/weaponFactory.mjs'
import { Weapon } from '../../../items/Weapon.mjs';

describe('Weapon Factory', () => {
  it('should create a weapon from a valid preset', () => {
    const weapon = createWeaponFromPreset('bronzeSword');

    expect(weapon).to.be.instanceOf(Weapon);
    expect(weapon.name).to.equal(weaponPresets.bronzeSword.name);
    expect(weapon.attackPower).to.equal(weaponPresets.bronzeSword.attackPower);
    expect(weapon.durability).to.equal(weaponPresets.bronzeSword.durability);
    expect(weapon.rarity).to.equal(weaponPresets.bronzeSword.rarity);
  });

  it('should apply overrides correctly', () => {
    const weapon = createWeaponFromPreset('bronzeSword', { durability: 99, attackPower: 20 });

    expect(weapon.durability).to.equal(99);
    expect(weapon.attackPower).to.equal(20);
  });

  it('should throw an error for unknown preset', () => {
    expect(() => createWeaponFromPreset('unknownWeapon')).to.throw('Unknown weapon preset');
  });
});
