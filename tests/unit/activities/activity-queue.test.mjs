import { expect } from "chai";
import { ActivityQueue } from "../../../activities/ActivityQueue.mjs"
describe("ActivityQueue", () => {
  let character, timeSystem, queue, mockActivity;

  beforeEach(() => {
    character = { name: "TestCharacter", stats: {}, location: "Home" };
    timeSystem = { phase: "Night" };

    mockActivity = {
      canPerform: () => true,
      perform: (char, time) => {
        char.performed = true;
        char.performedAt = time.currentTime;
      }
    };

    // Add currentTime to mock time system
    timeSystem.currentTime = 600;

    queue = new ActivityQueue(character);
  });
    it("should schedule and retrieve upcoming activity", () => {
    queue.schedule(mockActivity, 620);

    const upcoming = queue.getUpcoming();
    expect(upcoming).to.have.lengthOf(1);
    expect(upcoming[0].activity).to.equal(mockActivity);
    expect(upcoming[0].startTime).to.equal(620);
  });
    it("should not perform an activity before its startTime", () => {
    queue.schedule(mockActivity, 700);
    queue.process(600, timeSystem);

    expect(character.performed).to.be.undefined;
  });
    it("should perform an activity at or after its startTime", () => {
    queue.schedule(mockActivity, 600);
    queue.process(600, timeSystem);

    expect(character.performed).to.be.true;
    expect(character.performedAt).to.equal(600);
  });
    it("should remove completed activities from the queue", () => {
    queue.schedule(mockActivity, 600);
    queue.process(600, timeSystem);

    expect(queue.getUpcoming()).to.have.lengthOf(0);
  });
    it("should not perform activity if canPerform returns false", () => {
    const blockedActivity = {
      canPerform: () => false,
      perform: () => { throw new Error("Should not run"); }
    };

    queue.schedule(blockedActivity, 600);
    queue.process(600, timeSystem);

    expect(queue.getUpcoming()).to.have.lengthOf(1);
  });
});
