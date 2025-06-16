import { itemPresets } from "../items/itemPresets.mjs";

function getItemsByRarity(rarity) {
    return Object.values(itemPresets).filter(item => item.rarity === rarity);
}
export function getRandomReward() {
    const roll = Math.random();

    let pool;
    if (roll < 0.6) {
        pool = getItemsByRarity("common");
    } else if (roll < 0.85) {
        pool = getItemsByRarity("uncommon");
    } else if (roll < 0.97) {
        pool = getItemsByRarity("rare");
    } else {
        pool = getItemsByRarity("epic");
    }

    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}
