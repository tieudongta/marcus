import { expect } from "chai";
import sinon from "sinon";
import { Player } from "../../../characters/Player.mjs";
import { createEnemyFromPreset } from "../../../factory/characters/enemyFactory.mjs";
import { createItemFromConfig } from "../../../factory/items/itemFactory.mjs";
describe("Game Flow Integration (Enhanced Factory Version)", () => {
  let player, enemy;

  beforeEach(() => {
    player = new Player({ name: "Hero" });
    enemy = createEnemyFromPreset("goblin"); // Factory generates enemy from preset
  });

  describe("Enemy Initialization", () => {
    it("should initialize enemy from config with correct properties", () => {
      expect(enemy.name).to.equal("Goblin");
      expect(enemy.level).to.equal(1);
      expect(enemy.wallet.balance).to.equal(5);
      expect(enemy.vitalStats.get("health")).to.be.a("number");
      expect(enemy.attributeStats.get("strength")).to.be.a("number");
    });
  });

  describe("Battle and Loot Flow", () => {
    it("should add loot to player's inventory after battle", () => {
      // Kill the enemy
      enemy.takeDamage(999);
      expect(enemy.isAlive).to.be.false;

      // Stub RNG to guarantee loot drop
      const stub = sinon.stub(Math, "random").returns(0.01);
      const loot = enemy.dropLoot();
      stub.restore();

      expect(loot.length).to.be.greaterThan(0);

      // Player picks up the loot
      loot.forEach(item => player.pickLoot(item));

      // Verify each dropped item is in player's inventory with quantity > 0
      loot.forEach(droppedItem => {
        const invEntry = player.inventory.items.find(
          entry => entry.item.name === droppedItem.name
        );
        expect(invEntry).to.exist;
        expect(invEntry.quantity).to.be.greaterThan(0);
      });
    });

    it("should stack identical stackable items like potions", () => {
      const potion1 = createItemFromConfig("health_potion");
      const potion2 = createItemFromConfig("health_potion");

      player.pickLoot(potion1);
      player.pickLoot(potion2);

      const found = player.inventory.items.find(i => i.item.name === "Health Potion");
      expect(found).to.exist;
      expect(found.quantity).to.equal(2);
    });

    it("should not stack non-stackable items like swords", () => {
      const sword1 = createItemFromConfig("bronze_sword");
      const sword2 = createItemFromConfig("bronze_sword");

      player.pickLoot(sword1);
      player.pickLoot(sword2);

      const matches = player.inventory.items.filter(i => i.item.name === "Bronze Sword");
      expect(matches.length).to.equal(2);
      expect(matches[0].quantity).to.equal(1);
      expect(matches[1].quantity).to.equal(1);
    });
  });

  describe("Combat Mechanics", () => {
    it("should factor weapon attackPower into offense", () => {
      const sword = createItemFromConfig("bronze_sword");
      player.equipWeapon(sword);
      player.attributeStats.set("strength", 10); // Set base strength for test

      const offense = player.getOffense(enemy);
      expect(offense).to.equal(10 + sword.attackPower);
    });
  });
});
