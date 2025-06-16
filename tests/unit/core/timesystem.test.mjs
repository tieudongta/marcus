import { expect } from 'chai';
import sinon from 'sinon';
import { TimeSystem } from '../../../core/TimeSystem.mjs';
describe("TimeSystem Class", () => {
    let timeSystem;
    beforeEach(() => {
        timeSystem = new TimeSystem();
    });
    afterEach(() => {
        timeSystem.subscribers.clear();
    });
    it("should have initial properties", () => {
        expect(timeSystem.totalMinutes).to.equal(480);
        expect(timeSystem.subscribers.size).to.equal(0);
        //inital time 08:00
        expect(timeSystem.time).to.equal('08:00');
        expect(timeSystem.day).to.equal(1);
    });

    it("should advance time increases totalMinutes", () => {
        timeSystem.advance(60);
        //480 + 60
        expect(timeSystem.totalMinutes).to.equal(540);
        expect(timeSystem.time).to.equal("09:00");
    });

    it("should correctly increment days and reset hours", () => {
        timeSystem.advance(1000); // 2 days + 2 hours
        expect(timeSystem.day).to.equal(2);
        expect(timeSystem.time).to.equal("00:40");
    });

    it("subscribers are called with correct arguments", () => {
        const mocCallback = sinon.spy();

        timeSystem.subscribe(mocCallback);
        timeSystem.advance(15); // triggers new day and time advance

        expect(mocCallback.calledOnce).to.be.true;
        expect(mocCallback.calledWith(15, 495)).to.be.true;
    });
    it("returns correct phase based on time", ()=>{
        timeSystem.totalMinutes = 420;
        expect(timeSystem.phase).to.equal("Morning");
        timeSystem.totalMinutes = 780;//13:00
        expect(timeSystem.phase).to.equal("Afternoon");
        timeSystem.totalMinutes = 1200;//20:00
        expect(timeSystem.phase).to.equal("Evening");
        timeSystem.totalMinutes = 60;
        expect(timeSystem.phase).to.equal("Night");
    });
});
describe("TimeSystem.advanceTime", ()=>{
    let timeSystem;
    beforeEach(()=>{
        timeSystem = new TimeSystem();
        sinon.spy(timeSystem, "advance");
    });
    afterEach(()=>{
        timeSystem.advance.restore();
    });
    it("advances time correctly when given only hours", ()=>{
        timeSystem.advanceTime(2);
        expect(timeSystem.advance.calledOnceWith(120)).to.be.true;
    });
    it("advances time correctly when given hours and minutes", () => {
        timeSystem.advanceTime(1, 30);
        expect(timeSystem.advance.calledOnceWith(90)).to.be.true;
    });
    it("advances zero minutes when given 0 hours and 0 minutes", () => {
        timeSystem.advanceTime(0, 0);
        expect(timeSystem.advance.calledOnceWith(0)).to.be.true;
    });
    it("handles minutes greater than 59 correctly", ()=>{
        timeSystem.advanceTime(1, 75);
        expect(timeSystem.advance.calledOnceWith(135)).to.be.true;
    })
});