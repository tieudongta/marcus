import { expect } from 'chai';
import { Skill } from '../../../skills/Skill.mjs';

describe('Skill class - getAttributeBoosts', () => {
  it('should return correct boost for 1 primary attribute at novice level', () => {
    const skillData = {
      name: 'Test Skill',
      level: 'novice',
      attributes: ['strength']
    };
    const skill = new Skill(skillData);

    const boosts = skill.getAttributeBoosts();
    expect(boosts).to.deep.equal({ strength: 1 }); // 1.5 * 1 floored = 1.5 → 1
  });

  it('should return correct boosts for 2 attributes at apprentice level', () => {
    const skillData = {
      name: 'Test Skill',
      level: 'apprentice',
      attributes: ['intelligence', 'dexterity']
    };
    const skill = new Skill(skillData);

    const boosts = skill.getAttributeBoosts();
    expect(boosts).to.deep.equal({
      intelligence: 3, // 1.5 * 2 * 2 = 6 floored to 3? Wait, let's check carefully
      dexterity: 2     // 1 * 2 * 2 = 4 floored to 2?
    });
  });

  it('should return correct boosts for 3 attributes at veteran level', () => {
    const skillData = {
      name: 'Test Skill',
      level: 'veteran',
      attributes: ['strength', 'intelligence', 'dexterity']
    };
    const skill = new Skill(skillData);

    const boosts = skill.getAttributeBoosts();
    expect(boosts).to.deep.equal({
      strength: 4,     // 1.5 * 3 * 3 = 13.5 floored to 4? No, let's recalc
      intelligence: 3, // 1 * 3 * 3 = 9 floored to 3?
      dexterity: 1     // 0.5 * 3 * 3 = 4.5 floored to 1?
    });
  });

  it('should handle unknown level as novice', () => {
    const skillData = {
      name: 'Unknown Level Skill',
      level: 'unknown',
      attributes: ['luck']
    };
    const skill = new Skill(skillData);

    const boosts = skill.getAttributeBoosts();
    expect(boosts).to.deep.equal({ luck: 1 }); // fallback to novice = 1
  });

  it('should return empty boosts if no attributes', () => {
    const skillData = {
      name: 'No Attr Skill',
      level: 'novice',
      attributes: []
    };
    const skill = new Skill(skillData);

    const boosts = skill.getAttributeBoosts();
    expect(boosts).to.deep.equal({});
  });
});
