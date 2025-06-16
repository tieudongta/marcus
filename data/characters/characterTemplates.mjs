export const defaultTemplate = {
  baseStats: {
    health: 10,
    energy: 5,
    mana: 0,
  },
  wallet: {
    gold: 5,
  },
  lootTable: [],
  personality: {
    aggression: 3,
    curiosity: 3,
  },
};

export const characterTemplates = {
  rat: {
    baseStats: {
      health: 6,
      stamina: 3,
    },
    wallet: {
      gold: 1,
    },
    lootTable: [
      { item: 'rat tail', chance: 0.5 },
      { item: 'cheese crumb', chance: 0.2 },
    ],
    personality: {
      aggression: 2,
      curiosity: 4,
    },
    variants: {
      weak: {
        baseStats: {
          health: 3,
          energy: 2,
        },
        wallet: {
          gold: 1,
        },
        lootTable: [
          "ironSword", "bronze_sword"
        ],
        personality: {
          aggression: 1,
        },
      },
      strong: {
        baseStats: {
          health: 10,
          stamina: 5,
        },
        wallet: {
          gold: 2,
        },
        lootTable: [
          { item: 'rat tail', chance: 0.6 },
          { item: 'cheese crumb', chance: 0.3 },
        ],
        personality: {
          aggression: 3,
          curiosity: 5,
        },
      },
    },
  },

  goblin: {
    baseStats: {
      health: 12,
      stamina: 7,
      mana: 0,
    },
    wallet: {
      gold: 10,
    },
    lootTable: [
      { item: 'goblin ear', chance: 0.5 },
      { item: 'small dagger', chance: 0.3 },
    ],
    personality: {
      aggression: 5,
      curiosity: 2,
    },
    variants: {
      weak: {
        baseStats: { health: 8 },
        wallet: { gold: 5 },
        personality: { aggression: 3 },
      },
      strong: {
        baseStats: { health: 15, stamina: 10 },
        wallet: { gold: 20 },
        personality: { aggression: 7 },
      },
    },
  },

  orc: {
    baseStats: {
      health: 20,
      stamina: 10,
      mana: 2,
    },
    wallet: {
      gold: 25,
    },
    lootTable: [
      { item: 'orc tooth', chance: 0.6 },
      { item: 'battle axe', chance: 0.4 },
    ],
    personality: {
      aggression: 7,
      curiosity: 1,
    },
    variants: {
      weak: {
        baseStats: { health: 15, stamina: 7 },
        wallet: { gold: 10 },
        personality: { aggression: 5 },
      },
      strong: {
        baseStats: { health: 30, stamina: 15 },
        wallet: { gold: 40 },
        personality: { aggression: 9 },
      },
    },
  },

  normal: {},
  strong: {},
  weak: {},
  default: {}, // empty on purpose - handled in merge logic
};
function deepMerge(target, source) {
  for (const key in source) {
    if(!source.hasOwnProperty(key)) continue;
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export function getCharacterTemplate(type, variant) {
  let base = JSON.parse(JSON.stringify(defaultTemplate)); // clone default

  const character = characterTemplates[type] || {};
  deepMerge(base, character);

  if (variant && character.variants && character.variants[variant]) {
    deepMerge(base, character.variants[variant]);
  }

  return base;
}
