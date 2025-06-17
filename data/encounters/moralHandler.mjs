import { ask } from '../../scripts/utils/ask.mjs';
import chalk from 'chalk';

export async function handleMoralEncounter(player, encounter, { ask = null, choice = null } = {}) {
  console.log(chalk.gray(`\n😢 ${encounter.name}`));
  console.log(encounter.description);

  if(encounter.id === "begging_child") {
    if (choice?.toLowerCase().startsWith('y')) {
    const bread = player.inventory.items.find(entry => entry.item.name === 'Bread');
    //console.error(player.inventory.items);
    if (bread) {
      player.inventory.removeItem(bread);
      console.log(chalk.magenta("🧡 The child thanks you. You feel a bit lighter in spirit (Charisma++)."));
      player.charisma++;
    } else {
      console.log(chalk.gray("😔 You have no food to give."));
    }
    player.timeSystem.advanceTime(1);
    player.loseEnergy(1);
    return { interrupt: true };
  } else {
    console.log(chalk.green("😐 You walk past, ignoring the child's pleas."));
    player.charisma--;
    console.log(chalk.red(`You are cold. Charisma --`));
    return { interrupt: false };
  }
  } else if (encounter.id === "injured_enemy") {
    if (choice?.toLowerCase().startsWith('y')) {
    console.log(chalk.magenta("🕊️ You tend to his wounds. Charisma +1."));
    player.charisma++;
    player.timeSystem.advanceTime(2);
    player.loseEnergy(4);
    return { interrupt: true };
  } else {
    console.log(chalk.green("🗡️ You end his suffering quickly."));
    player.charisma--;
    console.log(chalk.red(`You are cold. Charisma --`));
    return { interrupt: false };
  }
  }
}
