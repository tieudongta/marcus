import chalk from 'chalk';
import { itemPresets } from '../items/itemPresets.mjs';
import { getRandomReward } from '../configs/rewardConfigs.mjs';

export async function handleResourceEncounter(player, encounter, { ask = null, choice = null } = {}) {
  console.log(chalk.greenBright(`\n🌿 ${encounter.name}`));
  console.log(encounter.description);
  if (choice?.toLowerCase().startsWith('n')) {
    console.log(chalk.blue(`No time to waste. You decide to move on.`));
    return { interrupt: false };
  }
  // Default effect: gain health or energy
  if (encounter.id === 'healing_herbs') {
    const healed = 10;
    //TODO: if health === healthMax addItem
    if (player.health === player.maxHealth) {
      player.inventory.addItem(itemPresets[encounter.id]);
      console.log(chalk.green(`❤️ You gather herbs and add ${itemPresets[encounter.id].name} in your inventory.`));

    } else {
      player.health = Math.min(player.maxHealth, player.health + healed);
      console.log(chalk.green(`❤️ You gather herbs and recover ${healed} health. Current HP: ${player.health}/${player.maxHealth}`));
    }
      player.loseEnergy(2);
      player.timeSystem.advanceTime(1);
  } else if (encounter.id === 'abandoned_cart') {
    const abandoned = getRandomReward();
    // Generic resource gain
    if(abandoned) {
      console.log(chalk.blue(`📦 You found ${abandoned.name} from the abandoned cart.`));
      player.inventory.addItem(abandoned);
    } else {
      console.log(chalk.gray(`📦 Someone have scouted the cart. You found nothing useful.`));
    }
    player.loseEnergy(4);
      player.timeSystem.advanceTime(2);
  }
  return { interrupt: true };
}
