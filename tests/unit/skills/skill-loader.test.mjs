import { expect } from 'chai';
import { loadSkills } from '../../../factory/skills/skillFactory.mjs';
import { skillDataBank } from '../../../data/skills/skillData.mjs'
describe('Skill Loader', () => {
  it('should load all skills from the data bank', () => {
    const skills = loadSkills(skillDataBank);
    expect(Object.keys(skills)).to.have.length.greaterThan(0);
  });

  it('should correctly load the "craft_basic_tools" skill', () => {
    const skills = loadSkills(skillDataBank);
    const skill = skills['craft_basic_tools'];

    expect(skill).to.exist;
    expect(skill.name).to.equal('Craft Basic Tools');
    expect(skill.level).to.equal('novice');
    expect(skill.nextSkills).to.include('metal_tool_crafting');
    expect(skill.race).to.include('Dwarf');
  });
});
