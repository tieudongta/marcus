import chalk from 'chalk';

export async function handleEnvironmentEncounter(player, encounter) {
  console.log(chalk.cyanBright(`\n🌍 ${encounter.name}`));
  console.log(encounter.description);

  // Example: collapsed bridge scenario
  if (encounter.id === 'collapsed_bridge') {
    console.log(`\nThe bridge is out. It will cost time or a skill check to cross.`);
    // If you had a challenge/skill system:
    // const success = await obstacleSystem.challenge(player, 'agility');
    // if (success) { ... } else { ... }

    console.log(chalk.yellow(`⏳ You detour and lose time.`));
    player.timeSystem.advanceTime?.(2);
    player.loseEnergy(5);
  } else {
    console.log(chalk.gray(`🌫️ Nothing you can do here for now.`));
  }
}
