import { expect } from 'chai';
import sinon from 'sinon';
import { createEnemyFromPreset } from '../../../factory/characters/enemyFactory.mjs';
describe("Integration: Preconfigured Enemy in Battle", () => {
    let goblin;

    beforeEach(() => {
        goblin = createEnemyFromPreset('goblin');
    });
    afterEach(()=>{
        sinon.restore();
    })
    it("should take damage and die if health reaches 0", () => {
        const initialHealth = goblin.vitalStats.get('health') || 10;
        goblin.takeDamage(initialHealth + 1); // Overkill
        expect(goblin.isAlive).to.be.false;
    });

    it("should always drop at least one item if lootTable is non-empty", () => {
        sinon.stub(Math, 'random').returns(0.99); // Forces all items to fail normal drop
        goblin.vitalStats.set("health", 0);
        const loot = goblin.dropLoot();
        expect(loot.length).to.equal(1); // guaranteed fallback drop
        expect(loot[0]).to.have.property('name');

        Math.random.restore();
    });
});
