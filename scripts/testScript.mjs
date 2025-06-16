import { createCharacter } from '../factory/characters/characterFactory.mjs';
import { skillDataBank } from '../data/skills/skillData.mjs';
// Ensure 'axe' exists in your weaponTemplates!
const goblin = createCharacter('goblin');
const orcHero = createCharacter('orc', { name: 'Hero', allSkills: skillDataBank });
console.error(goblin);
console.error(orcHero);