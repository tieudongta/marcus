export class Item {
    constructor({ 
        id,
        name, 
        description = "",
        type = "item",
        requirements = "", 
        effect = {}, 
        stackable = true, 
        price = 0, 
        rarity = "common", durability }) {
        this.id = id;
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
