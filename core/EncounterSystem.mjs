import { encounterHandlers } from "../data/encounters/encounterHandlers.mjs";
import { encounterPresets } from "../data/encounters/encounterPresets.mjs";
import { ask } from "../scripts/utils/ask.mjs";
export class EncounterSystem {
  constructor(encounterPresets = [], utils = {}) {
    this.presets = encounterPresets;
    this.utils = utils;
  }

  // Score an encounter based on match with current context
  scoreEncounter(encounter, { region, timeOfDay, race }) {
    let score = 0;

    if (!encounter.region || encounter.region.includes(region)) score++;
    if (!encounter.timeOfDay || encounter.timeOfDay.includes("Any") || encounter.timeOfDay.includes(timeOfDay)) score++;
    if (!encounter.race || encounter.race === "Any" || encounter.race === race) score++;

    return score;
  }

  // Choose a random encounter weighted by match score
  weightedRandomPick(context) {
    const scored = this.presets
      .map(enc => ({ encounter: enc, score: this.scoreEncounter(enc, context) }))
      .filter(e => e.score > 0);

    if (!scored.length) return null;

    // console.log("\n🔍 Scored Encounters:");
    // for (const e of scored) {
    //   console.log(`- ${e.encounter.name} [${e.encounter.type}] → Score: ${e.score}`);
    // }

    const weightedPool = scored.flatMap(e => Array(e.score).fill(e.encounter));
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    return weightedPool[randomIndex];
  }

  // Main trigger
  async triggerEncounter(player, location) {
  const context = {
    region: location.region || "unknown",
    timeOfDay: player.timeSystem.phase,
    race: player.race,
  };

  const encounter = this.weightedRandomPick(context);
  if (!encounter) {
    console.log("⚠️ No valid encounters found.");
    return { interrupt: false };
  }
  //console.log("Encounter ID:", encounter.id);
  console.log(`📍 Chosen Encounter: ${encounter.name} [${encounter.type}]`);

  let choice;
  if (encounter.prompt && encounter.choices?.length >= 2) {
    choice = await this.utils.ask(encounter.prompt, encounter.choices);
  }
  console.log("Calling encounter handler with:");
  console.log("encounter:", encounter.id);

  const handler = encounter.handler;
  if (!handler || typeof handler !== "function") {
    console.warn(`⚠️ No handler defined for encounter "${encounter.id}". Skipping.`);
    return { interrupt: false };
  }

  try {
    const result = await handler(player, encounter, {
      ask: this.utils.ask,
      choice,
    });

    return result ?? { interrupt: false };
  } catch (err) {
    console.error(`🔥 Error in encounter handler "${encounter.id}":`, err);
    return { interrupt: false };
  }
}

}
