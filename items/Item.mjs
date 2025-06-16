export class Item {
    constructor({ 
        name, 
        description = "",
        type = "item",
        requirements = "", 
        effect = {}, 
        stackable = false, 
        price = 0, 
        rarity = "common", durability }) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.requirements = requirements;
        this.effect = effect;
        this.stackable = stackable;
        this.price = price;
        this.rarity = rarity;
        this.durability = durability;
    }
}
