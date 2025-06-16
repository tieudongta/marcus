import { createItem } from "../../factory/items/itemFactory.mjs";
import { ask } from "./ask.mjs";
import { generateNewQuest, completeQuest, viewActiveQuest } from "./questSystem.mjs";

// showPlayerMenu.mjs
export async function showPlayerMenu(player, currentLocation) {
  console.log(`\n=== What would you like to do? ===`);
  console.log("1) Move to next location");
  console.log("2) Rest (+10 energy, 1h)");
  console.log("3) Sleep (+30 energy, 6h)");
  console.log("4) View inventory");
  console.log("5) View personal stats");
  console.log("6) View quest");
  const hasShop = currentLocation?.shops.length > 0;
  if (hasShop) {
    console.log("7) Visit shop");
    console.log("8) Quit");
  } else {
    console.log("7) Quit");
  }

  const choice = parseInt(await ask("Choose an action: "), 10);
  return choice;
}
export async function showQuestLog(questManager) {
  const logText = questManager.getQuestStatusText();
  console.log("\n📘 Quest Log:");
  console.log(logText || "No active quests.");
  await ask("Press Enter to return.");
}

export function showPlayerStats(player) {
  console.log("\n📊 Your Stats:");
  console.log(`❤️ Health: ${player.health} / ${player.maxHealth}`);
  console.log(`⚡ Energy: ${player.energy} / ${player.maxEnergy}`);
  console.log(`🧠 Intelligence: ${player.intelligence}`);
  console.log(`💪 Strength: ${player.strength}`);
  console.log(`🏃 Agility: ${player.agility}`);
  console.log(`⭐ XP: ${player.xp} / ${player.xpToNextLevel(player.level)}`);
  console.log(`⭐ Gold: ${player.gold}g`);
}

export function showInventory(player) {
  console.log("\n🎒 Inventory:");
  if (!player.inventory.items.length) {
    console.log("  (empty)");
    return;
  }
  //TODO: use inventory.getItemslist/
  // player.inventory.items.forEach(({ item }, index) => {
  //   console.log(`${index + 1}) ${item.name} x${item.quantity || 1}`);
  // });
  console.log(player.inventory.getItemList());
}
export async function visitShop(player, location) {
  const shops = location.shops || [];
  if (!shops.length) {
    console.log("\n🛒 No shops available here.");
    return;
  }

  const shop = shops[0];
  const shopItems = shop.items || [];
console.log("Shops at location:", shops);
  console.log("\n🛒 Welcome to the shop!");
  console.log("1) Buy items");
  console.log("2) Sell items");
  console.log("0) Exit");
  const shopChoice = parseInt(await ask("Choose an option: "), 10);

  if (shopChoice === 1) {
    player.timeSystem.advanceTime(0,15);
    return await buyItems(player, shopItems);
  } else if (shopChoice === 2) {
    player.timeSystem.advanceTime(0,15);
    return await sellItems(player);
  }
}
async function buyItems(player, shopItems) {
  if (!shopItems.length) {
    console.log("\n🛒 The shop is empty.");
    return;
  }

  console.log(`\n💰 You have ${player.gold} gold.`);
  shopItems.forEach((item, i) => {
    console.log(`${i + 1}) ${item.name} - ${item.price} gold`);
  });

  const choice = parseInt(await ask("Select an item to buy (or 0 to exit): "), 10);
  if (choice > 0 && choice <= shopItems.length) {
    const selectedItem = shopItems[choice - 1];
    if (player.gold >= selectedItem.price) {
      const itemInstance = createItem(selectedItem.id || selectedItem.name.toLowerCase().replace(/ /g, "_"));
      player.inventory.addItem(itemInstance);
      player.gold -= selectedItem.price;
      console.log(`✅ You bought ${selectedItem.name}. 💰 Remaining: ${player.gold}`);
    } else {
      console.log("❌ Not enough gold.");
    }
  }
}
async function sellItems(player) {
  console.log("DEBUG: player.inventory.items =", player.inventory.items);

  const items = player.inventory.items;
  if (!items.length) {
    console.log("\n🎒 Your inventory is empty.");
    return;
  }

  console.log("\n📦 Items available to sell:");
  items.forEach(({ item }, index) => {
    const sellPrice = Math.floor((item.price || 0) / 2);
    console.log(`${index + 1}) ${item.name} - Sell for ${sellPrice} gold`);
  });

  const choice = parseInt(await ask("Select an item to sell (or 0 to exit): "), 10);
  if (choice > 0 && choice <= items.length) {
    const { item } = items[choice - 1];
    const sellPrice = Math.floor((item.price || 0) / 2);
    player.inventory.removeItem(item.name);
    player.gold += sellPrice;
    console.log(`✅ Sold ${item.name} for ${sellPrice} gold. 💰 Total: ${player.gold}`);
  }
}

export async function sellToShop(player) {
  const inventoryItems = player.inventory.items;

  if (inventoryItems.length === 0) {
    console.log("\n📦 Your inventory is empty. Nothing to sell.");
    return;
  }

  console.log("\n💰 Items in your inventory:");
  inventoryItems.forEach(({ item, quantity }, i) => {
    console.log(`${i + 1}) ${item.name} x${quantity} (Sell: ${item.sellPrice || 5} gold each)`);
  });

  const itemIndex = parseInt(await ask("Select an item to sell (or 0 to cancel): "), 10) - 1;
  if (itemIndex < 0 || itemIndex >= inventoryItems.length) {
    console.log("❌ Sale canceled.");
    return;
  }

  const { item, quantity } = inventoryItems[itemIndex];
  const sellPrice = item.sellPrice || 5;

  let sellQuantity = 1;
  if (item.stackable && quantity > 1) {
    const qtyInput = parseInt(await ask(`How many ${item.name}s do you want to sell? `), 10);
    if (isNaN(qtyInput) || qtyInput < 1 || qtyInput > quantity) {
      console.log("❌ Invalid quantity.");
      return;
    }
    sellQuantity = qtyInput;
  }

  // Remove from inventory
  for (let i = 0; i < sellQuantity; i++) {
    player.inventory.removeItem(item);
  }

  // Add gold
  const totalGold = sellQuantity * sellPrice;
  player.gold += totalGold;

  console.log(`✅ Sold ${sellQuantity} x ${item.name} for ${totalGold} gold.`);
  console.log(`💰 You now have ${player.gold} gold.`);
}


