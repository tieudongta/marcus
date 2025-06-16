import { expect } from 'chai';
import { buildCharacterFromTemplate } from '../../../factory/stats/StatTemplateFactory.mjs';
import { enemyConfigs } from '../../../data/characters/enemyConfigs.mjs';
import { Enemy } from '../../../characters/Enemy.mjs';
describe('Enemy generation from config', () => {
  it('should create Goblin enemy with correct properties from config', () => {
    const goblinConfig = enemyConfigs.goblin;

    const enemy = new Enemy(goblinConfig);

    expect(enemy.name).to.equal('Goblin');
    expect(enemy.level).to.equal(1);
    expect(enemy.wallet.balance).to.equal(5);
    expect(enemy.lootTable).to.deep.equal(['bronze_sword', 'health_potion']);

    // Check that vitalStats include health and energy with correct max/current values
    expect(enemy.vitalStats.get('health')).to.be.a('number').that.is.at.least(0);
    expect(enemy.vitalStats.getMax('health')).to.be.a('number').that.is.at.least(0);
    expect(enemy.vitalStats.get('energy')).to.be.a('number').that.is.at.least(0);
    
    // Since template is "normal" with randomizeAttributes/personality true, stats should be roughly around defaults or higher
    const strength = enemy.attributeStats.get('strength');
    const intelligence = enemy.attributeStats.get('intelligence');
    const charisma = enemy.personalityStats.get('charisma');

    expect(strength).to.be.a('number').that.is.at.least(5);
    expect(intelligence).to.be.a('number').that.is.at.least(10);
    expect(charisma).to.be.a('number').that.is.at.least(3);
  });

  it('should create Orc enemy with strong template and no randomization', () => {
    const orcConfig = enemyConfigs.orc;
    const orc = new Enemy(orcConfig);

    expect(orc.name).to.equal('Orc Warrior');
    expect(orc.level).to.equal(1);
    expect(orc.wallet.balance).to.equal(20);
    expect(orc.lootTable).to.deep.equal(['bronze_sword', 'health_potion', "ironSword"]);

    // strong template has strength 18 and health 150 base
    expect(orc.attributeStats.get('strength')).to.equal(28 +(orc.level -1));
    expect(orc.attributeStats.get('agility')).to.equal(22 +(orc.level -1));
    expect(orc.vitalStats.getMax('health')).to.equal(75 + 10 * (orc.level - 1)); // level scaling

    // Since randomizeAttributes/personality false, values should exactly match template or scaled by level (except personality)
    expect(orc.personalityStats.get('charisma')).to.equal(5); // strong template has no personality override
  });
});
describe('Enemy generation from weak config', () => {
  it('should create a weak enemy with correct scaled stats', () => {
    // Define a weak enemy config similar to your enemyConfigs structure:
    const weakConfig = {
      name: "Weakling",
      level: 2,
      walletInitial: 1,
      lootTable: [],
      statTemplate: "weak",
      randomizeAttributes: false,
      randomizePersonality: false,
    };

    const enemy = new Enemy(weakConfig);

    // Load weak template for reference:
    const baseStats = buildCharacterFromTemplate(["weak"], weakConfig.level, {
      randomizeAttributes: false,
      randomizePersonality: false,
    });

    // Check vital stats (scaled with level):
    for (const [stat, vals] of Object.entries(baseStats.vitalStats)) {
      expect(enemy.vitalStats.get(stat)).to.equal(vals.current);
      expect(enemy.vitalStats.getMax(stat)).to.equal(vals.max);
    }

    // Check core stats (scaled with level):
    for (const [stat, val] of Object.entries(baseStats.coreStats)) {
      expect(enemy.attributeStats.get(stat)).to.equal(val);
    }

    // Check personality stats (scaled with level):

    for (const [stat, val] of Object.entries(baseStats.personalityStats)) {
      expect(enemy.personalityStats.get(stat)).to.equal(val);
    }

    // Check other properties:
    expect(enemy.name).to.equal(weakConfig.name);
    expect(enemy.level).to.equal(weakConfig.level);
    expect(enemy.wallet.balance).to.equal(weakConfig.walletInitial);
    expect(enemy.lootTable).to.deep.equal(weakConfig.lootTable);
  });
});
