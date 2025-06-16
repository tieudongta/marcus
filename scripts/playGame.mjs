import readline from 'readline';
import chalk from 'chalk';
import { skillDataBank } from '../data/skills/skillData.mjs';
import { Weapon } from '../items/Weapon.mjs';
import { Potion } from '../items/Potion.mjs';
import { BattleManager } from '../combat/BattleManager.mjs';
import { createCharacter } from '../factory/characters/characterFactory.mjs';
import { Character } from '../characters/Character.mjs';
import { createItem } from '../factory/items/itemFactory.mjs';
import { itemPresets } from '../data/items/itemPresets.mjs';
import { Item } from '../items/Item.mjs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

let inGameTime = { day: 1, hour: 8 };

function advanceTime(hours) {
  inGameTime.hour += hours;
  while (inGameTime.hour >= 24) {
    inGameTime.day++;
    inGameTime.hour -= 24;
  }
}

function getTimeString() {
  return `Day ${inGameTime.day} ${inGameTime.hour.toString().padStart(2, '0')}:00`;
}

// Create some initial items and the player character
const healthPotion = createItem('health_potion');
const player = new Character({ name: "Hero", race: "Orc", health: 100, isPlayer: true, allSkills: skillDataBank });
//1console.error(player.skills);
// Add potion and weapon to inventory
player.inventory.addItem(healthPotion);
const weapon = createItem('ironSword');
player.inventory.addItem(weapon);

// Equip the weapon (if exists)
if (weapon instanceof Weapon) {
  player.equipWeapon(weapon);
}

const enemyPool = ['rat', 'goblin', 'orc'];

async function mainLoop() {
  console.log(chalk.bold.greenBright(`\n🧝 Welcome, ${player.name}! Let the adventure begin!`));
  while (player.isAlive) {
    console.log(chalk.cyan(`\n⏰ ${getTimeString()}`));
    const choice = await ask(chalk.yellow(`\nWhat would you like to do?\n1) Explore\n2) View Status\n3) View Inventory\n4) Rest\n5) Equip Weapon\n6) Use Potion\n7) Quit\n> `));
    switch (choice) {
      case '1': await explore(); break;
      case '2': viewStatus(); break;
      case '3': viewInventory(); break;
      case '4': rest(); break;
      case '5': equipWeapon(); break;
      case '6': await usePotion(); break;
      case '7':
        console.log(chalk.green(`👋 Thanks for playing!`));
        rl.close();
        return;
      default:
        console.log(chalk.red(`🤔 Invalid choice.`));
    }
  }
  console.log(chalk.redBright.bold(`☠️ You have perished. Game over.`));
  rl.close();
}

async function explore() {
  // Assuming player.energy exists as a number property (from your Character class)
  if (player.energy < 5) {
    console.log(chalk.yellow('⚠️ You are too tired to explore. Try resting.'));
    return;
  }

  advanceTime(1);
  player.loseEnergy(5);
  if (player.energy < 0) player.energy = 0;

  const enemyName = enemyPool[Math.floor(Math.random() * enemyPool.length)];
  const enemy = Character.fromTemplates(enemyName);
  console.error(enemy.inventory);
  if (!enemy.equippedWeapon) {
    enemy.equipWeapon(new Weapon({ name: "Rusty Sword", attackPower: 5, durability: 10 }));
  }
  console.log(chalk.redBright(`\n⚔️ A wild ${enemy.name} appears!`));

  const battle = new BattleManager(player, enemy, {
    onPlayerAttack: (msg) => console.log(chalk.green(`🗡️ ${msg}`)),
    onEnemyAttack: (msg) => console.log(chalk.red(`👹 ${msg}`))
  });
  await battle.startBattle();

  if (enemy.health <= 0) {  // Assuming enemy.health exists
    console.log(chalk.greenBright(`🎉 You defeated the ${enemy.name}!`));
    console.log("Enemy inventory:", enemy.inventory, typeof enemy.inventory);
    for (const entry of enemy.inventory.items) {
      const itemInstance = entry.item;
      const newItem = new Item({...itemInstance});
      player.inventory.addItem(newItem);

      console.log(chalk.blue(`🛍️ Looted: ${newItem.name}`));
    }
    //console.error(player.xp);
    // XP handling if you have these properties on Character:
    if (typeof player.xp === 'number' && typeof player.level === 'number') {
      player.xp = (player.xp || 0) + 10; // example XP gain
      const nextlLevelXp = player.xpToNextLevel(player.level);
      console.log(chalk.blue(`✨ You gained XP! (${player.xp}/${nextlLevelXp})`));
      if (player.xp >= nextlLevelXp) {
        player.levelUp();
        console.log(chalk.magentaBright(`⬆️ Level up! You are now level ${player.level}!`));
      }
    }
  }
}

function equipWeapon() {
  const entry = player.inventory.items.find(entry => entry.item instanceof Weapon);
  const weapon = entry?.item;
  if (weapon) {
    player.equipWeapon(weapon);
    console.log(chalk.greenBright(`🛡️ Equipped ${weapon.name}.`));
  } else {
    console.log(chalk.red(`❌ No weapon found.`));
  }
}

async function usePotion() {
  const potions = player.inventory.items.filter(entry => entry.item instanceof Potion);
  if (potions.length === 0) {
    console.log(chalk.red(`❌ No potions available.`));
    return;
  }

  console.log(chalk.yellowBright(`\n🧪 Available Potions:`));
  potions.forEach((entry, i) => {
    console.log(`${i + 1}) ${entry.item.name} (x${entry.quantity})`);
  });

  const input = await ask(`Select potion to use: `);
  const index = parseInt(input) - 1;
  const potionEntry = potions[index];
  if (potionEntry) {
    const success = player.inventory.useItem(potionEntry.item.name, player);
    if (success) {
      console.log(chalk.green(`🧪 Used ${potionEntry.item.name}.`));
    } else {
      console.log(chalk.red(`⚠️ Could not use ${potionEntry.item.name}.`));
    }
  } else {
    console.log(chalk.red(`❌ Invalid selection.`));
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function rest() {
  advanceTime(2);
  // Recover some health and energy (max caps assumed 100)
  //player.health = Math.min(player.health + 20, player.maxHealth);
  player.recoverEnergy(20);
  player.heal(20);
  console.log(chalk.blueBright(`😴 You rest and recover. Health: ${player.health}, Energy: ${player.energy}`));
}

function viewInventory() {
  console.log(chalk.yellowBright(`\n📦 Inventory:`));
  if (player.inventory.items.length === 0) {
    console.log(chalk.gray(`(empty)`));
    return;
  }
  player.inventory.items.forEach((entry, i) => {
    console.log(`${i + 1}. ${entry.item.name} x${entry.quantity}`);
  });
}

function viewStatus() {
  console.log(chalk.bold.underline(`\n📊 Status — ${player.name}`));
  console.log(chalk.cyan(`⏰ ${getTimeString()}`));
  console.log(chalk.green(`🧬 Level: ${player.level || 1} | XP: ${player.xp || 0}/${player.xpToNextLevel(player.level)}`));
  console.log(chalk.red(`❤️ Health: ${player.health}/${player.maxHealth}`));
  console.log(chalk.yellow(`⚡ Energy: ${player.energy}/${player.maxEnergy}`));
  console.log(chalk.bold(`\n💪 Attribute Stats:`));
  // Using effectiveAttributes getter from Character class
  for (const [key, value] of Object.entries(player.effectiveAttributes)) {
    console.log(`- ${key}: ${value}`);
  }
}

mainLoop();
