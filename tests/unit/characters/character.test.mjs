import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';
import { Weapon } from '../../../items/Weapon.mjs';
describe('Character Class', () => {
  let character;

  beforeEach(() => {
    character = new Character({
      name: 'Hero',
      level: 1,
      walletInitial: 100,
      vitalStatsConfig: {
        health: { current: 50, max: 50 },
        energy: { current: 30, max: 30 }
      },
      attributeStatsConfig: {
        strength: 10,
        agility: 5
      },
      personalityStatsConfig: {
        bravery: 3,
        luck: 2
      }
    });
  });

  it('should initialize with correct name and level', () => {
    expect(character.name).to.equal('Hero');
    expect(character.level).to.equal(1);
  });

  it('should have a wallet with the correct initial balance', () => {
    expect(character.wallet.balance).to.equal(100);
  });

  it('should take damage and reduce health', () => {
    character.takeDamage(10);
    expect(character.vitalStats.get('health')).to.equal(40);
  });

  it('should clamp health at 0 and call die()', () => {
    let died = false;
    character.die = () => { died = true; };
    character.takeDamage(999);
    expect(character.vitalStats.get('health')).to.equal(0);
    expect(died).to.be.true;
  });

  it('should heal and not exceed max health', () => {
    character.takeDamage(30);
    character.heal(100);
    expect(character.vitalStats.get('health')).to.equal(50);
  });

  it('should add and spend gold correctly', () => {
    character.spendGold(20);
    expect(character.wallet.balance).to.equal(80);
    character.addGold(40);
    expect(character.wallet.balance).to.equal(120);
  });

  it('should calculate offense with and without a weapon', () => {
    expect(character.getOffense()).to.equal(10);

    const weapon = new Weapon({ name: 'Sword', attackPower: 5, durability: 5 });
    character.equipWeapon(weapon);
    expect(character.getOffense()).to.equal(15);
  });

  it('should calculate defense based on agility', () => {
    expect(character.getDefense()).to.equal(5);
  });

  it('should return correct alive status', () => {
    expect(character.isAlive).to.be.true;
    character.takeDamage(999);
    expect(character.isAlive).to.be.false;
  });

  it('should serialize and deserialize state accurately', () => {
    const data = character.serialize();
    const newChar = new Character();
    newChar.deserialize(data);

    expect(newChar.name).to.equal('Hero');
    expect(newChar.wallet.balance).to.equal(100);
    expect(newChar.attributeStats.get('strength')).to.equal(10);
  });

  it('should increase stats on level up', () => {
   
    const originalLevel = character.level;
    const originalHealth = character.vitalStats.get('health');
    character.levelUp();
    
    expect(character.level).to.equal(originalLevel + 1);
    expect(character.vitalStats.getMax('health')).to.be.greaterThan(originalHealth);
  });

  it('should toggle resting state and handle time ticks', () => {
    const fakeTimeSystem = {
      subscribe: () => {},
      phase: 'Night'
    };
    character = new Character({ timeSystem: fakeTimeSystem });
    character.vitalStats.set('energy', 10);
    character.rest();
    character.onTimeTick(10);
    expect(character.vitalStats.get('energy')).to.be.above(10);
    character.wakeUp();
    character.onTimeTick(10);
    expect(character.vitalStats.get('energy')).to.be.below(30); // shouldn't exceed max
  });
});
