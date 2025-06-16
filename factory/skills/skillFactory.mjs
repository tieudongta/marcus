
import { Skill } from "../../skills/Skill.mjs";
export function loadSkills(skillDataBank) {
    const skills = {};
    for (const skillId in skillDataBank) {
        const data = { ...skillDataBank[skillId], id: skillId};
        skills[skillId] = new Skill(data);
    }
    return skills;
}