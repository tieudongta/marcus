import sinon from "sinon";
import { expect } from "chai";
import { Activity } from "../../../activities/Activity.mjs"
describe("Acctivity Class", () => {
    it("advances time and applies effect", () => {
        const character = { stats: {energy: 50 }};
        const timeSystem = { advance: sinon.spy()};
        const effect = (char) => {
            char.stats.energy += 20;
        }
        const activity = new Activity({
            label: "rest",
            duration: 60,
            effect,
        });
        activity.perform(character, timeSystem);
        //Verify time advanced
        expect(timeSystem.advance.calledOnceWith(60)).to.be.true;
        //Verify effect applied
        expect(character.stats.energy).to.equal(70);
    })
});
describe("Activity -canPerform", ()=>{
    const character = {
        stats: { energy: 30, strength: 5},
        location: "gym",
    }
    const timeSystem = { phase: "Morning" };
    it("returns true if all conditions are met", () => {
        const activity = new Activity({
            label: "train",
            duration: 60,
            allowedPhases: ["Morning"],
            requiredStats: { energy: 20 },
            locationRequired: "gym",
        });
        expect(activity.canPerform(character, timeSystem)).to.be.true;
    });
    it("returns false if time phase is not allowed", () => {
        const activity = new Activity({
            label: "sleep",
            duration: 480,
            allowedPhases: ["Night"],
        });
        expect(activity.canPerform(character, timeSystem)).to.be.false;
    });
    it("returns false if a stat requirement is not met", () => {
        const activity = new Activity({
            label: "fight",
            duration: 30,
            requiredStats: {strength: 10},
        });
        expect(activity.canPerform(character, timeSystem)).to.be.false;
    });
    it("returns false if location is wrong", () => {
        const activity = new Activity({
            label: "work",
            duration: 120,
            locationRequired: "office",
        });
        expect(activity.canPerform(character, timeSystem)).to.be.false;
    })
});
describe("Activity - onStart/onComplete hooks", () => {
    if("calls onStart and onComplete with character and timeSystem", ()=> {
        const onStart = sinon.spy();
        const onComplete = sinon.spy();
        const character = { stats: { energy: 100 } };
        const timeSystem = { advance: sinon.spy(), phase: "Morning" };
        const activity = new Activity({
            label: "test",
            duration: 30,
            onStart,
            onComplete,
        });
        activity.perform(character, timeSystem);
        expect(onStart.calledOnceWith(character, timeSystem)).to.be.true;
        expect(onComplete.calledOnceWith(character, timeSystem)).to.be.true;
        expect(timeSystem.advance.calledOnceWith(30)).to.be.true;
    });
    if("prevents performing activity if item is missing", ()=>{
        const activity = new Activity({
            label: "Craft Sword",
            duration: 60,
            requiresItem: "IronIngot"
        });
        const char = { inventory: ["Wood"], stats: {}, location: "forge" };
        const timeSystem = { phase: "Morning" };
        expect(activity.canPerform(char, timeSystem)).to.be.false;
    });
    it("grants XP when activity is performed", () => {
        const activity = new Activity({
            label: "Train",
            duration: 30,
            givesXP: { strength: 10 }
        });
        const char = {
            stats: {},
            inventory: [],
            xp: {}
        };
        const timeSystem = { advance: sinon.spy(), phase: "Afternoon" };
        activity.perform(char, timeSystem);
        expect(char.xp.strength).to.equal(10);
    });
})