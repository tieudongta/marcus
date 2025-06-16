import chalk from 'chalk';

export async function handleEnvironmentEncounter(player, encounter, { ask = null, choice = null } = {}) {
  console.log(chalk.cyanBright(`\n🌍 ${encounter.name}`));
  console.log(encounter.description);

  if (choice?.toLowerCase().startsWith('y')) {
    console.log(chalk.gray(`🌫️ You decided to go ahead. Bravery ++`));
    player.bravery++;
    player.timeSystem.advanceTime(1);
    player.loseEnergy(2);
    return { interrupt: true };
  } else {
    console.log(chalk.yellow(`⏳ You detour and lose time. Charisma ++`));
    player.charisma++;
    player.timeSystem.advanceTime(3);
    player.loseEnergy(6);
    return { interrupt: false };
  }
}
