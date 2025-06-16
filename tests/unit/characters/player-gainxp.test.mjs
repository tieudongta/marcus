import { expect } from 'chai';
import { AttributeStats } from '../../../stats/AttributeStats.mjs';
import { VitalStats } from '../../../stats/VitalStats.mjs';
import { Player } from '../../../characters/Player.mjs';
describe('Player Leveling', () => {
  let player;

  beforeEach(() => {
    // Create a minimal custom player with mock stats
    player = new Player({});
    player.vitalStats = new VitalStats({
      health: { current: 100, max: 100 },
    });
    player.attributeStats = new AttributeStats({
      strength: 5,
      agility: 3,
    });
    player.personalityStats = new AttributeStats({ // Same class to simplify
      charisma: 7,
      wisdom: 4,
    });

    // Manually store baseStats for proper level scaling
    player.vitalStats.baseStats = {
      health: { current: 100, max: 100 },
    };
    player.attributeStats.baseStats = {
      strength: 5,
      agility: 3,
    };
    player.personalityStats.baseStats = {
      charisma: 7,
      wisdom: 4,
    };
  });

  it('should gain XP but not level up prematurely', () => {
    player.gainXp(50);
    expect(player.level).to.equal(1);
    expect(player.xp).to.equal(50);
  });

  it('should level up when enough XP is gained', () => {
    player.gainXp(150); // 100 to level 2, 50 carry-over
    expect(player.level).to.equal(2);
    expect(player.xp).to.equal(50);
    expect(player.vitalStats.getMax('health')).to.equal(110); // 100 +10(2-1)
    expect(player.attributeStats.get('strength')).to.equal(6); // 5 +2-1
  });

  it('should allow multiple level-ups from large XP gain', () => {
    player.gainXp(350); // Lvl 1→2 (100), 2→3 (200), 50 remain
    expect(player.level).to.equal(3);
    expect(player.xp).to.equal(50);
    expect(player.vitalStats.getMax('health')).to.equal(120); // 100 +10(3-1)
    expect(player.attributeStats.get('agility')).to.equal(5); // 3  +(3-1)
  });

  it('should NOT scale personalityStats on level up', () => {
    player.gainXp(200); // level up to 2
    expect(player.level).to.equal(2);
    expect(player.personalityStats.get('charisma')).to.equal(7);
    expect(player.personalityStats.get('wisdom')).to.equal(4);
  });
});
