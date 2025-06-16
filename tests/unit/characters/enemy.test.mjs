import { expect } from 'chai';
import sinon from 'sinon';
import { Enemy } from '../../../characters/Enemy.mjs';
import { Character } from '../../../characters/Character.mjs';
describe('Enemy Class', () => {
  let enemy;

  const lootTable = [
    { name: 'Common Sword', rarity: 'Common' },
    { name: 'Rare Shield', rarity: 'Rare' },
    { name: 'Epic Staff', rarity: 'Epic' }
  ];

  beforeEach(() => {
    enemy = new Enemy({
      name: 'Orc',
      level: 2,
      lootTable,
      statTemplate: 'default'
    });
  });

  it('should be instance of Enemy and Character', () => {
    expect(enemy).to.be.instanceOf(Enemy);
    expect(enemy).to.be.instanceOf(Character);
  });

  it('should initialize lootTable correctly', () => {
    expect(enemy.lootTable).to.deep.equal(lootTable);
  });

  it('should initialize stats from template if not provided', () => {
    const newEnemy = new Enemy({ statTemplate: 'default', level: 1 });
    expect(newEnemy.vitalStats).to.exist;
    expect(newEnemy.attributeStats).to.exist;
    expect(newEnemy.personalityStats).to.exist;
  });

  it('should drop loot only if dead', () => {
    sinon.stub(console, 'log');

    // alive enemy drops no loot
    enemy.vitalStats.set('health', 10);
    let drops = enemy.dropLoot();
    expect(drops).to.be.an('array').that.is.empty;
    expect(console.log.calledWith('Loot not dropped, enemy still alive.')).to.be.true;

    console.log.restore();

    // dead enemy drops loot
    enemy.vitalStats.set('health', 0);

    // Stub Math.random to control drop chance
    const randomStub = sinon.stub(Math, 'random');
    // Force roll so some items drop and some don't
    // For example, first roll < 0.6 * 100 (60), second roll > 0.15 * 100 (15), third roll < 0.05*100 (5)
    randomStub.onCall(0).returns(0.5); // Common: roll 50 < 60 => drop
    randomStub.onCall(1).returns(0.9); // Rare: roll 90 > 15 => no drop
    randomStub.onCall(2).returns(0.03); // Epic: roll 3 < 5 => drop

    drops = enemy.dropLoot();

    expect(drops).to.have.lengthOf(2);
    expect(drops.map(i => i.name)).to.include('Common Sword');
    expect(drops.map(i => i.name)).to.include('Epic Staff');

    randomStub.restore();
  });

  it('should guarantee at least one loot drop if none roll', () => {
  enemy.vitalStats.set('health', 0);

  // Stub random so no drops happen normally
  const randomStub = sinon.stub(Math, 'random').returns(0.99);

  const drops = enemy.dropLoot();

  expect(drops).to.have.lengthOf(1);

  const droppedItem = drops[0];

  // Assuming lootTable is enemy.lootTable or accessible variable
  const found = enemy.lootTable.find(item => item.name === droppedItem.name);

  expect(found).to.exist;

  randomStub.restore();
});


});
