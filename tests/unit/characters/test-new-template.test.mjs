
import { Character } from "../../../characters/Character.mjs";
import { getCharacterTemplate } from "../../../data/characters/characterTemplates.mjs"
const rat = getCharacterTemplate('rat', 'weak');
console.log(rat instanceof Character);