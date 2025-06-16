import { expect } from 'chai';
import { Character } from '../../../characters/Character.mjs';

describe('Character Skill Logic (Mocha + Chai)', () => {
    const dummySkills = {
        fireball: {
            id: 'fireball',
            race: ['Human', 'Elf'],
            level: 'starter',
            getAttributeBoosts: () => ({ strength: 2, intelligence: 3 })
        },
        stealth: {
            id: 'stealth',
            race: ['Human'],
            level: 'starter',
            getAttributeBoosts: () => ({ agility: 4 })
        },
        rage: {
            id: 'rage',
            race: ['Orc'],
            level: 'starter',
            getAttributeBoosts: () => ({ strength: 5 })
        },
        // Non-starter skill
        ultimate: {
            id: 'ultimate',
            race: ['Human'],
            level: 'advanced',
            getAttributeBoosts: () => ({ strength: 99 })
        }
    };

    const baseAttributes = { strength: 5, agility: 2, intelligence: 1 };

    const createCharacter = () =>
        new Character({
            race: 'Human',
            attributeStatsConfig: baseAttributes,
            allSkills: dummySkills,
        });

    it('should assign 2 to 4 starter skills for the correct race', () => {
        const char = createCharacter();
        const skills = Object.keys(char.skills);
        expect(skills.length).to.be.at.least(2);
        expect(skills.length).to.be.at.most(4);
        skills.forEach(id => {
            expect(['fireball', 'stealth']).to.include(id);
        });
    });

    it('should exclude starter skills for other races', () => {
        const char = createCharacter();
        expect(char.skills).to.not.have.property('rage');
    });

    it('should not assign non-starter level skills', () => {
        const char = createCharacter();
        expect(char.skills).to.not.have.property('ultimate');
    });

    it('should compute effectiveAttributes with all skill boosts applied', () => {
        const char = createCharacter();
        const effective = char.effectiveAttributes;
        expect(effective.strength).to.be.at.least(baseAttributes.strength);
        expect(effective.intelligence).to.be.a('number');
    });

    it('should not mutate base attributeStats', () => {
        const char = createCharacter();
        const raw = char.attributeStats.serialize();
        const boosted = char.effectiveAttributes;
        expect(raw.strength).to.equal(baseAttributes.strength);
        expect(boosted.strength).to.be.greaterThanOrEqual(raw.strength);
    });

    it('should fallback to base attributes if no skills present', () => {
        const char = new Character({
            race: 'Human',
            attributeStatsConfig: baseAttributes,
            allSkills: {} // No skills provided
        });
        const effective = char.effectiveAttributes;
        expect(effective).to.deep.equal(baseAttributes);
    });
});
