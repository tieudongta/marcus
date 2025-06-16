export class BaseStats {
  constructor(initialStats = {}) {
    this.stats = { ...initialStats };
    this.baseStats = {...initialStats};
  }

  has(stat) {
    return Object.hasOwn(this.stats, stat);
  }

  get(stat) {
    return this.stats?.[stat] ?? 0;
  }

  set(stat, value) {
    this.stats[stat] = value;
  }

  change(stat, delta) {
    if (!this.has(stat)) this.stats[stat] = 0;
    this.stats[stat] += delta;
  }

  increase(stat, amount = 1) {
    this.change(stat, amount);
  }

  onLevelUp(level) {
    for (const stat in this.baseStats) {
      const baseValue = this.baseStats[stat] || 0;
      this.set(stat, baseValue + (level -1));
    }
  }
  onQuestComplete(bonuses = {}) {
    for (const [stat, increment] of Object.entries(bonuses)) {
      const currentVal = this.get(stat) || 0;
      this.set(stat, currentVal + increment);
    }
  }
  improveViaEvent(bonuses = {}) {
    for (const [stat, increment] of Object.entries(bonuses)) {
      const currentVal = this.get(stat) || 0;
      this.set(stat, currentVal + increment);
    }
  }
  serialize() {
    return structuredClone(this.stats);
  }

}
