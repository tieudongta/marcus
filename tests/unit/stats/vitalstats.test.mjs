import { expect } from "chai";
import { VitalStats } from "../../../stats/VitalStats.mjs";
import { Character } from "../../../characters/Character.mjs";
describe("VitalStats", () => {
  it("initializes with current and max values", () => {
    const vitals = new VitalStats({
      health: { current: 50, max: 100 },
      mana: { current: 30, max: 60 }
    });

    expect(vitals.get("health")).to.equal(50);
    expect(vitals.getMax("mana")).to.equal(60);
  });

  it("clamps changes within bounds", () => {
    const vitals = new VitalStats({
      energy: { current: 20, max: 40 }
    });

    vitals.change("energy", +30); // should cap at max
    expect(vitals.get("energy")).to.equal(40);

    vitals.change("energy", -50); // should floor at 0
    expect(vitals.get("energy")).to.equal(0);
  });

  it("ignores changes to unknown stats", () => {
    const vitals = new VitalStats({ health: { current: 10, max: 20 } });
    vitals.change("Unknown", 5); // should not throw
    expect(vitals.get("health")).to.equal(10);
    expect(vitals.get("Unknown")).to.equal(0);
  });

  it("serializes state deeply", () => {
    const vitals = new VitalStats({
      stamina: { current: 15, max: 25 }
    });

    const serialized = vitals.serialize();
    expect(serialized).to.deep.equal({
      stamina: { current: 15, max: 25 }
    });
  });

  it("onLevelUp increases max and refills", () => {
    const vitals = new VitalStats({
      health: { current: 50, max: 100 },
      mana: { current: 20, max: 60 }
    });
    const previousMaxHp = vitals.getMax("health");
    const previousMaxMana = vitals.getMax("mana");
    const nextLevel = 2;
    vitals.onLevelUp(nextLevel);
    //max = 100 + 10 (lv:2 -1) = 110
    expect(vitals.getMax("health")).to.equal(previousMaxHp + 10*(nextLevel - 1));
    expect(vitals.get("health")).to.equal(previousMaxHp + 10*(nextLevel - 1));
    expect(vitals.getMax("mana")).to.equal(previousMaxMana + 10*(nextLevel - 1));
    expect(vitals.get("mana")).to.equal(previousMaxMana + 10*(nextLevel - 1));
  });
});
describe("VitalStats with passive rules", () => {
  let vitals;

  beforeEach(() => {
    const stats = {
      hunger: { current: 80, max: 100 },
      energy: { current: 90, max: 100 },
      health: { current: 50, max: 100 },
    };

    const passiveRules = {
      hunger: { delta: -1, interval: 60 }, // lose 1 per hour
      energy: { delta: -1, interval: 30 }, // lose 1 per 30 min
      health: {
        delta: +2,
        interval: 60,
        condition: (char) => char?.isResting === true,
      }
    };

    vitals = new VitalStats(stats, passiveRules);
  });

  it("applies passive decay over time", () => {
    vitals.tick(180); // 3 hours

    expect(vitals.get("hunger")).to.equal(77); // lost 3
    expect(vitals.get("energy")).to.equal(84); // lost 6
  });

  it("respects health regen condition", () => {
    
    const mock =new Character();
    mock.isResting = true;
    vitals.tick(180, mock);
    expect(vitals.get("health")).to.equal(56); // healed 3 x 2 = 6
  });

  it("does not apply regen when condition fails", () => {
    const mockChar = { isResting: false };
    vitals.tick(180, mockChar);

    expect(vitals.get("health")).to.equal(50); // unchanged
  });

  it("never goes below 0 or above max", () => {
    vitals.tick(10000); // large value

    expect(vitals.get("hunger")).to.be.greaterThanOrEqual(0);
    expect(vitals.get("energy")).to.be.greaterThanOrEqual(0);
    expect(vitals.get("health")).to.be.lessThanOrEqual(vitals.getMax("health"));
  });
});