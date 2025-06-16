import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadTemplates() {
  const filePath = path.join(__dirname, '../../data/stats/stat-archetypes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function mergeStats(templateNames, templates) {
  const merged = {};
  for (const name of templateNames) {
    const tmpl = templates[name];
    if (!tmpl) {
      throw new Error(`Template "${name}" not found`);
    }
    for (const [key, value] of Object.entries(tmpl)) {
      merged[key] = (merged[key] || 0) + value;
    }
  }
  return merged;
}

function randomizeStats(stats, points) {
  const keys = Object.keys(stats);
  for (let i = 0; i < points; i++) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    stats[key] += 1;
  }
}

export function buildCharacterFromTemplate(templateNames = [], level = 1, options = {}) {
  if (typeof templateNames === 'string') {
    templateNames = [templateNames];
  }

  if (!templateNames.includes('default')) {
    templateNames.unshift('default');
  }

  const {
    randomizeAttributes = true,
    randomizePersonality = true,
    attributePoints = 10,
    personalityPoints = 10
  } = options;

  const templates = loadTemplates();

  // Merge all template stats flat, no separation
  const mergedStats = mergeStats(templateNames, templates);

  // Separate vital, core, personality keys by your domain knowledge
  // Assuming 'health' and 'energy' are vital stats, rest split accordingly
  const vitalKeys = ['health', 'energy'];
  const personalityKeys = ['charisma', 'luck', 'bravery'];

  // Extract and separate stats
  const vitalStats = {};
  const coreStats = {};
  const personalityStats = {};

  for (const [key, value] of Object.entries(mergedStats)) {
    if (vitalKeys.includes(key)) {
      // Scale vital stats by level (+10 per level beyond 1)
      vitalStats[key] = value + 10 * (level - 1);
    } else if (personalityKeys.includes(key)) {
      personalityStats[key] = value;
    } else {
      coreStats[key] = value;
    }
  }

  if (randomizeAttributes) {
    randomizeStats(coreStats, attributePoints);
  }

  if (randomizePersonality) {
    randomizeStats(personalityStats, personalityPoints);
  }

  // Scale core stats by level (+ level -1)
  for (const stat in coreStats) {
    coreStats[stat] += level - 1;
  }

  return {
    vitalStats,
    coreStats,
    personalityStats
  };
}
