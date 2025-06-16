import chalk from 'chalk';
import { ask } from '../../scripts/utils/ask.mjs';

export async function handleSocialEncounter(player, encounter,ask) {
  console.log(chalk.cyanBright(`\n🤝 ${encounter.name}`));
  console.log(encounter.description);

  const response = await ask(`Do you want to chat or trade? (chat/trade/leave): `);

  if (response.toLowerCase().startsWith('chat')) {
    console.log("🗣️ The NPC shares a local rumor about a nearby ruin...");
    player.knowledge = (player.knowledge || 0) + 1;
  } else if (response.toLowerCase().startsWith('trade')) {
    console.log("💰 The merchant offers some goods.");
    // Optional: Hook to your trade system
    // await merchantTradeSystem.offer(player);
  } else {
    console.log("🚶‍♂️ You nod politely and move on.");
  }
}
