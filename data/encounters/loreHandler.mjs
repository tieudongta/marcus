import chalk from 'chalk';
import { Tool } from '../../items/Tool.mjs';

export async function handleLoreEncounter(player, encounter , { ask = null, choice = null } = {}) {
//   lore: take, pass
// -take: +item, -time, -energy
// -pass: +charisma

  console.log(chalk.blueBright(`\n📖 ${encounter.name}`));
  console.log(encounter.description);
  if(choice?.toLowerCase().startsWith('y')) {
    if(encounter.id === "ancient_tablet") {
      const ancient_tablet = new Tool({
          name: "Ancient Tablet",
          description: "A mysterious tablet",
          attackPower: 0,
          price: 0,
          durability: 100,
          rarity: "legendary",
          stackable: false
        });
        player.inventory.addItem(ancient_tablet);
        console.log(chalk.magenta(`✨ You add ${ancient_tablet.name} in your inventory and move on.`));
    } else if (encounter.id === "singing_stone") {
      const singing_stone = new Tool({
          name: "Singing Stone",
          description: "A magical stone",
          attackPower: 0,
          price: 0,
          durability: 100,
          rarity: "legendary",
          stackable: false
        });
        player.inventory.addItem(singing_stone);
        console.log(chalk.magenta(`✨ You add ${singing_stone.name} in your inventory and move on.`));
    }
    player.timeSystem.advanceTime(2);
    player.loseEnergy(4);
    return { interrupt: true };
  } else {
    console.log(chalk.blue(`✨ You move on without hesistancy. Charisma++.`));
    player.charisma++;
    return { interrupt: false };
  }
}
