import { Item } from "../items/Item.mjs";
export class Potion extends Item {
  constructor(config) {
    super({ ...config, type: "potion", stackable: true });
    this.effectAmount = config.effectAmount;
  }

  consume(target) {
    if (typeof target.heal === 'function') {
        target.heal(this.effectAmount);
    }
  }
}