import { expect } from 'chai';
import { Player } from '../../../characters/Player.mjs';
import { Potion } from '../../../items/Potion.mjs';
import { Item } from '../../../items/Item.mjs';
import { ACTION_CONFIG } from '../../../data/activities/actionConfigs.mjs';
function createMockConfig() {
  return {
    name: 'TestPlayer',
    vitalStats: {
      health: { current: 50, max: 100 },
    },
    coreStats: { strength: 10 },
    personalityStats: { charisma: 5 }
  };
}

describe('Player Gain Xp Integration', function () {
    let player;

    beforeEach(() => {
        player = new Player(createMockConfig());
        player.vitalStats.set('health', 50);
    });

    it('should initialize with correct defaults', () => {
        expect(player.level).to.equal(1);
        expect(player.xp).to.equal(0);
        expect(player.vitalStats.get('health')).to.equal(50);
    });

    it('should perform actions and gain XP', () => {
        player.timeSystem = { advance: (time) => { player._timeAdvanced = time; } };
        player.performAction({ xpGained: 10, timeSpent: 5 });

        expect(player._timeAdvanced).to.equal(5);
        expect(player.xp).to.equal(10);
    });

    it('should level up when enough XP is gained', () => {
        player.gainXp(200);
        expect(player.level).to.equal(2);
        expect(player.xp).to.equal(100);
    });

    it('should compute offense correctly with weapon', () => {
        player.equippedWeapon = { durability: 10, attackPower: 15 };
        const offense = player.getOffense();
        expect(offense).to.equal(25); // 10 str + 15 weapon
    });

    it('should heal and perform action', () => {
        const before = player.vitalStats.get('health');
        player.heal(20);
        expect(player.vitalStats.get('health')).to.equal(before + 20);
    });

    it('should rest, heal, and reset rest state', () => {
        player.restFor();
        expect(player.vitalStats.get('health')).to.be.greaterThan(50);
        expect(player.isResting).to.be.false;
    });

    it('should not use item if not a potion or not in inventory', () => {
        const fakeItem = { name: 'NotAPotion' };
        const result = player.useItem(fakeItem);
        expect(result).to.be.false;
    });

    it('should use potion, heal, and remove from inventory', () => {
        const potion = new Potion({ name: 'Healing Potion', effectAmount: 20 });
        player.pickLoot(potion);
        
        player.vitalStats.set('health', 50);

        const used = player.usePotion(potion);
        expect(used).to.be.true;
        expect(player.vitalStats.get('health')).to.equal(70);
        expect(player.inventory.hasItem(potion)).to.be.false;
    });

    it('should pick up loot', () => {
        const item = new Item({name: "Gold Coin"});
        player.pickLoot(item);
        expect(player.inventory.hasItem(item)).to.be.true;
    });

    it('should accept a quest', () => {
        const quest = { name: 'Slay the Dragon' };
        player.acceptQuest(quest);
        expect(player.questLog).to.include(quest);
    });
});
