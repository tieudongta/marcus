import { expect } from 'chai';
import sinon from 'sinon';
import { Player } from '../../../characters/Player.mjs';
describe('Player attributeStats update on level up', () => {
  let player;
  let attributeStatsOnLevelUpSpy;

  beforeEach(() => {
    const baseVitalStats = {
      health: { current: 100, max: 100 },
      mana: { current: 50, max: 50 },
      stamina: { current: 75, max: 75 },
    };
    const baseAttributeStats = {
      strength: 10,
      agility: 8,
      intelligence: 6,
    };
    const config = {
      vitalStats: baseVitalStats,
      coreStats: baseAttributeStats,
      personalityStats: {},
      assignStarterSkills: false,
    };

    player = new Player(config);

    attributeStatsOnLevelUpSpy = sinon.spy(player.attributeStats, 'onLevelUp');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call attributeStats.onLevelUp when player levels up', () => {
    // Simulate gaining enough XP to level up once
    player.gainXp(player.xpToNextLevel(player.level));

    expect(attributeStatsOnLevelUpSpy.called).to.be.true;

    // The onLevelUp method should be called with the new player level
    expect(attributeStatsOnLevelUpSpy.calledWith(player.level)).to.be.true;
  });

  it('should update attributes on level up (example: strength increases)', () => {
    // If your AttributeStats supports serialize() or get()
    const beforeStrength = player.attributeStats.serialize().strength;
    console.error(player.attributeStats);
    // Simulate level up
    player.levelUp(player.level + 1);

    const afterStrength = player.attributeStats.serialize().strength;
    console.error(player.attributeStats);
    expect(afterStrength).to.be.a('number');
    expect(afterStrength).to.be.greaterThan(beforeStrength);
  });
});
