import { expect } from 'chai';
import { AttributeStats } from '../../../stats/AttributeStats.mjs';
describe('AttributeStats', () => {
  it('initializes correctly', () => {
    const stats = new AttributeStats({ strength: 10, agility: 5 });
    expect(stats.get('strength')).to.equal(10);
    expect(stats.get('agility')).to.equal(5);
  });

  it('increases all stats on level up', () => {
    const stats = new AttributeStats({ strength: 3, agility: 4 });
    const lvUp = 2;
    const previousStr = stats.get('strength');
    const previousAgi = stats.get('agility');
    stats.onLevelUp(lvUp);
    //console.error(stats);
    expect(stats.get('strength')).to.equal(previousStr + (lvUp -1));
    expect(stats.get('agility')).to.equal(previousAgi +(lvUp-1));
  });

  it('can increase individual stat', () => {
    const stats = new AttributeStats({ intelligence: 2 });
    stats.increase('intelligence', 3);
    expect(stats.get('intelligence')).to.equal(5);
  });
});
