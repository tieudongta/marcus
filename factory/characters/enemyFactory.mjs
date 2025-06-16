import { buildCharacterFromTemplate } from '../stats/statBuilder.mjs';
import { enemyConfigs } from '../../data/characters/enemyConfigs.mjs';
import { itemPresets } from '../../data/items/itemPresets.mjs';
import { Enemy } from '../../characters/Enemy.mjs';
export function createEnemyFromPreset(name, options = {}) {
  const { statTemplate = name, level = 1 } = options;
  const config = enemyConfigs[name];
  if (!config) throw new Error(`Enemy preset "${name}" not found`);

  // const {
  //   statTemplate = name,
  //   level = config.level ?? 1
  // } = options;


  // Resolve loot items from presets
  const lootTable = (config.lootTable || []).map(key => {
    const item = itemPresets[key];
    if (!item) throw new Error(`Item preset "${key}" not found`);
    return item;
  });

  // Generate stats from template
  const stats = buildCharacterFromTemplate(statTemplate, level, {
    randomizeAttributes: config.randomizeAttributes ?? true,
    randomizePersonality: config.randomizePersonality ?? true
  });

  return new Enemy({
    name: config.name,
    level,
    walletInitial: config.walletInitial,
    lootTable,
    statTemplate,
    vitalStats: stats.vitalStats,
    attributeStats: stats.coreStats,
    personalityStats: stats.personalityStats
  });
}
