import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';
import { TimeSystem } from '../../../core/TimeSystem.mjs';

describe('Character with real TimeSystem', () => {
  let timeSystem;
  let character;

  beforeEach(() => {
    timeSystem = new TimeSystem();
    character = new Character({
      name: "TestHero",
      level: 1,
      walletInitial: 100,
      vitalStatsConfig: {
        energy: { current: 100, max: 100 },
        health: { current: 100, max: 100 }
      },
      attributeStatsConfig: {},
      personalityStatsConfig: {},
      timeSystem
    });
  });

  it('should initialize with correct energy and health', () => {
    expect(character.vitalStats.get('energy')).to.equal(100);
    expect(character.vitalStats.get('health')).to.equal(100);
  });

  it('should reduce energy over time ticks', () => {
    timeSystem.advanceTime(1); // 1 hour = 60 min, should reduce energy by 6
    expect(character.vitalStats.get('energy')).to.be.closeTo(94, 0.1);
  });

  it('should reduce energy multiple times on repeated time advance', () => {
    timeSystem.advanceTime(2); // 120 mins = -12 energy
    timeSystem.advanceTime(1); // 60 mins = -6 energy more
    expect(character.vitalStats.get('energy')).to.be.closeTo(82, 0.1);
  });

  it('should not go below 0 energy', () => {
    timeSystem.advanceTime(20); // 1200 mins = -120 energy
    expect(character.vitalStats.get('energy')).to.equal(0);
  });

  it('should reflect time phase changes (check by side-effect)', () => {
    const phases = [];

    // Register the callback properly
    timeSystem.setOnPhaseChange((oldPhase, newPhase) => {
      phases.push({ from: oldPhase, to: newPhase });
    });

    // Advance time enough to cause a phase change
    timeSystem.advanceTime(8,0); // 8 hours

    // Check phases array after time advance
    expect(phases.length).to.be.greaterThan(0);
    expect(phases[0]).to.have.keys(['from', 'to']);
  });


  it('should preserve health while energy drops', () => {
    timeSystem.advanceTime(5); // -30 energy
    expect(character.vitalStats.get('health')).to.equal(100);
    expect(character.vitalStats.get('energy')).to.equal(70);
  });
});
