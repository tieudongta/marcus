import { expect } from 'chai';
import { Item } from '../../../items/Item.mjs';
describe('Item Class', () => {
    it('should initialize correctly', () => {
        const item = new Item({ name: 'Health Potion', description: 'Restores 50 HP', requirements: [], effect: 'heal' });
        expect(item.name).to.equal('Health Potion');
        expect(item.effect).to.equal('heal');
    });
});