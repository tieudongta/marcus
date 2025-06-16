import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';
import { BattleManager } from '../../../combat/BattleManager.mjs';
import { Enemy } from '../../../characters/Enemy.mjs';
describe('BattleManager', () => {
  let characterA, characterB, battle;

  beforeEach(() => {
    characterA = new Character({
      name: 'Hero',
      level: 1,
      attributeStatsConfig: {
        strength: 10,
        intelligence: 5, // 2.5% crit
        agility: 3,      // 2.1% dodge
      },
      vitalStatsConfig: {
        health: { max: 50, current: 50 },
        energy: { max: 30, current: 30 },
        mana: { max: 20, current: 20 },
      }
    });

    characterB = new Enemy({
      name: 'Goblin',
      level: 1,
      attributeStatsConfig: {
        strength: 6,
        intelligence: 1,
        agility: 10, // 7% dodge
      },
      vitalStatsConfig: {
        health: { max: 40, current: 40 },
        energy: { max: 20, current: 20 },
        mana: { max: 5, current: 5 },
      }
    });

    battle = new BattleManager(characterA, characterB);
  });

  it('runs battle turn-by-turn and ends with a winner', () => {
    const maxTurns = 100;
    let turns = 0;

    while (!battle.isBattleOver && turns < maxTurns) {
      battle.takeTurn();
      turns++;
    }

    expect(battle.isBattleOver).to.be.true;
    expect(characterA.isAlive !== characterB.isAlive).to.be.true;
    expect(characterA.isAlive || characterB.isAlive).to.be.true;
  });
});
