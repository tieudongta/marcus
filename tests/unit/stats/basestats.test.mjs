import { expect } from "chai";
import { BaseStats } from "../../../stats/BaseStats.mjs";
describe("BaseStats", () => {
  it("initializes stats correctly", () => {
    const stats = new BaseStats({ strength: 10, agility: 5 });
    expect(stats.get("strength")).to.equal(10);
    expect(stats.get("agility")).to.equal(5);
  });

  it("increases a stat", () => {
    const stats = new BaseStats({ strength: 5 });
    stats.increase("strength", 2);
    expect(stats.get("strength")).to.equal(7);
  });

  it("sets a stat", () => {
    const stats = new BaseStats({ strength: 5 });
    stats.set("strength", 12);
    expect(stats.get("strength")).to.equal(12);
  });

  it("serializes stats correctly", () => {
    const stats = new BaseStats({ luck: 8 });
    const output = stats.serialize();
    expect(output).to.deep.equal({ luck: 8 });
  });

});
