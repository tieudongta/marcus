import { Item } from "./Item.mjs";

export class Tool extends Item {
    constructor({ 
        name, 
        description, 
        rarity = "common", 
        effect = {}, 
        boostValue = 0 , 
        durability
    }) {
        super({ name, description, type: "tool", effect, rarity, durability});
        this.boostValue = boostValue; // Amount of upgrade effect
    }

    applyEffect(targetItem) {
        if (this.effect === "enhance" && targetItem.attackPower) {
            targetItem.attackPower += this.boostValue;
        } else if (this.effect === "repair" && targetItem.durability) {
            targetItem.durability += this.boostValue;
        }
    }
}