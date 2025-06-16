import { expect } from 'chai';
import { buildCharacterFromTemplate } from '../../../factory/stats/StatTemplateFactory.mjs';
describe('StatTemplateFactory', () => {
  it('should load and build a character with "normal" template', () => {
    const result = buildCharacterFromTemplate(['normal'], 1);
    expect(result.vitalStats.health.max).to.equal(80); // fixed to match template
    expect(result.coreStats.strength).to.equal(14);     // template value
    expect(result.personalityStats.charisma).to.equal(8);
  });

  it('should apply level-up scaling correctly', () => {
    const result = buildCharacterFromTemplate(['normal'], 3);
    expect(result.vitalStats.health.max).to.equal(100); // 80 + 10 * (3 - 1)
    expect(result.coreStats.strength).to.equal(16);      // 4 + (3 - 1)
  });

  it('should throw if template is missing', () => {
    expect(() => buildCharacterFromTemplate(['missing'])).to.throw();
  });

  it('should support merging multiple templates', () => {
    const result = buildCharacterFromTemplate(['normal', 'strong'], 1);
    expect(result.vitalStats.health.max).to.equal(75); // strong overrides normal
    expect(result.coreStats.strength).to.equal(32);     // strong template strength
  });
});
