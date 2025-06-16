import { weaponTemplates } from '../../data/items/weaponPresets.mjs';
import { statsPresets } from '../../data/stats/statPresets.mjs';
import { Weapon } from '../../items/Weapon.mjs';
import { Inventory } from '../../items/Inventory.mjs';
import { Character } from '../../characters/Character.mjs';
import { characterConfigs } from '../../data/characters/characterPresets.mjs';
import { Item } from '../../items/Item.mjs';
import { createItem } from '../items/itemFactory.mjs';
/**
 * Create a character using a preset key from characterConfigs,
 * merging stats from statTemplate, equipping a weapon, and populating inventory.
 * @param {string} configKey - key from characterConfigs (e.g., "orc", "goblin")
 * @param {Object} overrides - override fields like name, allSkills, etc.
 * @returns {Character}
 */
export function createCharacter(configKey = 'orc', overrides = {}) {
  const config = characterConfigs[configKey];
  if (!config) {
    throw new Error(`Character preset "${configKey}" not found in characterConfigs.`);
  }

  const statTemplates = config.statTemplate || [];
  const characterStats = {};

  // Always include 'default' stats
  if (!statTemplates.includes('default')) {
    statTemplates.unshift('default');
  }

  for (const template of statTemplates) {
    const preset = statsPresets[template];
    if (!preset) {
      throw new Error(`Stat preset "${template}" not found in statsPresets.`);
    }
    for (const [stat, value] of Object.entries(preset)) {
      characterStats[stat] = (characterStats[stat] || 0) + value;
    }
  }

  const inventory = new Inventory();
  let equippedWeapon = null;

  // Add all items from preset to inventory, auto-equip first valid weapon
  for (const itemName of config.inventory || []) {
    const item = createItem(itemName);
    if (item) inventory.addItem(item);
    equippedWeapon = (item instanceof Weapon)? item : null;
  }

  const character = new Character({
    name: overrides.name || config.name || 'Unnamed',
    race: config.race || 'unknown',
    ...characterStats,
    ...overrides,
    inventory,
    // placeholders
    level: config.level || 1,
    wallet: config.walletInitial || 0,
  });

  if (config.equippedWeapon?.weapon) {
    character.equipWeapon(equippedWeapon);
  }

  return character;
}
