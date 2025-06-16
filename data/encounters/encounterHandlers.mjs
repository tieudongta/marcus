// encounterHandlers.mjs
import { handleCombat } from "./combatHandler.mjs";
import { handleEnvironmentEncounter } from "./environmentHandler.mjs";
import { handleLoreEncounter } from "./loreHandler.mjs";
import { handleMoralEncounter } from "./moralHandler.mjs";
import { handlePuzzleEncounter } from "./puzzleHandler.mjs";
import { handleRandomEventEncounter } from "./randomHandler.mjs";
import { handleResourceEncounter } from "./resourceHandler.mjs";
import { handleSocialEncounter } from "./socialHandler.mjs";

export const encounterHandlers = {
  combat: handleCombat,
  social: handleSocialEncounter,
  resource: handleResourceEncounter,
  environment: handleEnvironmentEncounter,
  lore: handleLoreEncounter,
  moral: handleMoralEncounter,
  random: handleRandomEventEncounter,
  puzzle: handlePuzzleEncounter
};