import { expect } from "chai";
import sinon from "sinon";
import { Activities } from "../../../activities/ActivityRegistry.mjs";
// Mock character
const makeCharacter = (custom = {}) => ({
  name: "Alex",
  stats: { energy: 25, ...custom.stats },
  xp: {},
  inventory: custom.inventory || [],
  location: custom.location || "gym"
});

describe("ActivityRegistry Integration", () => {
  it("loads sleep activity with correct structure", () => {
    const sleep = Activities.sleep;
    expect(sleep).to.exist;
    expect(sleep.label).to.equal("Sleep");
    expect(sleep.duration).to.equal(480);
    expect(sleep.allowedPhases).to.include("Night");
    expect(sleep.effect).to.be.a("function");
  });

  it("prevents performing if required item is missing", () => {
    const train = Activities.train;
    const char = makeCharacter({ inventory: [] });
    const timeSystem = { phase: "Morning" };
    expect(train.canPerform(char, timeSystem)).to.be.false;
  });

  it("allows performing when required item is present", () => {
    const train = Activities.train;
    const char = makeCharacter({ inventory: ["TrainingPass"] });
    const timeSystem = { phase: "Morning" };
    expect(train.canPerform(char, timeSystem)).to.be.true;
  });

  it("applies XP gain correctly", () => {
    const train = Activities.train;
    const char = makeCharacter({ inventory: ["TrainingPass"] });
    const timeSystem = {
      phase: "Morning",
      advance: sinon.spy()
    };

    train.perform(char, timeSystem);

    expect(char.xp.strength).to.equal(15); // from JSON
    expect(char.stats.energy).to.equal(15); // started with 25, effect -10
    expect(timeSystem.advance.calledWith(60)).to.be.true;
  });
});
