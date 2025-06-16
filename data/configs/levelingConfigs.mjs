// data/configs/levelingConfig.mjs

export const LEVELING_CONFIG = {
  baseXpPerLevel: 100,
  xpCurve: {
    type: 'polynomial', // 'linear' | 'exponential' | 'polynomial'
    exponent: 1.8,       // Used if type is 'polynomial'
    multiplier: 100,     // Common multiplier
  },
  statIncrements: {
    health: 10,
    energy: 5,
    strength: 2,
    intelligence: 1,
    agility: 1
  },
  scaling: {
    healthPerLevel: 10,
    energyPerLevel: 10
  }
};
export const raceStatIncrements = {
  Elf: { strength: 1, agility: 3, intelligence: 2, charisma: 1, health: 8, energy: 10 },
  Human: { strength: 2, agility: 2, intelligence: 2, charisma: 2, health: 10, energy: 8 },
  Dwarf: { strength: 3, agility: 1, intelligence: 1, charisma: 1, health: 12, energy: 6 },
  Orc: { strength: 4, agility: 1, intelligence: 1, charisma: 0, health: 15, energy: 5 },
  Halfling: { strength: 1, agility: 3, intelligence: 2, charisma: 2, health: 7, energy: 9 },
  Goblin: { strength: 1, agility: 2, intelligence: 3, charisma: 0, health: 6, energy: 10 },
};
