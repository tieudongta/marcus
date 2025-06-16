import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';
import { TimeSystem } from '../../../core/TimeSystem.mjs';
describe('Character VitalStats clamping and resting integration', () => {
  let timeSystem;
  let character;

  beforeEach(() => {
    timeSystem = new TimeSystem();

    // Create a character with normal template, level 1 for baseline
    character = Character.fromTemplates(['normal'], 1, { timeSystem });
  });
  afterEach(() => {
    timeSystem.subscribers.clear();
    });
  it('VitalStats initial structure is valid', () => {
    expect(character).to.be.instanceOf(Character);
    const energyStat = character.vitalStats.stats['energy'];
    expect(energyStat).to.be.an('object');
    expect(energyStat).to.have.property('current').that.is.a('number');
    expect(energyStat).to.have.property('max').that.is.a('number');
  });

  it('Energy drains normally on time ticks', () => {
    const initialEnergy = character.vitalStats.get('energy');
    timeSystem.advanceTime(1); // 1 minute tick triggers onTimeTick

    const afterEnergy = character.vitalStats.get('energy');
    expect(afterEnergy).to.be.below(initialEnergy);
    expect(afterEnergy).to.be.at.least(0);
  });

  it('Energy regenerates during resting at night and clamps to max', () => {
  character.rest();
  
  // Force time to Night phase
  timeSystem.totalMinutes = 23 * 60; // 11 PM
  character.vitalStats.set('energy', 50);

  // Advance 300 minutes (5 hours)
  timeSystem.advanceTime(5, 0);

  const energyAfterRegen = character.vitalStats.get('energy');
  const energyMax = character.vitalStats.getMax('energy');
  const expectedEnergy = Math.min(50 + 300 * 0.2, energyMax); // 50 + 60 = 110, clamped to 100

  expect(energyAfterRegen).to.be.at.most(energyMax);
  expect(energyAfterRegen).to.equal(expectedEnergy);
});


  it('Energy does not exceed max or go below zero during onTimeTick', () => {
    const maxEnergy = character.vitalStats.getMax('energy');

    // Manually set energy to max + 10 (simulate a bug or bad input)
    character.vitalStats.set('energy', maxEnergy + 10);

    // Trigger tick to clamp energy down to max
    character.onTimeTick(1);

    expect(character.vitalStats.get('energy')).to.be.closeTo(maxEnergy, 0.1);

    // Set energy below zero
    character.vitalStats.set('energy', -10);

    // Trigger tick to clamp energy up to 0
    character.onTimeTick(1);

    expect(character.vitalStats.get('energy')).to.equal(0);
  });

  it('No type error when advancing time and energy clamps properly', () => {
    character.rest();

    // Set energy close to max
    const maxEnergy = character.vitalStats.getMax('energy');
    character.vitalStats.set('energy', maxEnergy - 1);

    // Advance time in increments to trigger multiple ticks
    for (let i = 0; i < 10; i++) {
      expect(() => timeSystem.advanceTime(10)).to.not.throw();
    }

    // Final energy must be clamped to max and no errors thrown
    expect(character.vitalStats.get('energy')).to.be.at.most(maxEnergy);
  });
});
