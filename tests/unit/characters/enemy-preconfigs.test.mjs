
import { expect } from 'chai';
import { createEnemyFromPreset } from '../../../factory/characters/enemyFactory.mjs';
describe("Enemy Factory", () => {
    it("should create a Goblin enemy with correct properties", () => {
        const goblin = createEnemyFromPreset('goblin');
        //goblin: {
//     name: "Goblin",
//     level: 2,
//     walletInitial: 5,
//     lootTable: ["bronze_sword", "health_potion"],
//     statTemplate: "normal",
//     randomizeAttributes: true,
//     randomizePersonality: true
//   }
        expect(goblin).to.be.an('object');
        expect(goblin.name).to.equal("Goblin");
        expect(goblin.level).to.equal(1);
        expect(goblin.wallet.balance).to.equal(5);

        // Validate loot table
        expect(goblin.lootTable.length).to.equal(2);
    });

    it("should throw an error for unknown preset", () => {
        expect(() => createEnemyFromPreset('Unknow Enemy')).to.throw('Enemy preset "Unknow Enemy" not found');
    });
});
