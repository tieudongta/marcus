import { ask } from "../scripts/utils/ask.mjs";

export async function openShop(shop, player) {
    while(true) {
        console.log("\n🛒 Welcome to the Shop!");
        console.log(shop.listItems());
        console.log(player.gold);
        const choice = await ask("Buy item #, (s)ell, (q)uit: ");
        if (choice.toLowerCase() === 'q')  break;
        if (choice.toLowerCase() === 's') {
            if (!player.inventory) return "Player inventory not found.";
            const inv = player.inventory.getItemList();
            console.log(inv);
            const sellChoice = parseInt(await ask("Sell item #: "), 10) - 1;
            const itemToSell = player.inventory.items[sellChoice]?.item;
            if (itemToSell) {
                const result = shop.sell(itemToSell, player);
                player.inventory.removeItem(itemToSell);
                console.log(result);
            }
            continue;
        }
        const index = parseInt(choice, 10) - 1;
        const result = shop.buy(index, player);
        console.log(result);
    }
}