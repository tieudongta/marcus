import { expect } from 'chai';
import { Player } from '../../../characters/Player.mjs';
import { Inventory } from '../../../items/Inventory.mjs';
describe('Player Class', () => {
    let player;

    beforeEach(() => {
        player = new Player({ name: 'TestPlayer', level: 1, walletInitial: 100 });
    });

    it('should initialize with inventory and quest log', () => {
        expect(player.inventory).to.be.instanceOf(Inventory);
        expect(player.questLog).to.be.an('array').that.is.empty;
    });

    it('should accept quests', () => {
        player.acceptQuest({ id: 1, name: 'Find the Artifact' });
        expect(player.questLog).to.have.lengthOf(1);
        expect(player.questLog[0].name).to.equal('Find the Artifact');
    });
});