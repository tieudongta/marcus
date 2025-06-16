import { Item } from "../items/Item.mjs";
export class Weapon extends Item {
    constructor({ 
        name, 
        description, 
        rarity = "common", 
        effect = {}, 
        attackPower = 0, durability = 100 }) {
        super({ 
            name, 
            description, 
            type: "weapon", effect, 
            rarity, 
            durability});
        //this.boostValue = boostValue; // Amount of upgrade effect
        this.attackPower = attackPower;
    }
    degrade() {
        this.durability = Math.max(0, this.durability - 1);
        if(this.durability === 0 ) {
            console.log(`${this.name} broke!`);
        }
    }
    upgrade(material) {
        if (material.effect === "enhance") {
            this.attackPower += material.boostValue;
        }
    }
}