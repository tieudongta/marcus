import { expect } from 'chai';
import { createEnemyFromPreset } from '../../../factory/characters/enemyFactory.mjs';
import { Enemy } from '../../../characters/Enemy.mjs';
describe('Enemy Factory and Enemy class', () => {

  it('should create an enemy from preset with default stats and loot', () => {
  const enemy = createEnemyFromPreset('rat');

  expect(enemy).to.be.instanceOf(Enemy);
  expect(enemy.name.toLowerCase()).to.include('rat');
  expect(enemy.level).to.equal(1);

  // Use serialize if needed
  const vitals = enemy.vitalStats.serialize ? enemy.vitalStats.serialize() : enemy.vitalStats;
  expect(vitals.health.max).to.be.a('number').and.to.be.greaterThan(0);

  const attributes = enemy.attributeStats.serialize ? enemy.attributeStats.serialize() : enemy.attributeStats;
  expect(attributes.strength).to.be.a('number');

  const personality = enemy.personalityStats.serialize ? enemy.personalityStats.serialize() : enemy.personalityStats;
  expect(personality.charisma).to.be.a('number');

  expect(enemy.lootTable).to.be.an('array');
});

it('should allow explicit stat configs to override template stats', () => {
  const customVitalStats = {
    health: { max: 200, current: 200 },
    mana: { max: 50, current: 50 },
    energy: { max: 30, current: 30 }
  };

  const customAttributeStats = {
    strength: 25,
    agility: 20,
    intelligence: 15
  };

  const customPersonalityStats = {
    charisma: 8,
    aggression: 9
  };

  const enemy = new Enemy({
    name: 'Custom Beast',
    level: 5,
    vitalStatsConfig: customVitalStats,
    attributeStatsConfig: customAttributeStats,
    personalityStatsConfig: customPersonalityStats,
    lootTable: []
  });

  const vitals = enemy.vitalStats.serialize ? enemy.vitalStats.serialize() : enemy.vitalStats;
  expect(vitals.health.max).to.equal(200);

  const attributes = enemy.attributeStats.serialize ? enemy.attributeStats.serialize() : enemy.attributeStats;
  expect(attributes.strength).to.equal(25);

  const personality = enemy.personalityStats.serialize ? enemy.personalityStats.serialize() : enemy.personalityStats;
  expect(personality.aggression).to.equal(9);

  expect(enemy.level).to.equal(5);
});

});
