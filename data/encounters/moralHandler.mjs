import { ask } from '../../scripts/utils/ask.mjs';
import chalk from 'chalk';

export async function handleMoralEncounter(player, encounter, ask) {
  console.log(chalk.gray(`\n😢 ${encounter.name}`));
  console.log(encounter.description);

  const choice = await ask(`Do you give the child some food? (yes/no): `);

  if (choice.toLowerCase().startsWith('y')) {
    const bread = player.inventory.findItem(i => i.name.includes('Bread'));
    if (bread) {
      player.inventory.removeItem(bread);
      console.log("🧡 The child thanks you. You feel a bit lighter in spirit (+1 morale).");
      player.morale = (player.morale || 0) + 1;
    } else {
      console.log("😔 You have no rations to give.");
    }
  } else {
    console.log("😐 You walk past, ignoring the child's pleas.");
  }
}
