// skillValidation.mjs

const levelOrder = ["starter", "novice", "apprentice", "veteran", "master"];

/**
 * Find missing next_skill references
 */
export function findMissingPrerequisites(allSkills) {
  const missing = new Set();

  for (const [skillId, skill] of Object.entries(allSkills)) {
    if (!skill.next_skill) continue;
    for (const nextId of skill.next_skill) {
      if (!(nextId in allSkills)) {
        missing.add(nextId);
        console.warn(`❌ Skill "${skillId}" points to missing next_skill "${nextId}"`);
      }
    }
  }

  return Array.from(missing);
}

/**
 * Find orphan skills (not referenced by any other skill's next_skill)
 */
export function findOrphanSkills(allSkills, starterSkills = []) {
  const referenced = new Set();
  for (const skill of Object.values(allSkills)) {
    if (!skill.next_skill) continue;
    skill.next_skill.forEach(id => referenced.add(id));
  }
  return Object.keys(allSkills).filter(id => !referenced.has(id) && !starterSkills.includes(id));
}

/**
 * Validate progression levels of next_skill (must be exactly next higher level)
 */
export function validateSkillLevels(allSkills) {
  const errors = [];

  for (const [skillId, skill] of Object.entries(allSkills)) {
    const currentLevelIndex = levelOrder.indexOf(skill.level.toLowerCase());
    if (!skill.next_skill) continue;

    for (const nextId of skill.next_skill) {
      const nextSkill = allSkills[nextId];
      if (!nextSkill) continue;
      const nextLevelIndex = levelOrder.indexOf(nextSkill.level.toLowerCase());
      if (nextLevelIndex !== currentLevelIndex + 1) {
        errors.push(`❌ Skill "${skillId}" (${skill.level}) links to "${nextId}" (${nextSkill.level}) which is not the next level.`);
      }
    }
  }

  return errors;
}

/**
 * Validate branch consistency (next skills ideally in same branch)
 */
export function validateBranches(allSkills) {
  const warnings = [];

  for (const [skillId, skill] of Object.entries(allSkills)) {
    if (!skill.next_skill) continue;

    for (const nextId of skill.next_skill) {
      const nextSkill = allSkills[nextId];
      if (!nextSkill) continue;
      if (skill.branch !== nextSkill.branch) {
        warnings.push(`⚠️ Skill "${skillId}" (branch: ${skill.branch}) links to "${nextId}" (branch: ${nextSkill.branch}).`);
      }
    }
  }

  return warnings;
}

/**
 * Validate race and attribute coherence between skills and their next_skill
 */
export function validateRaceAttributes(allSkills) {
  const warnings = [];

  for (const [skillId, skill] of Object.entries(allSkills)) {
    if (!skill.next_skill) continue;

    for (const nextId of skill.next_skill) {
      const nextSkill = allSkills[nextId];
      if (!nextSkill) continue;

      const raceMatch = nextSkill.race.some(r => skill.race.includes(r) || r === "All");
      if (!raceMatch) {
        warnings.push(`⚠️ Skill "${skillId}" races [${skill.race.join(", ")}] do not match next skill "${nextId}" races [${nextSkill.race.join(", ")}].`);
      }

      const attrMatch = nextSkill.attributes.some(a => skill.attributes.includes(a));
      if (!attrMatch) {
        warnings.push(`⚠️ Skill "${skillId}" attributes [${skill.attributes.join(", ")}] differ from next skill "${nextId}" attributes [${nextSkill.attributes.join(", ")}].`);
      }
    }
  }

  return warnings;
}
