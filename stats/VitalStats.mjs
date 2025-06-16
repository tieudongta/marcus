export class VitalStats {
  constructor(stats = {}, passiveRules = {}) {
    this.stats = {};
    this.baseStats = {};
    this.passiveRules = passiveRules;
    this._elapsed = {}; // For passive tick tracking

    for (const [key, { current, max }] of Object.entries(stats)) {
      const clampedCurrent = Math.min(current, max);
      this.stats[key] = { current: clampedCurrent, max };
      this.baseStats[key] = { current: clampedCurrent, max }; // Optional for scaling
    }
  }

  has(stat) {
    return Object.hasOwn(this.stats, stat);
  }

  get(stat) {
    return this.stats[stat]?.current ?? 0;
  }

  getMax(stat) {
    return this.stats[stat]?.max ?? 0;
  }

  set(stat, value) {
    if (!this.has(stat)) return;

    const currentStat = this.stats[stat];

    if (typeof value === 'object') {
      const newCurrent = value.current ?? currentStat.current;
      const newMax = value.max ?? currentStat.max;
      this.stats[stat] = {
        current: Math.max(0, Math.min(newCurrent, newMax)),
        max: newMax
      };
    } else if (typeof value === 'number') {
      this.stats[stat].current = Math.max(0, Math.min(value, currentStat.max));
    }
  }

  setMax(stat, maxValue) {
    if (!this.has(stat)) return;

    const statObj = this.stats[stat];
    statObj.max = maxValue;

    // Clamp current if needed
    if (statObj.current > maxValue) {
      statObj.current = maxValue;
    }
  }

  change(stat, delta) {
    if (!this.has(stat)) return;

    const s = this.stats[stat];
    s.current = Math.max(0, Math.min(s.current + delta, s.max));
  }

  increase(stat, amount = 1) {
    this.change(stat, amount);
  }

  onLevelUp(level) {
    for (const stat in this.baseStats) {
      const base = this.baseStats[stat];
      const newMax = base.max + 10 * (level-1);
      this.stats[stat].max = newMax;
      this.stats[stat].current = newMax; // Fully restore on level up
    }
  }

  tick(deltaMinutes, character = null) {
    for (const stat in this.passiveRules) {
      const rule = this.passiveRules[stat];
      if (!rule) continue;

      this._elapsed[stat] = (this._elapsed[stat] || 0) + deltaMinutes;

      while (this._elapsed[stat] >= rule.interval) {
        const shouldApply = typeof rule.condition === "function"
          ? rule.condition(character)
          : true;

        if (shouldApply) {
          this.change(stat, rule.delta);
        }

        this._elapsed[stat] -= rule.interval;
      }
    }
  }

  serialize() {
    return structuredClone(this.stats);
  }
}
