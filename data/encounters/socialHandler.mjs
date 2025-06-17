import chalk from 'chalk';
import { ask } from '../../scripts/utils/ask.mjs';

export async function handleSocialEncounter(player, encounter, { ask = null, choice = null } = {}) {
  console.log(chalk.cyanBright(`\n🤝 ${encounter.name}`));
  console.log(encounter.description);

  // Handle merchant-type social encounters
  if (encounter.subtype === 'merchant' && Array.isArray(encounter.shopInventory)) {
    const wantsToShop = choice ?? await ask(encounter.prompt ?? "Want to browse his wares?", encounter.choices);
    if (wantsToShop.toLowerCase().startsWith('y')) {
      console.log("🛒 The merchant lays out some strange items on a cloth...");

      encounter.shopInventory.forEach((item, i) => {
        console.log(`[${i + 1}] ${item.name} - ${item.price} gold`);
      });

      const indexStr = await ask("Which item number do you want to buy? (or 0 to cancel)", 
        encounter.shopInventory.map((_, i) => `${i + 1}`).concat("0"));
      const selectedIndex = parseInt(indexStr) - 1;

      if (selectedIndex >= 0 && selectedIndex < encounter.shopInventory.length) {
        const selectedItem = encounter.shopInventory[selectedIndex];
        if (player.gold >= selectedItem.price) {
          player.gold -= selectedItem.price;
          player.inventory.addItem(selectedItem.id);
          console.log(`🎁 You bought ${selectedItem.name} for ${selectedItem.price} gold.`);
        } else {
          console.log("❌ You don't have enough gold.");
        }
      } else {
        console.log("👋 You decided not to buy anything.");
      }

      player.loseEnergy(2);
      player.timeSystem.advanceTime(0, 30);
      return { interrupt: true };
    } else {
      console.log("🚶 You nod politely and keep walking.");
      return { interrupt: false };
    }
  }

  // Default non-merchant behavior
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
