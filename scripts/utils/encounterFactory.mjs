import { generateEncounterTemplates } from "../../data/encounters/generateEncounters.mjs";
const newEncounters = generateEncounterTemplates(20);
console.log(JSON.stringify(newEncounters, null, 2));