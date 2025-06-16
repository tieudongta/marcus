import { skillDataBank } from "../../src/factory/data/skillData.mjs";
import { raceAttributes, xpCosts } from "../../src/factory/data/skillPresets.mjs";

export function listAllBranches(skillDataBank) {
  const branches = new Set();

  for (const skill of Object.values(skillDataBank)) {
    if (skill.branch) {
      branches.add(skill.branch.trim());
    }
  }

  const sortedBranches = Array.from(branches).sort((a, b) =>
    a.localeCompare(b)
  );

  console.log(`📚 Total Branches: ${sortedBranches.length}`);
  sortedBranches.forEach((branch, index) => {
    console.log(` ${index + 1}. ${branch}`);
  });

  return sortedBranches;
}

export function findBranchesMissingMasters(skillDataBank) {
  const branches = {};

  for (const skill of Object.values(skillDataBank)) {
    if (!branches[skill.branch]) branches[skill.branch] = new Set();
    branches[skill.branch].add(skill.level.toLowerCase());
  }

  return Object.entries(branches)
    .filter(([_, levels]) => !levels.has('master'))
    .map(([branch]) => branch);
}

export function listSkillsByRace(race, allSkills) {
  const result = Object.entries(allSkills).filter(([id, skill]) =>
    skill.race.includes(race) || skill.race.includes("All")
  );

  if (result.length === 0) {
    console.log(`⚠️ No skills found for race "${race}".`);
    return;
  }

  console.log(`📜 Skills available to race: ${race}`);
  console.log("=".repeat(50));
  result.forEach(([id, skill]) => {
    console.log(`✓ ${id.padEnd(20)} [${skill.level}, ${skill.branch}]`);
  });
}

/**
 * Recursively trace backward all prerequisites for a skill.
 * @param {string} skillId - The starting skill ID (e.g., master skill).
 * @param {object} allSkills - The full skill data bank.
 * @param {Set} visited - Used internally to avoid cycles.
 * @returns {Set<string>} - Set of all prerequisite skill IDs.
 */
export function tracePrereqsBackward(skillId, allSkills, visited = new Set()) {
  if (visited.has(skillId)) return new Set(); // avoid cycles
  visited.add(skillId);

  // Find all skills that list this skillId in their next_skill array
  const prereqSkills = Object.entries(allSkills)
    .filter(([id, skill]) => skill.next_skill?.includes(skillId))
    .map(([id]) => id);

  let allPrereqs = new Set(prereqSkills);

  for (const prereqId of prereqSkills) {
    const deeperPrereqs = tracePrereqsBackward(prereqId, allSkills, visited);
    deeperPrereqs.forEach(s => allPrereqs.add(s));
  }

  return allPrereqs;
}


export function autoLinkSkills(allSkills, {
    limit = 2,
    overwrite = false,
    onlyMissing = true,
    branchFilter = null,
    raceAware = false,
    dryRun = false
} = {}) {
    const nextLevelMap = {
        starter: "novice",
        novice: "apprentice",
        apprentice: "veteran",
        veteran: "master",
    };

    const changes = [];

    for (const [id, skill] of Object.entries(allSkills)) {
        if (onlyMissing && skill.next_skill?.length > 0) continue;
        if (branchFilter && skill.branch !== branchFilter) continue;

        const targetLevel = nextLevelMap[skill.level];
        if (!targetLevel) continue;

        const matchSet = Object.entries(allSkills).filter(([_, candidate]) => {
            if (candidate.level !== targetLevel) return false;
            if (candidate.branch !== skill.branch) return false;

            const attrMatch = candidate.attributes.some(a => skill.attributes.includes(a));
            const raceMatch = candidate.race.includes("All") || 
                              !raceAware || 
                              candidate.race.some(r => skill.race.includes(r));

            return attrMatch && raceMatch;
        });

        const topMatches = matchSet
            .sort(([, a], [, b]) => {
                const score = (s) =>
                    s.attributes.filter(attr => skill.attributes.includes(attr)).length +
                    (raceAware ? s.race.filter(r => skill.race.includes(r)).length : 0);
                return score(b) - score(a);
            })
            .slice(0, limit)
            .map(([matchId]) => matchId);

        if (!dryRun) {
            if (overwrite || !skill.next_skill) skill.next_skill = [];
            skill.next_skill = [...new Set([...skill.next_skill, ...topMatches])];
        }

        changes.push({ skillId: id, added: topMatches });
    }

    return changes;
}

export function suggestNext(skillId, allSkills) {
  const skill = allSkills[skillId];
  if (!skill) {
    console.log(`❌ Skill "${skillId}" not found.`);
    return;
  }

  console.log(`📦 Suggesting next skills for: ${skill.name}`);
  console.log("-------------------------------------------------");

  const currentRace = skill.race;
  const currentAttributes = new Set(skill.attributes);
  const currentBranch = skill.branch;

  const nextLevelMap = {
    starter: "novice",
    beginner: "novice",
    novice: "apprentice",
    apprentice: "veteran",
    veteran: "master"
  };

  const nextLevel = nextLevelMap[skill.level.toLowerCase()];
  if (!nextLevel) {
    console.log(`⚠️ No next level defined for level "${skill.level}"`);
    return;
  }

  const suggestions = Object.entries(allSkills).filter(([id, s]) => {
    return (
      id !== skillId &&
      s.level.toLowerCase() === nextLevel &&
      s.branch === currentBranch &&
      s.race.some(r => currentRace.includes(r) || r === "All") &&
      !Object.values(allSkills).some(other => (other.next_skill || []).includes(id))
    );
  });

  if (suggestions.length === 0) {
    console.log("⚠️ No suitable suggestions found.");
  } else {
    for (const [id, s] of suggestions) {
      const races = s.race.join("/");
      console.log(`✓ ${id.padEnd(20)} [${s.level}, ${s.attributes.join(", ")}, ${races}]`);
    }
  }
}


export function simulateRaceXpPath(race, branch = null, allSkills, options = {}) {
    console.log("Simulating for race:", race);
    const allowedSkills = new Map();
    const visited = new Set();
    const raceFavored = raceAttributes[race] || [];
    if (raceFavored.length === 0) {
        console.warn(`⚠️ Unknown race '${race}'. Make sure it's spelled exactly as in raceAttributes.`);
    }
    function canLearn(skill) {
        return skill.race.includes('All') || skill.race.includes(race);
    }

    function scoreAttributes(skill) {
        if (!skill.attributes) return 0;
        return skill.attributes.filter(attr => raceFavored.includes(attr)).length;
    }
    function traceSkill(id) {
        if (visited.has(id)) return;
        const skill = allSkills[id];
        if (!skill || !canLearn(skill)) return;
        if (branch && skill.branch !== branch) return;

        visited.add(id);
        const score = scoreAttributes(skill);
        allowedSkills.set(id, {...skill, id, score});

        if (skill.next_skill) {
            for (const next of skill.next_skill) {
                traceSkill(next);
            }
        }
    }
    // Find starter skills first
    Object.entries(allSkills).forEach(([id, skill]) => {
        if (skill.level.toLowerCase() === 'starter' && canLearn(skill) && (!branch || skill.branch === branch)) {
            traceSkill(id);
        }
    });
    //Sort by level, then score
    const order = ['starter', 'novice', 'apprentice', 'veteran', 'master'];
    const skillList = [...allowedSkills.values()].sort((a, b) => {
        const levelDiff = order.indexOf(a.level.toLowerCase()) - order.indexOf(b.level.toLowerCase());
        if (levelDiff !== 0) return levelDiff;
        return b.score - a.score;
    });
    //Calculate XP total
    const totalXP = skillList.reduce((sum, s) => sum + (xpCosts[s.level.toLowerCase()] || 0), 0);

    // Output
    console.log(`\n🧬 Simulation for Race: ${race}${branch ? ` | Branch: ${branch}` : ''}`);
    console.log(`Estimated Total XP to Complete Path: ${totalXP}`);
    console.log("==============================================");
    skillList.forEach(s => {
        const scoreNote = options.showScore ? ` | Score: ${s.score}` : '';
        console.log(`- ${s.id} (${s.name}) [${s.level}]${scoreNote}`);
    });
}
export function simulateRacePath(race, branch = null, allSkills) {
    const allowedSkills = new Set();
    function canLearn(skill) {
        return (skill.race.includes(race) || skill.race.includes('All'));
    }

    function traceSkill(id) {
        if (allowedSkills.has(id)) return;
        const skill = allSkills[id];
        if (!skill || !canLearn(skill)) return;
        if (branch && skill.branch !== branch) return;
        allowedSkills.add(id);
        if (skill.next_skill) {
            for (const nextId of skill.next_skill) {
                traceSkill(nextId);
            }
        }
    }
    // Step 1: Start with race-eligible starter skills
    const starterIds = Object.entries(allSkills)
    .filter(([_, skill]) => skill.level.toLowerCase() === 'starter' && canLearn(skill) && (!branch || skill.branch === branch))
    .map(([id]) => id);

    starterIds.forEach(id => traceSkill(id));

    // Step 2: Print results
    const skillList = Array.from(allowedSkills)
    .map(id => ({id, ...allSkills[id] }))
    .sort((a, b) => {
        const levelOrder = ['starter', 'novice', 'apprentice', 'veteran', 'master'];
        return levelOrder.indexOf(a.level.toLowerCase()) - levelOrder.indexOf(b.level.toLowerCase());
    });

    console.log(`\n🧭 Simulation for race: ${race}${branch ? `, branch: ${branch}` : ''}`);
    console.log("==================");
    for (const skill of skillList) {
        console.log(`- ${skill.id} (${skill.name}) [${skill.level}]`);
    }
}
export function findOrphanSkills(allSkills) {
    const reachable = new Set();

    function forwardTrace(skillId) {
        if (reachable.has(skillId)) return;
        reachable.add(skillId);

        const skill = allSkills[skillId];
        if(!skill || !skill.next_skill) return;
        for (const nextId of skill.next_skill) {
            forwardTrace(nextId);
        }
    }

    //Step 1: Find all starter skills and begin forward tracing
    const starterSkills = Object.entries(allSkills)
    .filter(([_, skill]) => skill.level.toLowerCase() === 'starter')
    .map(([id]) => id);

    starterSkills.forEach(skillId => forwardTrace(skillId));
    // Step 2: Identify orphans
    const allSkillIds = Object.keys(allSkills);
    const orphans = allSkillIds.filter(id => !reachable.has(id));

    if (orphans.length === 0) {
        console.log("✅ No orphans found. All skills are reachable from at least one starter skill.");
    } else {
        console.log("\n🚨 Orphan Skills (unreachable from any starter):\n");
        for (const id of orphans) {
            const skill = allSkills[id];
            console.log(`- ${id} (${skill.name}, ${skill.level})`);
        }
    }
}
export function findMissingPrereqs(allSkills) {
    const referenced = new Set();

    for (const skill of Object.values(allSkills)) {
        for (const next of skill.next_skill || []) {
            referenced.add(next);
        }
    }

    const missing = Object.entries(allSkills).filter(([id, skill]) => {
        return !referenced.has(id) && skill.level.toLowerCase() !== "starter";
    });

    if (missing.length === 0) {
        console.log("All skills have at least one prerequisite or are starter level.");
    } else {
        console.log("\nSkills missing prerequisites: \n");
        for (const [id, skill] of missing) {
            console.log(`- ${id} (${skill.name}, ${skill.level})`);
        }
    }
}
export function tracePrereqs(skillId, allSkills) {
    const visited = new Set();
    const path = [];

    function reverseTrace(currentId) {
        if (visited.has(currentId)) return;
        visited.add(currentId);

        for (const [id, skill] of Object.entries(allSkills)) {
            if ((skill.next_skill || []).includes(currentId)) {
                path.push({ from: id, to: currentId });
                reverseTrace(id);
            }
        }
    }
    reverseTrace(skillId);
    if (path.length === 0) {
        console.log(`No prerequisites found for skill '${skillId}'.`);
    } else {
        console.log(`\nPrerequisite path for '${skillId}':\n`);
        path.reverse().forEach(link => {
            console.log(`${link.from} => ${link.to}`);
        })
    }
}
export function simulatePath(race, branch, allSkills, characterAttributes = []) {
    const visited = new Set();
    const path = [];

    function matchesRace(skill) {
        return skill.race.includes("All") || skill.race.includes(race);
    }

    function matchesBranch(skill) {
        return skill.branch === branch;
    }

    function scoreSkill(skill) {
        const raceScore = matchesRace(skill) ? 2: 0;
        const attrScore = (skill.attributes || []).filter(attr => characterAttributes.includes(attr)).length;
        return raceScore + attrScore;
    }

    function findStartSkills() {
        return Object.entries(allSkills).filter(([id, skill]) => {
            return matchesBranch(skill) && (skill.level === 'starter' || skill.level === 'novice') && matchesRace(skill);
        });
    }

    function dfs(skillId) {
        if (visited.has(skillId)) return;
        visited.add(skillId);
        
        const skill = allSkills[skillId];
        if (!skill || !matchesBranch(skill)) return;

        path.push({ id:skillId, ...skill });

        const nextIds = skill.next_skill || [];
        const scoredNext = nextIds
        .map(id => ({ id, score: scoreSkill(allSkills[id] || {})}))
        .filter(({id}) => allSkills[id] && !visited.has(id))
        .sort((a, b) => b.score - a.score);
        for (const { id } of scoredNext ) {
            dfs(id);
        }
    }

    const starts = findStartSkills();
    if (starts.length ===0) {
        console.log("No starting skills found for this race and branch.");
        return;
    }

    const bestStart = starts
    .map(([id, skill]) => ({ id, score: scoreSkill(skill) }))
    .sort((a, b) => b.score - a.score)[0];

    dfs(bestStart.id);

    console.log(`\nSimulated path for race: ${race}, branch: ${branch}\n`);

    path.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name} (${s.level})`);
    });
}
export function viewSkill(skillId) {
    const skill = skillDataBank[skillId];
    // if(!skill) return console.log(`❌ Skill "${skillId}" not found.`);
    console.log(`\n🧠 ${skill.name} (${skill.level})`);
    console.log(`Branch: ${skill.branch}`);
    console.log(`Level: ${skill.level}`);
    console.log(`Races: ${skill.race.join(', ')}`);
    console.log(`Attributes: ${skill.attributes.join(', ')}`);
    console.log(`Next: ${skill.next_skill.join(', ') || '-'}`);
    console.log(`Description: ${skill.description}`);
}
export function viewBranch(branchName) {
    const results = Object.entries(skillDataBank).filter(
        ([, skill]) => skill.branch.toLowerCase() === branchName.toLowerCase()
    );
    if (results.length === 0) return console.log(`❌ No skills in branch "${branchName}"`);
    for (const [id, skill] of results) {
        console.log(`- ${id}: ${skill.name} [${skill.level}]`);
    }
}
export function traceBranch(startId, depth = 0, visited = new Set()) {
    const skill = skillDataBank[startId];
    if (!skill) return console.log("❌ Invalid skill:", startId);
    if (visited.has(startId)) return;
    visited.add(startId);
    console.log("  ".repeat(depth) + `↳ ${skill.name} (${startId})`);
    for (const nextId of skill.next_skill || []) {
        traceBranch(nextId, depth +1, visited);
    }
}
export function validateSkills() {
    const allIds = new Set(Object.keys(skillDataBank));
    const problems = [];
    for (const [id, skill] of Object.entries(skillDataBank)) {
        for (const nextId of skill.next_skill || []) {
            if (!allIds.has(nextId)) {
                problems.push(`❌ Skill "${id}" points to missing next_skill "${nextId}"`);
            }
        }
        if (!skill.attributes || skill.attributes.length === 0 || skill.attributes.length > 3) {
            problems.push(`⚠️ Skill "${id}" has invalid attributes length: ${skill.attributes?.length}`);
        }
    }
    if (problems.length === 0) {
        console.log("✅ All skills are structurally sound!");
    } else {
        console.log(`🔍 Found ${problems.length} issue(s):`);
        problems.forEach(msg => console.log(msg));
    }
}