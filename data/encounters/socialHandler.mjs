import chalk from 'chalk';
import { ask } from '../../scripts/utils/ask.mjs';

export async function handleSocialEncounter(player, encounter,{ ask = null, choice = null } = {}) {
  console.log(chalk.cyanBright(`\n🤝 ${encounter.name}`));
  console.log(encounter.description);

  if (choice?.toLowerCase().startsWith('y')) {
    console.log("🗣️ You decided that you still had a lot of time and stopped a while.");
    player.charisma++;
    player.loseEnergy(2);
    player.timeSystem.advanceTime(0, 30);
    return { interrupt: true };
  } else {
    console.log("🚶‍♂️ Time is essential, you decide to move on.");
    player.charisma--;
    return { interrupt: false };
  }
}
