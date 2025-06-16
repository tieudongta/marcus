// skillCLI.mjs
import readline from 'readline';

import {
  findMissingPrereqs,
  listSkillsByRace,
  simulatePath,
  simulateRacePath,
  simulateRaceXpPath,
  suggestNext,
  tracePrereqs,
  tracePrereqsBackward,
  validateSkills,
  viewBranch,
  viewSkill,
  traceBranch,
  findBranchesMissingMasters,
  listAllBranches
} from './utils/skillUtils.mjs';

import {
  findMissingPrerequisites,
  findOrphanSkills,
  validateSkillLevels,
  validateBranches,
  validateRaceAttributes
} from './skillValidation.mjs';

async function loadSkillDataBank() {
  const { skillDataBank } = await import('../src/factory/data/skillData.mjs?update=' + Date.now());
  return skillDataBank;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log("\uD83C\uDFAF Skill Tree CLI – Explorer & Validator");
  let running = true;

  while (running) {
    const input = await prompt("\n> Enter command (type 'help' for options): ");
    const [command, ...args] = input.trim().split(/\s+/);
    const skillDataBank = await loadSkillDataBank();

    const starterSkillsArray = Object.values(skillDataBank)
      .filter(s => s.level.toLowerCase() === 'starter')
      .map(s => s.name.toLowerCase());

    switch (command) {
        case 'check-masters':
            const noMasters = findBranchesMissingMasters(skillDataBank);
            if (noMasters.length === 0) console.log("✅ All branches have Master-level skills.");
            else {
                console.warn("⚠️ Branches missing Master-level skills:");
                noMasters.forEach(b => console.warn(` - ${b}`));
            }
            break;
        case 'branches':
            listAllBranches(skillDataBank);
        break;

      case 'race': {
        const race = args[0];
        if (!race) console.log("❌ Usage: race <RaceName>");
        else listSkillsByRace(race, skillDataBank);
        break;
      }

      case 'validate-tree': {
        console.log("\uD83D\uDD0D Running full skill tree validation...");

        const missing = findMissingPrerequisites(skillDataBank);
        if (!missing.length) console.log("✅ No missing prerequisites found.");

        const orphans = findOrphanSkills(skillDataBank, starterSkillsArray);
        if (!orphans.length) console.log("✅ No orphan skills found.");
        else orphans.forEach(id => console.warn(`⚠️ Orphan skill: ${id}`));

        validateSkillLevels(skillDataBank).forEach(e => console.warn(e));
        validateBranches(skillDataBank).forEach(w => console.warn(w));
        validateRaceAttributes(skillDataBank).forEach(w => console.warn(w));
        break;
      }

      case 'suggest-next': {
        const skillId = args[0];
        if (!skillId) console.log("❌ Usage: suggest-next <skill_id>");
        else suggestNext(skillId, skillDataBank);
        break;
      }

      case 'traceback': {
        const skillId = args[0];
        if (!skillId || !skillDataBank[skillId]) {
          console.log(`❌ Skill \"${skillId || 'undefined'}\" not found.`);
        } else {
          const prereqs = tracePrereqsBackward(skillId, skillDataBank);
          console.log(`\uD83D\uDCCD Backward trace for skill: ${skillId} (${skillDataBank[skillId].name})`);
          if (!prereqs.size) console.log("  - None (starter or no prereqs found)");
          else prereqs.forEach(preId => {
            const s = skillDataBank[preId];
            console.log(`  - ${preId} (${s.name}, level: ${s.level}, branch: ${s.branch})`);
          });
        }
        break;
      }

      case 'simulate': {
        const [race, ...branchWords] = args;
        const branch = branchWords.join(" ") || null;
        simulateRacePath(race, branch, skillDataBank);
        break;
      }

      case 'xpsimulate': {
        const race = args[0];
        const branch = args[1] || null;
        simulateRaceXpPath(race, branch, skillDataBank, { showScore: true });
        break;
      }

      case 'prereqs': {
        const skillId = args[0];
        if (!skillId) console.log("❌ Usage: prereqs <skill_id>");
        else tracePrereqs(skillId, skillDataBank);
        break;
      }

      case 'orphans':
      case 'missing': {
        findMissingPrereqs(skillDataBank);
        break;
      }

      case 'view': {
        viewSkill(args[0]);
        break;
      }

      case 'branch': {
        viewBranch(args.join(" "));
        break;
      }

      case 'trace': {
        traceBranch(args[0]);
        break;
      }

      case 'validate': {
        validateSkills();
        break;
      }

      case 'help': {
        console.log(`Available Commands:
  view <skill_id>             View skill details
  branch <branch_name>        Show all skills in a branch
  trace <skill_id>            Trace forward progression from a skill
  traceback <skill_id>        Trace backward prerequisites to a skill
  prereqs <skill_id>          Show all prerequisite chains
  suggest-next <skill_id>     Suggest next possible skills
  race <race>                 List all skills available to a race
  simulate <race> [branch]    Simulate skill path for a race
  xpsimulate <race> [branch]  Simulate XP growth for race
  validate-tree               Run full validation checklist
  missing / orphans           Show skills with link issues
  validate                    Run structure validation
  help                        Show this menu
  exit                        Quit the CLI`);
        break;
      }

      case 'exit':
        running = false;
        break;

      default:
        console.log("❓ Unknown command. Type 'help' to see options.");
    }
  }
  rl.close();
}

main();
