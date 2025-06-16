import { buildCharacterFromTemplate } from '../factory/stats/StatTemplateFactory.mjs';
import { Character } from './Character.mjs';
import { createItemFromConfig } from '../factory/items/itemFactory.mjs';
export class Enemy extends Character {
  constructor(config = {}) {

    const {
      lootTable = [],
      statTemplate = 'default',
      level = 1,
      randomizeAttributes = true,
      randomizePersonality = true,
      vitalStatsConfig,
      attributeStatsConfig,
      personalityStatsConfig,
      ...rest
    } = config;

    let vitalStats = vitalStatsConfig;
    let attributeStats = attributeStatsConfig;
    let personalityStats = personalityStatsConfig;

    // Build stats from template only if none provided
    if (!vitalStats && !attributeStats && !personalityStats) {
      const baseStats = buildCharacterFromTemplate(
        [statTemplate],
        level,
        { randomizeAttributes, randomizePersonality }
      );

      vitalStats = baseStats.vitalStats;
      attributeStats = baseStats.coreStats;
      personalityStats = baseStats.personalityStats;
    }

    super({
      ...rest,
      level,
      vitalStatsConfig: vitalStats,
      attributeStatsConfig: attributeStats,
      personalityStatsConfig: personalityStats,
    });

    this.lootTable = lootTable;
  }


    dropLoot() {
        if (this.isAlive) {
            console.log("Loot not dropped, enemy still alive.");
            return [];
        }

        const dropRates = {
            "Common": 60,
            "Uncommon": 30,
            "Rare": 15,
            "Epic": 5,
            "Legendary": 1
        };

        const droppedNames = this.lootTable.filter(itemName => {
            const itemConfig = createItemFromConfig(itemName);
            const rarity = itemConfig.rarity || "Common";
            const dropChance = dropRates[rarity] || 0;
            const roll = Math.random() * 100;
            return roll < dropChance;
        });

        // Guarantee 1 item if none drop
        if (droppedNames.length === 0 && this.lootTable.length > 0) {
            const fallback = this.lootTable[Math.floor(Math.random() * this.lootTable.length)];
            droppedNames.push(fallback);
        }

        return droppedNames.map(name => createItemFromConfig(name));
    }
}
