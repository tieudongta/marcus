import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Activity } from "./Activity.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const activitiesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/activities/activities.json"), "utf-8")
);

export const Activities = {};

/**
 * Helper: convert a plain effect object into a function modifying character stats.
 * @param {object} effectObj - e.g. { energy: -10, health: +5 }
 * @returns {function(character):void}
 */
function makeEffect(effectObj) {
  return (character) => {
    for (const key in effectObj) {
      character.stats[key] = (character.stats[key] || 0) + effectObj[key];
    }
  };
}

for (const data of activitiesData) {
  Activities[data.label.toLowerCase().replace(/\s+/g, "_")] = new Activity({
    label: data.label,
    duration: data.duration,
    allowedPhases: data.allowedPhases || [],
    requiredStats: data.requiredStats || {},
    locationRequired: data.locationRequired,
    requiresItem: data.requiresItem || [],
    givesXP: data.givesXP || {},
    effect: data.effect ? makeEffect(data.effect) : null,
    onStart: (char) => console.log(`${char.name} started ${data.label}`),
    onComplete: (char) => console.log(`${char.name} completed ${data.label}`),
  });
}
