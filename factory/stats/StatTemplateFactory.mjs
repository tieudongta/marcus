import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadTemplates() {
  const filePath = path.join(__dirname, 'data', '../../../data/stats/stat-archetypes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function buildCharacterFromTemplate(templateNames = [], level = 1) {
  const templates = loadTemplates();

  if (typeof templateNames === 'string') {
    templateNames = [templateNames];
  }

  if (!templateNames.includes('default') && templates['default']) {
    templateNames.unshift('default');
  }

  const base = {
    health: 0,
    energy: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    luck: 0,
    bravery: 0,
    charisma: 0,
    wallet: { gold: 0 },
    lootTable: []
  };

  for (const name of templateNames) {
    const tmpl = templates[name];
    if (!tmpl) {
      throw new Error(`Template "${name}" not found`);
    }

    // Sum all applicable flattened stats
    for (const key of Object.keys(base)) {
      if (typeof tmpl[key] === 'number') {
        base[key] += tmpl[key];
      }
    }

    // Handle wallet
    if (tmpl.wallet?.gold) {
      base.wallet.gold += tmpl.wallet.gold;
    }

    // Merge lootTable
    if (Array.isArray(tmpl.lootTable)) {
      for (const item of tmpl.lootTable) {
        if (!base.lootTable.includes(item)) {
          base.lootTable.push(item);
        }
      }
    }
  }

  // Apply level scaling (example: +1 to core stats per level)
  for (const stat of ['strength', 'agility', 'intelligence']) {
    base[stat] += level - 1;
  }

  // Optionally scale health or energy with level
  base.health += 10 * (level - 1);
  base.energy += 5 * (level - 1);

  return JSON.parse(JSON.stringify(base)); // Deep copy
}
