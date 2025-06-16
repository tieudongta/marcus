import chalk from 'chalk';

export async function handleResourceEncounter(player, encounter) {
  console.log(chalk.greenBright(`\n🌿 ${encounter.name}`));
  console.log(encounter.description);

  // Default effect: gain health or energy
  if (encounter.id === 'healing_herbs') {
    const healed = 10;
    //TODO: if health === healthMax addItem
    player.health = Math.min(player.maxHealth, player.health + healed);
    console.log(chalk.green(`❤️ You gather herbs and recover ${healed} health. Current HP: ${player.health}/${player.maxHealth}`));
  } else {
    // Generic resource gain
    console.log(chalk.blue(`📦 You gain useful resources.`));
    player.resources = player.resources || {};
    player.resources[encounter.id] = (player.resources[encounter.id] || 0) + 1;
  }

  // Time & energy cost (optional)
  player.timeSystem.advanceTime?.(1);
  player.loseEnergy(3);
}
