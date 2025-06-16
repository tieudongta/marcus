import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';
import { TimeSystem } from '../../../core/TimeSystem.mjs';
describe('Character resting behavior with TimeSystem', () => {
  let time;
  let char;

  beforeEach(() => {
    time = new TimeSystem();
    char = new Character({
      name: "Sleeper",
      vitalStatsConfig: {
        energy: { current: 50, max: 100 },
        health: { current: 100, max: 100 }
      },
      timeSystem: time
    });
  });

  it('should regain energy during night while resting', () => {
    char.rest();
    time.totalMinutes = 1380; // 11:00 PM
    time.advanceTime(1); // 1 hour
    expect(char.vitalStats.get('energy')).to.be.greaterThan(50);
  });

  it('should not regain energy if not resting at night', () => {
    char.isResting = false;
    time.totalMinutes = 1320; // 10:00 PM
    time.advanceTime(1);
    expect(char.vitalStats.get('energy')).to.be.lessThan(50);
  });

  it('should clamp energy to max', () => {
    char.vitalStats.set('energy', 98);
    char.rest();
    time.totalMinutes = 1350; // 10:30 PM
    time.advanceTime(0,30); // +6 energy
    expect(char.vitalStats.get('energy')).to.equal(100);
  });

  it('should stop restoring energy if not Night phase', () => {
    char.vitalStats.set('energy', 70);
    char.rest();
    time.totalMinutes = 600; // 10:00 AM — Morning
    time.advanceTime(1);
    expect(char.vitalStats.get('energy')).to.be.lessThan(70);
  });
});
