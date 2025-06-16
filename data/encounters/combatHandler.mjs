//combatHandlers.mjs
import { Character } from "../../characters/Character.mjs";
import { Weapon } from "../../items/Weapon.mjs";
import { Item } from "../../items/Item.mjs";
import { BattleManager } from "../../combat/BattleManager.mjs";
function spawningEnemy(encounterId) {
    console.log("Spawning enemy with encounterId:", encounterId);
    const enemy = Character.fromTemplates(encounterId || 'rat');
    if(!enemy.equippedWeapon) {
        enemy.equipWeapon(new Weapon({
            name: "Rusty Sword",
            attackPower: 5,
            durability: 10,
        }));
    }
    return enemy;
}
function lootEnemy(enemy, player) {
    for (const { item } of enemy.inventory.items) {
        const cloned = new Item({ ...item });
        player.inventory.addItem(cloned);
        console.log(`Looted: ${ cloned.name }`);
    }
}
function applyTimeAndEnergyCost(player, time = 1, energy = 5) {
    player.loseEnergy(energy);
    player.timeSystem.advanceTime(time);
}
export async function handleCombat(player, encounter , {ask = null, choice = null } = {}) {
    console.log("handleCombat args:");
console.log("player:", player?.name || typeof player);
console.log("encounter:", encounter);
console.log("ask, choice:", ask, choice);
    applyTimeAndEnergyCost(player, 1, 5);
    const enemy = spawningEnemy(encounter.id);
    console.log(`⚔️ A wild ${enemy.name} appears!`);
    const battle = new BattleManager(player, enemy, {
    onPlayerAttack: console.log,
    onEnemyAttack: console.log,
  });

  await battle.startBattle();

  if (enemy.health <= 0) {
    console.log(`🎉 You defeated ${enemy.name}!`);
    lootEnemy(enemy, player);
    return { interrupt: false };
  } else if (player.health <= 0) {
    console.log(`💀 You were defeated by ${enemy.name}...`);
    // Optional: trigger respawn, checkpoint, or penalty logic
    return { interrupt: true };
  }
}