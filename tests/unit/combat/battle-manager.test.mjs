import { expect } from "chai";
import sinon from "sinon";
import { BattleManager } from "../../../combat/BattleManager.mjs";
import { Enemy } from "../../../characters/Enemy.mjs";
import { Player } from "../../../characters/Player.mjs";
describe("BattleManager Class", () => {
    let characterA, characterB, battle;

    beforeEach(() => {
        
        characterA = new Player({ name: "Hero" });
        characterB = new Enemy({ name: "Monster", lootTable: [
                { name: "Iron Sword", rarity: "Rare" },
                { name: "Gold Coin", rarity: "Common" }
            ] });

        characterA.vitalStats.set("health", 30);
        characterB.vitalStats.set("health", 25);

        characterA.attributeStats.set("strength", 10);
        characterA.attributeStats.set("agility", 2);
        characterB.attributeStats.set("strength", 8);
        characterB.attributeStats.set("agility", 1);

        battle = new BattleManager(characterA, characterB);
    });
    afterEach(()=>{
        sinon.restore();
    });

    it("should correctly calculate dodge probability", () => {
        characterB.attributeStats.set("agility", 100);
        const randomStub = sinon.stub(Math, "random").returns(0.01);

        expect(battle.calculateDodge(characterB)).to.be.true;

        randomStub.restore();
    });

    it("should correctly apply critical hits", () => {
        characterA.attributeStats.set("intelligence", 20);
        const randomStub = sinon.stub(Math, "random").returns(0.05);

        expect(battle.calculateCrit(characterA)).to.be.true;

        randomStub.restore();
    });

    it("should resolve attacks correctly with damage applied", () => {
        characterA.attributeStats.set("strength", 50);
        characterB.attributeStats.set("agility", 0);
        characterB.vitalStats.set("health", 100);
        
        const attackResult = battle.resolveAttack(characterA, characterB);
        expect(attackResult.damage).to.equal(50);
        expect(attackResult.dodged).to.be.false;
        expect(attackResult.critical).to.be.false;
    });

    it("should correctly prevent damage if dodge occurs", () => {
        characterB.attributeStats.set("agility", 100);
        const randomStub = sinon.stub(Math, "random").returns(0.01);

        const attackResult = battle.resolveAttack(characterA, characterB);
        expect(attackResult.damage).to.equal(0);
        expect(attackResult.dodged).to.be.true;
        expect(attackResult.critical).to.be.false;

        randomStub.restore();
    });

    it("should log attack results correctly", () => {
        const logSpy = sinon.spy(battle, "logBattleEvent");

        battle.takeTurn();
        expect(logSpy.called).to.be.true;

        logSpy.restore();
    });

    it("should declare winner when health reaches zero", () => {
        characterA.attributeStats.set("strength", 100);
        characterB.vitalStats.set("health", 50);
        sinon.stub(Math, "random").returns(0.5);

        const declareWinnerSpy = sinon.spy(battle, "declareWinner");

        battle.takeTurn();

        expect(characterB.vitalStats.get("health")).to.equal(0);
        expect(declareWinnerSpy.calledOnce).to.be.true;

        Math.random.restore();
        declareWinnerSpy.restore();
    });

    it("should switch turns correctly", () => {
        battle.currentTurnIndex = 0;
        battle.switchTurn();
        expect(battle.currentTurnIndex).to.equal(1);
    });
});