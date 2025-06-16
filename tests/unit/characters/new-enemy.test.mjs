import { expect } from 'chai';
import { Enemy } from '../../../characters/Enemy.mjs';
describe('Enemy class', () => {
  it('should instantiate with proper stats instances', () => {
    const enemy = new Enemy({
      statTemplate: 'normal',
      level: 2,
      name: 'Goblin'
    });

    expect(enemy.attributeStats).to.have.property('get').that.is.a('function');
    expect(enemy.vitalStats).to.have.property('getMax').that.is.a('function');
    expect(enemy.personalityStats).to.have.property('get').that.is.a('function');
  });

  it('should level up and keep or increase attribute stats', () => {
    const enemy = new Enemy({
      statTemplate: 'normal',
      level: 2,
      name: 'Goblin'
    });

    const oldStrength = enemy.attributeStats.get('strength') || 0;
    enemy.levelUp();
    const newStrength = enemy.attributeStats.get('strength') || 0;

    expect(newStrength).to.be.at.least(oldStrength);
  });
});
