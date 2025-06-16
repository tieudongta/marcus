import { expect } from 'chai';
import { Player } from '../../../characters/Player.mjs';
import { Potion } from '../../../items/Potion.mjs';


describe('Player useItem()', () => {
  let player;
  let potion;

  beforeEach(() => {
    // Setup a player with some default health stats
    player = new Player({
      name: "Hero",
      vitalStats: {
        health: { current: 50, max: 100 }
      },
      coreStats: {},
      personalityStats: {}
    });

    // Create a potion and add to inventory
    potion = new Potion({ name: "Health Potion", effectAmount: 30 });
    player.inventory.addItem(potion);
  });

  it("should use a potion and increase health", () => {
    
    if (!player.vitalStats.has("health")) {
      player.vitalStats.stats["health"] = { current: 0, max: 100 };
    }
    player.vitalStats.setMax("health", 100);
    player.vitalStats.set("health", 50);


    //player.pickLoot(potion); // Must be same object use default potion affect = 30

    const result = player.useItem(potion);
    expect(result).to.be.true;
    expect(player.vitalStats.get("health")).to.equal(80);
  });

  it('should remove potion from inventory after use if only one is present', () => {
  // Arrange: Ensure player has health below max
  player.inventory.items = [];
  player.vitalStats.setMax('health', 100);
  player.vitalStats.set('health', 50);

  // Add exactly one potion to inventory
  const potion = new Potion({ name: "Health Potion", effectAmount: 20 });
  player.pickLoot(potion);

  // Check preconditions
  const initialEntry = player.inventory.items.find(e => e.item.name === potion.name);
  expect(initialEntry).to.exist;
  expect(initialEntry.quantity).to.equal(1);

  // Act: Use the potion
  const used = player.useItem(potion);
  expect(used).to.be.true;

  // Assert: Potion entry should no longer be in inventory
  const foundAfterUse = player.inventory.items.find(e => e.item.name === potion.name);
  expect(foundAfterUse).to.be.undefined;

  // Health should have increased correctly (50 + 20 = 70)
  expect(player.vitalStats.get('health')).to.equal(70);
});


  it('should decrement potion quantity if more than one exists', () => {
    // Add a second potion to stack
    player.inventory.items = [];
    player.inventory.addItem(potion);

    player.useItem(potion);

    const found = player.inventory.items.find(entry => entry.item.name === "Health Potion");
    expect(found).to.exist;
    expect(found.quantity).to.equal(1);
  });

  it('should not use potion if health is full', () => {
    player.vitalStats.set('health', 100); // Full health
    const result = player.useItem(potion);
    expect(result).to.be.false;

    // Potion should still be in inventory
    const found = player.inventory.items.find(entry => entry.item.name === "Health Potion");
    expect(found).to.exist;
  });
});
