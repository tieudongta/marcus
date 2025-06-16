import chalk from 'chalk';

export async function handleRandomEventEncounter(player, encounter) {
  console.log(chalk.yellowBright(`\n🌀 ${encounter.name}`));
  console.log(encounter.description);

  switch (encounter.id) {
    case 'lucky_coin':
      player.luck = (player.luck || 0) + 1;
      console.log(chalk.greenBright(`🍀 Luck +1! (Total Luck: ${player.luck})`));
      break;

    // Add more random events here if needed

    default:
      console.log(chalk.gray(`🎲 Something strange happened... but you're not sure what.`));
      break;
  }

  player.timeSystem.advanceTime?.(1);
}
