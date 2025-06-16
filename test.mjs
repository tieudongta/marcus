


describe("TimeSystem Class", () => {
    it("should have initial properties", () => {
        expect(timeSystem.currentTime).to.equal(0);
        expect(timeSystem.currentDay).to.equal(0);
        expect(timeSystem.timeListeners.length).to.equal(1);
    });

    it("should advance time correctly", () => {
        timeSystem.advanceTime(1);
        expect(timeSystem.currentTime).to.equal(1);
        timeSystem.advanceTime(23);
        expect(timeSystem.currentTime).to.equal(0);
        expect(timeSystem.currentDay).to.equal(1);
        timeSystem.advanceTime(48);
        expect(timeSystem.currentDay).to.equal(3);
    });

    it("should correctly increment days and reset hours", () => {
        timeSystem.advanceTime(50); // 2 days + 2 hours
        expect(timeSystem.currentDay).to.equal(2);
        expect(timeSystem.currentTime).to.equal(2);
    });

    it("should notify listeners on time advance and new day", () => {
        const listener = {
            onTimeAdvance: sinon.spy(),
            onNewDay: sinon.spy()
        };

        timeSystem.register(listener);
        timeSystem.advanceTime(25); // triggers new day and time advance

        expect(listener.onTimeAdvance.calledWith(25)).to.be.true;
        expect(listener.onNewDay.calledOnce).to.be.true;
    });
});




describe("Stat Class", () => {
    it("should store base value and scale max correctly", () => {
        const stat = new Stat(10, 10);
        expect(stat.base).to.equal(10);
        stat.scaleMax(2);
        expect(stat.max).to.equal(20);
    });

    it("should clamp current to new max if current > max", () => {
        const stat = new Stat(30, 30);
        stat.current = 30;
        stat.scaleMax(1); // base = 30, level = 1, max = 30
        stat.scaleMax(0.5); // max = 15
        expect(stat.max).to.equal(15);
        expect(stat.current).to.equal(15); // clamped
    });
});











// test/integration/wallet-integration.test.mjs



describe('Skill Class', () => {
    let player;
    beforeEach(()=>{
        player = new Player("Marcus", 1, {
            strength: 10,
            intelligence: 5,
            agility: 7
        });
    });
    it('should initialize with correct default values', () => {
        const skill = new Skill("Blacksmithing", "strength", 1);
        expect(skill.name).to.equal('Blacksmithing');
        expect(skill.traitName).to.equal("strength");
        expect(skill.level).to.equal(0);
        expect(skill.xp).to.equal(0);
    });

    it('should not level up with insufficient XP', () => {
        const skill = new Skill("Blacksmithing", "strength", 1);
        skill.gainXp(50);
        expect(skill.xp).to.equal(50);
        expect(skill.level).to.equal(0);
    });

    it('should level up when enough XP is gained', () => {
        const skill = new Skill("Blacksmithing", "strength", 1);
        skill.gainXp(120); // Needs 100 for level 1→2
        expect(skill.level).to.equal(1);
        expect(skill.xp).to.equal(20); // Remaining XP
    });

    it('getTraitBonus return correct value based on level and multiplier', () => {
        const skill = new Skill("Blacksmithing", "strength", 2);
        skill.level = 3;
        skill.gainXp(250); 
        expect(skill.getTraitBonus().strength).to.equal(6);
        
    });

    it('updatePlayer applies trait bonus correctly', () => {
        const skill = new Skill("Blacksmithing", "strength", 1);
        skill.level = 2;
        skill.updatePlayer(player);
        expect(player.traits.strength.current).to.equal(12); // Not boosted by Blacksmithing
    });

    it('multiple level ups work correctly with extra XP', () => {
        const skill = new Skill("Blacksmithing", "strength", 1);
        skill.gainXp(350);
        //start = 0; need 100 => 1; need 200 to 2
        expect(skill.level).to.equal(2);
        expect(skill.xp).to.equal(50);
    });

});

