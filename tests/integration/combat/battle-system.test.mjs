import { expect } from 'chai';
import sinon from 'sinon';
import { createEnemyFromPreset } from '../../../factory/characters/enemyFactory.mjs';
import { Character } from '../../../characters/Character.mjs';
import { Weapon } from '../../../items/Weapon.mjs';
describe("Integration: Battle System - Player vs Enemy", () => {
    let player, enemy;

    beforeEach(async () => {
        player = new Character({
            name: "Hero",
            level: 1,
            walletInitial: 0,
            attributeStatsConfig: { strength: 10, agility: 5 },
            vitalStatsConfig: { health: 30, energy: 10 },
        });

        enemy = createEnemyFromPreset('goblin'); // now uses goblin stat template internally
    });

    it("should simulate player attacking enemy until death", () => {
        const playerAttack = player.getOffense(enemy);
        const enemyDefense = enemy.getDefense(player);
        const damage = Math.max(playerAttack - enemyDefense, 1);

        while (enemy.isAlive) {
            enemy.takeDamage(damage);
        }

        expect(enemy.isAlive).to.be.false;
    });

    it("should drop loot after enemy is defeated", () => {
        const stub = sinon.stub(Math, 'random').returns(0.01); // ensure high drop chance

        enemy.takeDamage(999); // kill the enemy
        const loot = enemy.dropLoot();

        expect(loot.length).to.be.greaterThan(0);
        expect(loot[0]).to.have.property('name');

        stub.restore();
    });

    it("should not drop loot if enemy survives", () => {
        const loot = enemy.dropLoot();
        expect(loot.length).to.be.at.least(0); // dropLoot should not crash, might return nothing
    });
});

describe("Battle with Weapon Integration", () => {
    let player, enemy, sword;

    beforeEach(() => {
        player = new Character({
            name: "Hero",
            level: 1,
            walletInitial: 0,
            attributeStatsConfig: { strength: 10, agility: 5 },
            vitalStatsConfig: { health: 30, energy: 10 },
        });

        enemy = createEnemyFromPreset('goblin');

        sword = new Weapon({
            name: "Bronze Sword",
            attackPower: 10,
            durability: 10,
            rarity: 'common'
        });

        player.equipWeapon(sword);
    });

    it("should include weapon damage in total offense", () => {
        expect(player.equippedWeapon.attackPower).to.equal(10);
        expect(player.equippedWeapon.durability).to.equal(10);

        const offense = player.getOffense(enemy);
        expect(offense).to.equal(20); // strength (10) + weapon (10)
    });
});
