import { skillDataBank } from "../data/skills/skillData.mjs";
import { attributeMultipliers, raceAttributes } from "../data/skills/skillPresets.mjs";

export class Skill {
  constructor(data) {
    this.id = data.id || null; // optional id, can assign from key
    this.name = data.name;
    this.level = data.level;
    this.nextSkills = data.next_skill || [];
    this.branch = data.branch;
    this.race = data.race || [];
    this.description = data.description;
    this.attributes = data.attributes || [];
    this.isCombatant = data.isCombatant || false;
    this.type = data.type || 'passive';
    this.effectFn = data.effectFn || null;
    this.xp = data.xp || 0;
  }
  static levelMap = { novice: 1, apprentice: 2, veteran: 3, master: 4 };
  static attributeWeights = [1.5, 1.0, 0.5];
  get numericLevel() {
    return Skill.levelMap[this.level] || 1;
  }
  gainXp(amount = 1) {
    this.xp += amount;
    const currentLvl = this.numericLevel;
    const nextLvl = currentLvl + 1;
    const threshold = nextLvl * 50;
    if (this.xp >= threshold && nextLvl <= 4) {
      const levelName = Object.entries(Skill.levelMap).find(([k, v]) => v === nextLvl)?.[0];
      if (levelName) {
        this.level = levelName;
        this.xp -= threshold;
        console.log(`${this.name} leveled up to ${this.level}!`);
      }
    }
  }
  use(attacker, defender) {
    if (this.type !== 'active' || typeof this.effectFn !== 'function') {
      console.warn(`${this.name} is not an active skill or lacks effectFn.`);
      return { damage: 0 };
    }
    const result = this.effectFn(attacker, defender, this.numericLevel);
    return result || { damage: 0 };
  }
  getAttributeBoosts() {
    const boosts = {};
    const lvl = this.numericLevel;
    const baseBoost = 1;
    if (!this.attributes || this.attributes.length === 0) return boosts;

    this.attributes.forEach((attr, index) => {
      const weight = Skill.attributeWeights[index] || 0.5;
      boosts[attr] = Math.floor(baseBoost * weight * lvl);
    });
    //console.error(boosts);
    return boosts;
  }
  static generateEffectFn(skill) {
    return (user, target, level = 1) => {
      let damage = 0;
      const [primaryAttr, secondaryAttr] = raceAttributes[user.race] || [];

      for (const attr of skill.attributes) {
        const baseStat = user[attr] || 5;
        const multiplier = attributeMultipliers[attr] || 1;

        // Racial synergy: primary gets 20% boost, secondary gets 10%
        let racialBonus = 1;
        if (attr === primaryAttr) racialBonus = 1.2;
        else if (attr === secondaryAttr) racialBonus = 1.1;

        damage += baseStat * multiplier * racialBonus;
      }

      // Scale with level: +20% per level beyond 1
      const levelMultiplier = 1 + (level - 1) * 0.2;
      damage = Math.floor(damage * levelMultiplier);

      return { damage };
    };
  }

}
