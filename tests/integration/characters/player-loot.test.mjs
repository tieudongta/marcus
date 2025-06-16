import { expect } from "chai";
import sinon from "sinon";

import { Player } from "../../../characters/Player.mjs";
import { Item } from "../../../items/Item.mjs";
import { Enemy } from "../../../characters/Enemy.mjs"
describe("Integration: Player Loot Pickup", () => {
  let player, enemy, sword, potion;

  beforeEach(() => {
    player = new Player({ name: "Hero" });

    sword = new Item({
      name: "Iron Sword",
      type: "weapon",
      effect: 10,
      stackable: false,
    });

    potion = new Item({
      name: "Health Potion",
      type: "potion",
      effect: 20,
      stackable: true,
    });

    enemy = new Enemy({
      name: "Goblin",
      health: 0, // Enemy is dead
      strength: 5,
      lootTable: [sword, potion],
    });
  });

  it("should add loot to player's inventory after battle", () => {
    enemy.vitalStats.set('health', 0);
    const loot = enemy.dropLoot();

    loot.forEach(item => player.pickLoot(item));
    expect(player.inventory.items.length).to.be.greaterThan(0);

    // Verify each dropped item is correctly added to inventory
    loot.forEach(lootItem => {
      const entry = player.inventory.items.find(i => i.item.name === lootItem.name);
      expect(entry).to.exist;
      expect(entry.quantity).to.be.at.least(1);
    });
  });

  it("should not add loot if enemy is alive", () => {
    enemy.health = 10; // Enemy still alive

    const loot = enemy.dropLoot();

    loot.forEach(item => player.pickLoot(item));

    // Expect no loot added since enemy is alive
    expect(player.inventory.items.length).to.equal(0);
  });
});
