// playerInstance.mjs
import { Character } from '../../characters/Character.mjs';
import { createItem } from '../../factory/items/itemFactory.mjs';
import { skillDataBank } from '../../data/skills/skillData.mjs';

const playerInstance = new Character({
  name: "Hero",
  race: "Orc",
  health: 100,
  isPlayer: true,
  allSkills: skillDataBank
});

const weapon = createItem('iron_sword');
const potion = createItem('health_potion');
const food = createItem('bread');
playerInstance.inventory.addItem(weapon);
playerInstance.inventory.addItem(potion);
playerInstance.inventory.addItem(food);
playerInstance.gold = 100;
playerInstance.activeQuest = null;
playerInstance.equipWeapon(weapon);
//1console.log("After adding items, inventory:", playerInstance.inventory.items);
export default playerInstance;
