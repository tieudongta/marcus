import { expect } from 'chai';
import { Player } from '../../../characters/Player.mjs';
// Mock Skill with attribute boosts
const mockSkill = {
  name: 'Battle Focus',
  getAttributeBoosts: () => ({ strength: 3, agility: 2 })
};

describe('Player Class', () => {
  let player;

  beforeEach(() => {
    player = new Player({
      name: 'TestHero',
      coreStats: { strength: 5, agility: 4, intelligence: 2 },
      vitalStats: { health: 50 },
      personalityStats: {},
      assignStarterSkills: false
    });
  });

  describe('effectiveAttributes()', () => {
    it('should reflect base attributes initially', () => {
      const attrs = player.effectiveAttributes;
      expect(attrs).to.deep.equal({
        strength: 5,
        agility: 4,
        intelligence: 2
      });
    });

    it('should reflect boosted attributes after adding skill', () => {
      player.addSkill(mockSkill);
      const boosted = player.effectiveAttributes;
      expect(boosted.strength).to.equal(8); // 5 + 3
      expect(boosted.agility).to.equal(6);  // 4 + 2
      expect(boosted.intelligence).to.equal(2); // unchanged
    });
  });

  describe('XP gain and level up', () => {
    it('should gain XP correctly', () => {
      player.gainXp(40);
      expect(player.xp).to.equal(40);
      expect(player.level).to.equal(1);
    });

    it('should level up when XP crosses threshold', () => {
      player.gainXp(120); // Level 1 -> 2 (100 XP), carry 20 XP
      expect(player.level).to.equal(2);
      expect(player.xp).to.equal(20);
    });

    it('should support multi-level gain if enough XP', () => {
      player.gainXp(250); // Should reach level 3 (100 + 200 XP)
      expect(player.level).to.equal(2);
      expect(player.xp).to.equal(150); // 250 - 300 = -50, but capped at level 3
    });
  });

  describe('Skill application', () => {
    it('should not affect base attributeStats directly', () => {
      player.addSkill(mockSkill);
      const raw = player.attributeStats.serialize();
      expect(raw.strength).to.equal(5);
      expect(raw.agility).to.equal(4);
    });

    it('should add boosts only from valid skills', () => {
      const badSkill = { name: 'Broken Skill' }; // no getAttributeBoosts
      player.addSkill(badSkill);
      expect(player.effectiveAttributes.strength).to.equal(5); // unchanged
    });
  });
});
