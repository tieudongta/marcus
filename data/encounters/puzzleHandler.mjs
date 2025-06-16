import { ask } from '../../scripts/utils/ask.mjs';
import chalk from 'chalk';

export async function handlePuzzleEncounter(player, encounter, ask) {
  console.log(chalk.yellowBright(`🧩 ${encounter.name}`));
  console.log(encounter.description);

  const answer = await ask(`Solve this riddle: "What has roots as nobody sees, is taller than trees..."? `);

  if (answer.toLowerCase().includes("mountain")) {
    console.log("✅ Correct! You feel wiser (+1 intelligence).");
    player.intelligence = (player.intelligence || 0) + 1;
  } else {
    console.log("❌ Incorrect. The ancient door remains sealed.");
  }
}
