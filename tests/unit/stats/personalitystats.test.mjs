import { expect } from 'chai';
import { PersonalityStats } from '../../../stats/PersonalityStats.mjs';
describe('PersonalityStats', () => {
  it('initializes correctly', () => {
    const stats = new PersonalityStats({ charisma: 6, luck: 3 });
    expect(stats.get('charisma')).to.equal(6);
    expect(stats.get('luck')).to.equal(3);
  });

  it('improves via event', () => {
    const stats = new PersonalityStats({ charisma: 4 });
    stats.improveViaEvent('charisma', 2);
    expect(stats.get('charisma')).to.equal(4);
  });

  it('onQuestComplete applies correct bonuses', () => {
    const stats = new PersonalityStats({ charisma: 3, luck: 2 });
    stats.onQuestComplete({ charisma: 2, luck: 1 });
    expect(stats.get('charisma')).to.equal(5);
    expect(stats.get('luck')).to.equal(3);
  });

  it('does not crash when stat is missing', () => {
    const stats = new PersonalityStats({ charisma: 3 });
    stats.onQuestComplete({ muck: 1 }); // 'luck' not present
    expect(stats.get('muck')).to.equal(1);
  });
});
