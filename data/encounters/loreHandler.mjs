import chalk from 'chalk';

export async function handleLoreEncounter(player, encounter) {
  console.log(chalk.blueBright(`\n📖 ${encounter.name}`));
  console.log(encounter.description);

  // Simulated effect: unlock lore or record it
  console.log(chalk.magenta(`✨ You feel the weight of history. A new entry is recorded in your journal.`));
  if (!player.journal) player.journal = [];
  player.journal.push(encounter.id);

  player.timeSystem.advanceTime?.(1);
  player.loseEnergy(2);
}
