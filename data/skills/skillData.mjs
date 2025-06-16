export const skillDataBank = {
  basic_archery: {
    name: "Basic Archery",
    level: "novice",
    next_skill: ["precision_shot", "light_melee_attack"],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Learn fundamental archery skills to hit targets at range.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  light_melee_attack: {
    name: "Light Melee Attack",
    level: "novice",
    next_skill: ["parry_and_counter", "basic_camouflage"],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Basic melee attacks using light weapons.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  silent_movement: {
    name: "Silent Movement",
    level: "novice",
    next_skill: ["move_silently_in_forest", "detect_poison"],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Move quietly to avoid detection.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  basic_camouflage: {
    name: "Basic Camouflage",
    level: "novice",
    next_skill: ["shadow_blend", "detect_magical_presence"],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Blend into natural surroundings for stealth.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  minor_healing_touch: {
    name: "Minor Healing Touch",
    level: "novice",
    next_skill: ["healing_herbs", "basic_tracking"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Perform minor healing using magical touch.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  detect_poison: {
    name: "Detect Poison",
    level: "novice",
    next_skill: ["detect_magical_presence", "trap_setting"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Identify poisons in food, water, and environment.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  basic_tracking: {
    name: "Basic Tracking",
    level: "novice",
    next_skill: ["trap_setting", "shelter_construction"],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Follow and interpret simple animal or humanoid tracks.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  foraging_basics: {
    name: "Foraging Basics",
    level: "novice",
    next_skill: ["basic_tracking", "minor_healing_touch"],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Identify edible plants and herbs.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },

  precision_shot: {
    name: "Precision Shot",
    level: "apprentice",
    next_skill: ["rapid_shot", "parry_and_counter"],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Aim carefully to increase accuracy and damage.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  parry_and_counter: {
    name: "Parry and Counter",
    level: "apprentice",
    next_skill: ["dual_wield_melee"],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Block attacks and strike back quickly.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  move_silently_in_forest: {
    name: "Move Silently in Forest",
    level: "apprentice",
    next_skill: ["vanish_in_shadows", "trap_disarming"],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Move quietly through wooded areas undetected.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  shadow_blend: {
    name: "Shadow Blend",
    level: "apprentice",
    next_skill: ["ghost_walk"],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Blend into shadows to become nearly invisible.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  healing_herbs: {
    name: "Healing Herbs",
    level: "apprentice",
    next_skill: ["regeneration_spell"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Use herbal knowledge to heal wounds and ailments.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  detect_magical_presence: {
    name: "Detect Magical Presence",
    level: "apprentice",
    next_skill: ["regeneration_spell"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Sense magical energy nearby.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  trap_setting: {
    name: "Trap Setting",
    level: "apprentice",
    next_skill: ["animal_communication", "survival_expert"],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Set traps to capture or injure enemies or animals.",
    attributes: ["agility", "intelligence"],
    isCombatant: true
  },
  shelter_construction: {
    name: "Shelter Construction",
    level: "apprentice",
    next_skill: ["survival_expert"],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Build basic shelters for protection against elements.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },

  rapid_shot: {
    name: "Rapid Shot",
    level: "veteran",
    next_skill: ["piercing_arrow", "dual_wield_melee"],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Shoot arrows quickly with moderate accuracy.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  dual_wield_melee: {
    name: "Dual Wield Melee",
    level: "veteran",
    next_skill: [],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Use two melee weapons simultaneously for rapid strikes.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  vanish_in_shadows: {
    name: "Vanish in Shadows",
    level: "veteran",
    next_skill: ["ghost_walk"],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Disappear into the shadows for escape or ambush.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  trap_disarming: {
    name: "Trap Disarming",
    level: "veteran",
    next_skill: [],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Detect and disable traps safely.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  cure_poison: {
    name: "Cure Poison",
    level: "veteran",
    next_skill: ["greater_healing_wave"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Remove poisons from living creatures.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  regeneration_spell: {
    name: "Regeneration Spell",
    level: "veteran",
    next_skill: ["greater_healing_wave"],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Cast spells that heal over time.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  animal_communication: {
    name: "Animal Communication",
    level: "veteran",
    next_skill: [],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Understand and communicate with animals.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  survival_expert: {
    name: "Survival Expert",
    level: "master",
    next_skill: [],
    branch: "Survival & Tracking",
    race: ["Elf"],
    description: "Expert survival skills in all environments.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },

  piercing_arrow: {
    name: "Piercing Arrow",
    level: "master",
    next_skill: [],
    branch: "Combat Branch",
    race: ["Elf"],
    description: "Shoot arrows that penetrate armor.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  ghost_walk: {
    name: "Ghost Walk",
    level: "master",
    next_skill: [],
    branch: "Stealth & Evasion",
    race: ["Elf"],
    description: "Become temporarily invisible to enemies.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  greater_healing_wave: {
    name: "Greater Healing Wave",
    level: "master",
    next_skill: [],
    branch: "Nature Magic Branch",
    race: ["Elf"],
    description: "Cast powerful healing spells over a wide area.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  heavy_strike: {
    name: "Heavy Strike",
    level: "novice",
    next_skill: ["cleave_attack", "shield_bash"],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Deliver a powerful melee blow with heavy weapons.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  shield_bash: {
    name: "Shield Bash",
    level: "novice",
    next_skill: ["power_block", "basic_endurance"],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Use your shield to stun or knock back enemies.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  tough_hide: {
    name: "Tough Hide",
    level: "novice",
    next_skill: ["resist_pain", "intimidate"],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Develop thick skin that reduces physical damage.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  basic_endurance: {
    name: "Basic Endurance",
    level: "novice",
    next_skill: ["rapid_recovery", "intimidate"],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Increase stamina for longer physical exertion.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },
  war_cry: {
    name: "War Cry",
    level: "novice",
    next_skill: ["command_presence", "intimidate"],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Emit a fierce shout that boosts allies’ morale.",
    attributes: ["strength", "charisma"],
    isCombatant: false
  },
  intimidate: {
    name: "Intimidate",
    level: "novice",
    next_skill: ["fearsome_presence", "trap_setting"],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Use presence and voice to frighten enemies.",
    attributes: ["charisma", "strength"],
    isCombatant: false
  },
  basic_hunting: {
    name: "Basic Hunting",
    level: "novice",
    next_skill: ["trap_setting", "foraging_basics"],
    branch: "Wilderness Survival",
    race: ["Orc", "Dwarf"],
    description: "Track and hunt small game for food.",
    attributes: ["agility", "perception"],
    isCombatant: false
  }
  ,

  cleave_attack: {
    name: "Cleave Attack",
    level: "apprentice",
    next_skill: ["whirlwind_attack", "power_block"],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Swing your weapon in a wide arc to hit multiple foes.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  power_block: {
    name: "Power Block",
    level: "apprentice",
    next_skill: ["earthshatter_smash", "rapid_recovery"],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Use strength and timing to block and counterattack.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  resist_pain: {
    name: "Resist Pain",
    level: "apprentice",
    next_skill: ["iron_will", "rapid_recovery"],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Suppress pain to keep fighting under harsh conditions.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  rapid_recovery: {
    name: "Rapid Recovery",
    level: "apprentice",
    next_skill: ["regenerate_health"],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Heal wounds faster than normal.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  command_presence: {
    name: "Command Presence",
    level: "apprentice",
    next_skill: ["rally_allies", "fearsome_presence"],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Exert authority to inspire and lead allies.",
    attributes: ["charisma", "strength"],
    isCombatant: false
  },
  fearsome_presence: {
    name: "Fearsome Presence",
    level: "apprentice",
    next_skill: ["demoralize_enemies", "rally_allies"],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Instill fear and hesitation in enemies.",
    attributes: ["charisma", "strength"],
    isCombatant: false
  }
  
  ,

  whirlwind_attack: {
    name: "Whirlwind Attack",
    level: "veteran",
    next_skill: ["earthshatter_smash", "weapon_throw"],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Spin with your weapon to attack all nearby enemies.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  weapon_throw: {
    name: "Weapon Throw",
    level: "veteran",
    next_skill: [],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "Throw weapons with deadly accuracy.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  iron_will: {
    name: "Iron Will",
    level: "veteran",
    next_skill: ["unbreakable", "regenerate_health"],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Resist mental and physical effects of pain and fear.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  regenerate_health: {
    name: "Regenerate Health",
    level: "veteran",
    next_skill: [],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Rapidly heal wounds over time.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  rally_allies: {
    name: "Rally Allies",
    level: "veteran",
    next_skill: [],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Inspire nearby allies to fight harder.",
    attributes: ["charisma", "strength"],
    isCombatant: false
  },
  demoralize_enemies: {
    name: "Demoralize Enemies",
    level: "veteran",
    next_skill: [],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Lower enemy morale causing hesitation and fear.",
    attributes: ["charisma", "strength"],
    isCombatant: false
  }
  
  ,

  earthshatter_smash: {
    name: "Earthshatter Smash",
    level: "master",
    next_skill: [],
    branch: "Combat",
    race: ["Orc", "Dwarf"],
    description: "A mighty smash that causes the ground to tremble and enemies to stagger.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  unbreakable: {
    name: "Unbreakable",
    level: "master",
    next_skill: [],
    branch: "Endurance & Toughness",
    race: ["Orc", "Dwarf"],
    description: "Become nearly impossible to injure or knock down.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  battle_frenzy: {
    name: "Battle Frenzy",
    level: "master",
    next_skill: [],
    branch: "Intimidation & Leadership",
    race: ["Orc", "Dwarf"],
    description: "Enter a frenzied state increasing attack speed and damage.",
    attributes: ["strength", "charisma"],
    isCombatant: true
  },
  firebolt: {
    name: "Firebolt",
    level: "novice",
    next_skill: ["flame_wave", "fireball"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Launch a small, fast bolt of fire at an enemy.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  frost_touch: {
    name: "Frost Touch",
    level: "novice",
    next_skill: ["ice_barrier", "blizzard"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Infuse your touch with freezing energy to slow enemies.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  minor_heal: {
    name: "Minor Heal",
    level: "novice",
    next_skill: ["healing_touch", "greater_heal"],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Restore a small amount of health to an ally.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  cure_minor_poison: {
    name: "Cure Minor Poison",
    level: "novice",
    next_skill: ["remove_curse", "regeneration_spell"],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Neutralize minor poison effects from an ally.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  flame_wave: {
    name: "Flame Wave",
    level: "apprentice",
    next_skill: ["fireball", "meteor_shower"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Send out a wave of fire that damages multiple enemies.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  ice_barrier: {
    name: "Ice Barrier",
    level: "apprentice",
    next_skill: ["blizzard", "arcane_fortress"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Create a barrier of ice that absorbs damage.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  healing_touch: {
    name: "Healing Touch",
    level: "apprentice",
    next_skill: ["greater_heal", "mass_heal"],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Heal a moderate amount of health to an ally.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  remove_curse: {
    name: "Remove Curse",
    level: "apprentice",
    next_skill: ["mass_heal", "regeneration_spell"],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Lift curses affecting an ally.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  mana_shield: {
    name: "Mana Shield",
    level: "novice",
    next_skill: ["magic_resist", "spell_reflection"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Create a shield powered by mana that absorbs damage.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  mana_pool_increase: {
    name: "Mana Pool Increase",
    level: "novice",
    next_skill: ["mana_regeneration", "mana_efficiency"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Increase your total mana capacity.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  magic_resist: {
    name: "Magic Resist",
    level: "apprentice",
    next_skill: ["spell_reflection", "anti_magic_aura"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Reduce damage taken from magical attacks.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  mana_regeneration: {
    name: "Mana Regeneration",
    level: "apprentice",
    next_skill: ["mana_efficiency"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Increase the rate at which mana regenerates over time.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  spell_reflection: {
    name: "Spell Reflection",
    level: "veteran",
    next_skill: ["arcane_fortress"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Reflect incoming spells back to their caster.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  anti_magic_aura: {
    name: "Anti-Magic Aura",
    level: "veteran",
    next_skill: ["arcane_fortress"],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Emit an aura that dampens enemy magical effects nearby.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  arcane_fortress: {
    name: "Arcane Fortress",
    level: "master",
    next_skill: [],
    branch: "Magical Defense & Mana Control",
    race: ["Human", "Elf"],
    description: "Create a powerful magical fortress that protects and regenerates mana.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  arcane_sight: {
    name: "Arcane Sight",
    level: "novice",
    next_skill: ["spellcraft", "elemental_knowledge"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "See magical auras and hidden enchantments.",
    attributes: ["intelligence", "perception"],
    isCombatant: false
  },
  magical_detection: {
    name: "Magical Detection",
    level: "novice",
    next_skill: ["enchanting_basics"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Detect nearby magical phenomena and traps.",
    attributes: ["intelligence", "perception"],
    isCombatant: false
  },
  spellcraft: {
    name: "Spellcraft",
    level: "apprentice",
    next_skill: ["mana_efficiency", "master_enchanter"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Understand and manipulate spells for greater effect.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  enchanting_basics: {
    name: "Enchanting Basics",
    level: "apprentice",
    next_skill: ["master_enchanter"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Learn the basics of enchanting items with magical properties.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  mana_efficiency: {
    name: "Mana Efficiency",
    level: "veteran",
    next_skill: ["master_enchanter"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Reduce the mana cost of your spells.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  elemental_knowledge: {
    name: "Elemental Knowledge",
    level: "veteran",
    next_skill: ["master_enchanter"],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Deep knowledge of elemental forces to enhance spells.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  master_enchanter: {
    name: "Master Enchanter",
    level: "master",
    next_skill: [],
    branch: "Arcane Knowledge & Utility",
    race: ["Human", "Elf"],
    description: "Master the art of enchanting with powerful effects.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  fireball: {
    name: "Fireball",
    level: "veteran",
    next_skill: ["meteor_shower"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Hurl a large ball of fire that explodes on impact.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  blizzard: {
    name: "Blizzard",
    level: "veteran",
    next_skill: ["meteor_shower"],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Summon a fierce snowstorm to damage and slow enemies.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  greater_heal: {
    name: "Greater Heal",
    level: "veteran",
    next_skill: ["mass_heal"],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Restore a large amount of health to an ally.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  mass_heal: {
    name: "Mass Heal",
    level: "master",
    next_skill: [],
    branch: "Healing & Restoration",
    race: ["Human", "Elf"],
    description: "Heal all allies in a wide radius.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  meteor_shower: {
    name: "Meteor Shower",
    level: "master",
    next_skill: [],
    branch: "Elemental Magic",
    race: ["Human", "Elf"],
    description: "Call down a devastating shower of meteors.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  silent_step: {
    name: "Silent Step",
    level: "novice",
    next_skill: ["shadow_blend", "vanish_in_shadows"],
    branch: "Stealth & Evasion",
    race: ["Goblin", "Halfling", "Human"],
    description: "Move quietly to avoid detection.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  basic_trap_setting: {
    name: "Basic Trap Setting",
    level: "novice",
    next_skill: ["poison_application"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Set simple traps to capture or injure enemies.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  poison_basics: {
    name: "Poison Basics",
    level: "novice",
    next_skill: ["poison_application", "toxic_bomb"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Understand and prepare basic poisons.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  quick_strike: {
    name: "Quick Strike",
    level: "novice",
    next_skill: ["dual_wield", "flurry_of_blows"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Perform fast melee attacks to catch foes off guard.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  light_weapon_use: {
    name: "Light Weapon Use",
    level: "novice",
    next_skill: ["backstab", "acrobatics"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Skillfully wield light weapons for rapid attacks.",
    attributes: ["agility", "strength"],
    isCombatant: true
  }
  
  
  ,
  evasion_roll: {
    name: "Evasion Roll",
    level: "apprentice",
    next_skill: ["acrobatics", "shadow_dance"],
    branch: "Stealth & Evasion",
    race: ["Goblin", "Halfling", "Human"],
    description: "Quick roll to evade attacks and reposition.",
    attributes: ["agility", "strength"],
    isCombatant: true
  }
  ,
  poison_application: {
    name: "Poison Application",
    level: "apprentice",
    next_skill: ["deadly_poisons", "toxic_bomb"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Apply poisons to weapons and traps.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  dual_wield: {
    name: "Dual Wield",
    level: "apprentice",
    next_skill: ["flurry_of_blows", "shadow_dance"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Attack with two weapons simultaneously.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  backstab: {
    name: "Backstab",
    level: "apprentice",
    next_skill: ["shadow_dance", "ghost_walk"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Deliver a powerful attack from behind.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  trap_detection: {
    name: "Trap Detection",
    level: "apprentice",
    next_skill: ["trap_mastery"],
    branch: "Scouting & Survival",
    race: ["Goblin", "Halfling", "Human"],
    description: "Detect traps and ambushes in your surroundings.",
    attributes: ["intelligence", "perception"],
    isCombatant: false
  },
  shelter_building: {
    name: "Shelter Building",
    level: "apprentice",
    next_skill: ["animal_communication"],
    branch: "Scouting & Survival",
    race: ["Goblin", "Halfling", "Human"],
    description: "Construct basic shelters for protection in wild or urban areas.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  }
  ,
  trap_mastery: {
    name: "Trap Mastery",
    level: "veteran",
    next_skill: ["deadly_poisons"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Expertly set, disarm, and utilize traps.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  alchemical_mixtures: {
    name: "Alchemical Mixtures",
    level: "veteran",
    next_skill: ["deadly_poisons"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Create potent mixtures for traps and poisons.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  toxic_bomb: {
    name: "Toxic Bomb",
    level: "veteran",
    next_skill: ["deadly_poisons"],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Throw bombs that release poisonous gas on impact.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  flurry_of_blows: {
    name: "Flurry of Blows",
    level: "veteran",
    next_skill: ["shadow_dance"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Deliver multiple rapid strikes in quick succession.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  acrobatics: {
    name: "Acrobatics",
    level: "veteran",
    next_skill: ["shadow_dance"],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Use agility and acrobatic moves to dodge attacks and reposition.",
    attributes: ["agility", "strength"],
    isCombatant: true
  }
  ,
  deadly_poisons: {
    name: "Deadly Poisons",
    level: "master",
    next_skill: [],
    branch: "Trapcraft & Alchemy",
    race: ["Goblin", "Halfling", "Human"],
    description: "Create and apply highly lethal poisons.",
    attributes: ["intelligence", "agility"],
    isCombatant: true
  },
  shadow_dance: {
    name: "Shadow Dance",
    level: "master",
    next_skill: [],
    branch: "Combat & Mobility",
    race: ["Goblin", "Halfling", "Human"],
    description: "Combine stealth and combat for deadly fluid movement.",
    attributes: ["agility", "strength"],
    isCombatant: true
  }
  
  ,
  cure_minor_wounds: {
    name: "Cure Minor Wounds",
    level: "novice",
    next_skill: ["healing_touch", "greater_heal"],
    branch: "Restorative Magic",
    race: ["Human", "Elf", "Dwarf"],
    description: "Remove minor wounds and speed up natural healing.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  magic_shield: {
    name: "Magic Shield",
    level: "novice",
    next_skill: ["protective_aura", "magic_barrier"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Create a shield of magic to absorb damage.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  minor_protection_buff: {
    name: "Minor Protection Buff",
    level: "novice",
    next_skill: ["protective_aura", "resistance_buff"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Grant minor protective enhancements to allies.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  ,
  detect_disease: {
    name: "Detect Disease",
    level: "novice",
    next_skill: ["cure_disease", "disease_immunity"],
    branch: "Disease & Poison Management",
    race: ["Human", "Elf", "Dwarf"],
    description: "Identify diseases affecting creatures or environments.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  basic_herb_identification: {
    name: "Basic Herb Identification",
    level: "novice",
    next_skill: ["herbal_medicine", "advanced_herbal_remedies"],
    branch: "Herbalism & Natural Remedies",
    race: ["Human", "Elf", "Dwarf"],
    description: "Recognize common herbs useful for healing and crafting.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  
  
  ,
  protective_aura: {
    name: "Protective Aura",
    level: "apprentice",
    next_skill: ["magic_barrier", "invulnerability_ward"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Create an aura that protects allies from harm.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  stamina_boost_buff: {
    name: "Stamina Boost Buff",
    level: "apprentice",
    next_skill: ["resistance_buff", "invulnerability_ward"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Increase stamina and endurance for a short time.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  ,
  cure_disease: {
    name: "Cure Disease",
    level: "apprentice",
    next_skill: ["disease_immunity", "purify_all_ailments"],
    branch: "Disease & Poison Management",
    race: ["Human", "Elf", "Dwarf"],
    description: "Heal common diseases affecting a target.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  herbal_medicine: {
    name: "Herbal Medicine",
    level: "apprentice",
    next_skill: ["advanced_herbal_remedies", "antidote_crafting"],
    branch: "Herbalism & Natural Remedies",
    race: ["Human", "Elf", "Dwarf"],
    description: "Use herbs to heal wounds and ailments.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  
  ,
  magic_barrier: {
    name: "Magic Barrier",
    level: "veteran",
    next_skill: ["invulnerability_ward"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Create a strong barrier to block magic and physical attacks.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  resistance_buff: {
    name: "Resistance Buff",
    level: "veteran",
    next_skill: ["invulnerability_ward"],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Increase resistance to various damage types for allies.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  neutralize_toxins: {
    name: "Neutralize Toxins",
    level: "veteran",
    next_skill: ["purify_all_ailments"],
    branch: "Disease & Poison Management",
    race: ["Human", "Elf", "Dwarf"],
    description: "Remove toxins and poisons from the body.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  disease_immunity: {
    name: "Disease Immunity",
    level: "veteran",
    next_skill: ["purify_all_ailments"],
    branch: "Disease & Poison Management",
    race: ["Human", "Elf", "Dwarf"],
    description: "Become immune to common diseases.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  advanced_herbal_remedies: {
    name: "Advanced Herbal Remedies",
    level: "veteran",
    next_skill: ["master_herbalist"],
    branch: "Herbalism & Natural Remedies",
    race: ["Human", "Elf", "Dwarf"],
    description: "Create potent remedies to heal complex ailments.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  antidote_crafting: {
    name: "Antidote Crafting",
    level: "veteran",
    next_skill: ["master_herbalist"],
    branch: "Herbalism & Natural Remedies",
    race: ["Human", "Elf", "Dwarf"],
    description: "Craft effective antidotes against poisons and diseases.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  resurrection: {
    name: "Resurrection",
    level: "master",
    next_skill: [],
    branch: "Restorative Magic",
    race: ["Human", "Elf", "Dwarf"],
    description: "Bring a fallen ally back to life.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  invulnerability_ward: {
    name: "Invulnerability Ward",
    level: "master",
    next_skill: [],
    branch: "Protective Wards & Buffs",
    race: ["Human", "Elf", "Dwarf"],
    description: "Create an impenetrable ward protecting from all harm.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  purify_all_ailments: {
    name: "Purify All Ailments",
    level: "master",
    next_skill: [],
    branch: "Disease & Poison Management",
    race: ["Human", "Elf", "Dwarf"],
    description: "Remove all poisons, diseases, and toxins instantly.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  master_herbalist: {
    name: "Master Herbalist",
    level: "master",
    next_skill: [],
    branch: "Herbalism & Natural Remedies",
    race: ["Human", "Elf", "Dwarf"],
    description: "Expert in crafting natural remedies and potent herbs.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  basic_smithing: {
    name: "Basic Smithing",
    level: "novice",
    next_skill: ["weapon_forging", "master_smithing"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Fundamental skills to shape and craft basic weapons and armor.",
    attributes: ["strength", "agility", "intelligence"],
    isCombatant: false
  },
  repair_gear: {
    name: "Repair Gear",
    level: "novice",
    next_skill: ["weapon_forging", "armor_crafting"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Ability to repair damaged weapons and armor to restore functionality.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  heavy_weapon_use: {
    name: "Heavy Weapon Use",
    level: "novice",
    next_skill: ["power_strike", "cleave_attack"],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Basic training to wield heavy weapons effectively.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  basic_melee_attack: {
    name: "Basic Melee Attack",
    level: "novice",
    next_skill: ["power_strike", "cleave_attack"],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Fundamental melee combat skills with close-range weapons.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  basic_mining: {
    name: "Basic Mining",
    level: "novice",
    next_skill: ["ore_extraction", "advanced_metallurgy"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human"],
    description: "Learn to extract common minerals and ores from the earth.",
    attributes: ["strength", "agility"],
    isCombatant: false
  },
  material_identification: {
    name: "Material Identification",
    level: "novice",
    next_skill: ["metalworking_basics", "gem_cutting"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human", "Elf"],
    description: "Ability to recognize and categorize raw materials and ores.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  shield_use: {
    name: "Shield Use",
    level: "novice",
    next_skill: ["shield_bash", "fortify_defense"],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Basic defensive techniques using a shield.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  block: {
    name: "Block",
    level: "novice",
    next_skill: ["parry", "unyielding_guard"],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Basic skill to block incoming attacks with a weapon or shield.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  weapon_forging: {
    name: "Weapon Forging",
    level: "apprentice",
    next_skill: ["master_smithing", "legendary_forging"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Craft advanced weapons with improved durability and quality.",
    attributes: ["strength", "agility", "intelligence"],
    isCombatant: false
  },
  armor_crafting: {
    name: "Armor Crafting",
    level: "apprentice",
    next_skill: ["master_smithing", "legendary_forging"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Create durable armor to protect against physical damage.",
    attributes: ["strength", "agility", "intelligence"],
    isCombatant: false
  },
  power_strike: {
    name: "Power Strike",
    level: "apprentice",
    next_skill: ["cleave_attack", "earthquake_slam"],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Deliver a strong, powerful melee attack to stagger enemies.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  heavy_armor_use: {
    name: "Heavy Armor Use",
    level: "apprentice",
    next_skill: ["two_handed_weapon_mastery", "unyielding_guard"],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Skill to move and fight effectively wearing heavy armor.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  ore_extraction: {
    name: "Ore Extraction",
    level: "apprentice",
    next_skill: ["advanced_metallurgy", "rare_ore_detection"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human"],
    description: "Efficiently extract ore from rich mineral veins.",
    attributes: ["strength", "agility"],
    isCombatant: false
  },
  metalworking_basics: {
    name: "Metalworking Basics",
    level: "apprentice",
    next_skill: ["advanced_metallurgy", "gem_cutting"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human", "Elf"],
    description: "Basic techniques for shaping and refining metals.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  ,
  parry: {
    name: "Parry",
    level: "apprentice",
    next_skill: ["fortify_defense", "unyielding_guard"],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Deflect enemy attacks with precise timing.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  master_smithing: {
    name: "Master Smithing",
    level: "veteran",
    next_skill: ["legendary_forging", "weapon_enchanting"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Expert crafting techniques to create masterwork weapons and armor.",
    attributes: ["strength", "agility", "intelligence"],
    isCombatant: false
  },
  weapon_enchanting: {
    name: "Weapon Enchanting",
    level: "veteran",
    next_skill: ["legendary_forging"],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Elf"],
    description: "Imbue weapons with magical properties for enhanced effects.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  }
  ,
  two_handed_weapon_mastery: {
    name: "Two-Handed Weapon Mastery",
    level: "veteran",
    next_skill: ["earthquake_slam"],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Mastery of large two-handed weapons for devastating damage.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  advanced_metallurgy: {
    name: "Advanced Metallurgy",
    level: "veteran",
    next_skill: ["rare_ore_detection"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human"],
    description: "Advanced knowledge of metal properties and alloy creation.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  gem_cutting: {
    name: "Gem Cutting",
    level: "veteran",
    next_skill: ["rare_ore_detection"],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Elf"],
    description: "Cut and polish gems for use in crafting and enchanting.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  fortify_defense: {
    name: "Fortify Defense",
    level: "veteran",
    next_skill: ["unyielding_guard"],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Enhance defensive stance to reduce incoming damage.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  damage_resistance: {
    name: "Damage Resistance",
    level: "veteran",
    next_skill: ["unyielding_guard"],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Increase resistance to physical damage types.",
    attributes: ["agility", "strength"],
    isCombatant: true
  },
  legendary_forging: {
    name: "Legendary Forging",
    level: "master",
    next_skill: [],
    branch: "Weapon & Armor Crafting",
    race: ["Human", "Dwarf", "Elf"],
    description: "Forge legendary weapons and armor of unparalleled quality.",
    attributes: ["strength", "agility", "intelligence"],
    isCombatant: false
  },
  earthquake_slam: {
    name: "Earthquake Slam",
    level: "master",
    next_skill: [],
    branch: "Heavy Combat",
    race: ["Human", "Orc", "Dwarf"],
    description: "Deliver a powerful slam causing tremors that damage multiple enemies.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  rare_ore_detection: {
    name: "Rare Ore Detection",
    level: "master",
    next_skill: [],
    branch: "Mining & Material Expertise",
    race: ["Dwarf", "Human"],
    description: "Detect rare and valuable ore deposits beneath the surface.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  unyielding_guard: {
    name: "Unyielding Guard",
    level: "master",
    next_skill: [],
    branch: "Defensive Tactics",
    race: ["Human", "Dwarf", "Orc"],
    description: "Master defensive techniques to block and absorb damage without faltering.",
    attributes: ["strength", "agility"],
    isCombatant: true
  },
  read_terrain_maps: {
    name: "Read Terrain Maps",
    level: "novice",
    next_skill: ["landmark_tracking", "natural_compass"],
    branch: "Navigation",
    race: ["Elf", "Human", "Halfling"],
    description: "Understand and follow hand-drawn or natural maps.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  natural_compass: {
    name: "Natural Compass",
    level: "novice",
    next_skill: ["star_navigation"],
    branch: "Navigation",
    race: ["Elf", "Dwarf", "Halfling"],
    description: "Use natural signs like moss and stars to orient yourself.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  landmark_tracking: {
    name: "Landmark Tracking",
    level: "apprentice",
    next_skill: ["wilderness_mapping"],
    branch: "Navigation",
    race: ["Elf", "Human"],
    description: "Track journey progress by natural and constructed landmarks.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  star_navigation: {
    name: "Star Navigation",
    level: "apprentice",
    next_skill: ["wilderness_mapping"],
    branch: "Navigation",
    race: ["Elf", "Halfling"],
    description: "Navigate using constellations and lunar phases.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  wilderness_mapping: {
    name: "Wilderness Mapping",
    level: "veteran",
    next_skill: ["master_pathfinder"],
    branch: "Navigation",
    race: ["Human", "Elf"],
    description: "Draw and interpret detailed maps of wild terrains.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  river_route_planning: {
    name: "River Route Planning",
    level: "veteran",
    next_skill: ["master_pathfinder"],
    branch: "Navigation",
    race: ["Human", "Dwarf"],
    description: "Chart travel and survival paths along waterways.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  master_pathfinder: {
    name: "Master Pathfinder",
    level: "master",
    next_skill: [],
    branch: "Navigation",
    race: ["Elf", "Human"],
    description: "Unfailingly find safe and swift paths through any environment.",
    attributes: ["intelligence", "agility", "strength"],
    isCombatant: false
  },

  basic_weather_reading: {
    name: "Basic Weather Reading",
    level: "novice",
    next_skill: ["insulate_shelter", "build_rain_shelter"],
    branch: "Weather Adaptation",
    race: ["Elf", "Human", "Halfling"],
    description: "Predict short-term weather changes using natural signs.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  build_rain_shelter: {
    name: "Build Rain Shelter",
    level: "novice",
    next_skill: ["cold_resistance_prep"],
    branch: "Weather Adaptation",
    race: ["Dwarf", "Human"],
    description: "Construct effective temporary shelters against rain.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },
  insulate_shelter: {
    name: "Insulate Shelter",
    level: "apprentice",
    next_skill: ["heat_survival_tactics"],
    branch: "Weather Adaptation",
    race: ["Halfling", "Elf"],
    description: "Reinforce shelters for cold protection and warmth.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  cold_resistance_prep: {
    name: "Cold Resistance Prep",
    level: "apprentice",
    next_skill: ["extreme_weather_camp"],
    branch: "Weather Adaptation",
    race: ["Dwarf", "Elf"],
    description: "Prepare gear and clothing to survive freezing conditions.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  heat_survival_tactics: {
    name: "Heat Survival Tactics",
    level: "veteran",
    next_skill: ["survival_expert_climate"],
    branch: "Weather Adaptation",
    race: ["Elf", "Human"],
    description: "Handle dehydration and overheating in harsh sun climates.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  extreme_weather_camp: {
    name: "Extreme Weather Camp",
    level: "veteran",
    next_skill: ["survival_expert_climate"],
    branch: "Weather Adaptation",
    race: ["Dwarf", "Human"],
    description: "Build camps safe from storms, snow, and heatwaves.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },
  survival_expert_climate: {
    name: "Survival Expert (Climate)",
    level: "master",
    next_skill: [],
    branch: "Weather Adaptation",
    race: ["Elf", "Dwarf", "Halfling", "Human"],
    description: "Master survival in any climate—desert, tundra, jungle, or storm.",
    attributes: ["intelligence", "strength", "agility"],
    isCombatant: false
  },

  calm_small_animals: {
    name: "Calm Small Animals",
    level: "novice",
    next_skill: ["tame_small_creatures", "feed_and_care_basics"],
    branch: "Beast Handling",
    race: ["Halfling", "Elf"],
    description: "Soothe and handle small non-aggressive wildlife.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },
  feed_and_care_basics: {
    name: "Feed and Care Basics",
    level: "novice",
    next_skill: ["animal_tracking"],
    branch: "Beast Handling",
    race: ["Halfling", "Dwarf"],
    description: "Basic animal care skills—feeding, cleaning, calming.",
    attributes: ["agility", "intelligent"],
    isCombatant: false
  },
  tame_small_creatures: {
    name: "Tame Small Creatures",
    level: "apprentice",
    next_skill: ["mount_training"],
    branch: "Beast Handling",
    race: ["Elf", "Human"],
    description: "Train small animals for companionship or tasks.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  animal_tracking: {
    name: "Animal Tracking",
    level: "apprentice",
    next_skill: ["beast_command"],
    branch: "Beast Handling",
    race: ["Elf", "Dwarf"],
    description: "Track creatures based on trails and behavior.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  mount_training: {
    name: "Mount Training",
    level: "veteran",
    next_skill: ["beast_mastery"],
    branch: "Beast Handling",
    race: ["Human", "Halfling"],
    description: "Train animals as reliable mounts or pack animals.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  beast_command: {
    name: "Beast Command",
    level: "veteran",
    next_skill: ["beast_mastery"],
    branch: "Beast Handling",
    race: ["Elf", "Dwarf"],
    description: "Give simple verbal or signal-based commands to trained beasts.",
    attributes: ["intelligence", "intelligence"],
    isCombatant: false
  },
  beast_mastery: {
    name: "Beast Mastery",
    level: "master",
    next_skill: [],
    branch: "Beast Handling",
    race: ["Elf", "Human", "Dwarf"],
    description: "Command and care for a wide variety of creatures.",
    attributes: ["strength", "intelligence", "intelligence"],
    isCombatant: false
  },
  simple_mechanisms: {
    name: "Simple Mechanisms",
    level: "novice",
    next_skill: ["trap_devices", "crude_machines"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin", "Human"],
    description: "Construct basic mechanical devices using gears, levers, and springs.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  gear_repair: {
    name: "Gear Repair",
    level: "novice",
    next_skill: ["trap_devices"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin", "Human"],
    description: "Repair worn or broken mechanical gear and components.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  trap_devices: {
    name: "Trap Devices",
    level: "apprentice",
    next_skill: ["mechanical_constructs"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin"],
    description: "Create mechanical traps with triggering mechanisms.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  crude_machines: {
    name: "Crude Machines",
    level: "apprentice",
    next_skill: ["clockwork_tools"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin", "Human"],
    description: "Assemble basic machines with rotating parts and kinetic energy.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  mechanical_constructs: {
    name: "Mechanical Constructs",
    level: "veteran",
    next_skill: ["automaton_building"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin"],
    description: "Design and build mobile mechanical contraptions for various tasks.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  clockwork_tools: {
    name: "Clockwork Tools",
    level: "veteran",
    next_skill: ["automaton_building"],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Human"],
    description: "Create precision tools with intricate clockwork components.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  automaton_building: {
    name: "Automaton Building",
    level: "master",
    next_skill: [],
    branch: "Tinkering & Engineering",
    race: ["Dwarf", "Goblin", "Human"],
    description: "Construct autonomous mechanical beings with limited intelligence and function.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },

  basic_sewing: {
    name: "Basic Sewing & Mending",
    level: "novice",
    next_skill: ["weaving", "tailor_light_garments"],
    branch: "Textile & Leatherworking",
    race: ["Halfling", "Elf", "Human"],
    description: "Sew and repair basic clothing items and fabric gear.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  hide_tanning: {
    name: "Hide Tanning",
    level: "novice",
    next_skill: ["armor_padding_craft"],
    branch: "Textile & Leatherworking",
    race: ["Dwarf", "Halfling", "Human"],
    description: "Preserve animal hides for use in crafting leather goods.",
    attributes: ["strength", "agility"],
    isCombatant: false
  },
  weaving: {
    name: "Weaving",
    level: "apprentice",
    next_skill: ["rugged_outdoor_wear"],
    branch: "Textile & Leatherworking",
    race: ["Elf", "Halfling"],
    description: "Create woven fabric for garments and household use.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  tailor_light_garments: {
    name: "Tailor Light Garments",
    level: "apprentice",
    next_skill: ["rugged_outdoor_wear"],
    branch: "Textile & Leatherworking",
    race: ["Elf", "Halfling", "Human"],
    description: "Craft light clothing for everyday wear or stealth missions.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  armor_padding_craft: {
    name: "Armor Padding Craft",
    level: "veteran",
    next_skill: ["master_leathercraft"],
    branch: "Textile & Leatherworking",
    race: ["Dwarf", "Human"],
    description: "Create padded armor inserts for improved defense and comfort.",
    attributes: ["strength", "agility"],
    isCombatant: false
  },
  rugged_outdoor_wear: {
    name: "Rugged Outdoor Wear",
    level: "veteran",
    next_skill: ["master_leathercraft"],
    branch: "Textile & Leatherworking",
    race: ["Elf", "Halfling", "Human"],
    description: "Craft durable garments suitable for travel and harsh environments.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },
  master_leathercraft: {
    name: "Master Leathercraft",
    level: "master",
    next_skill: [],
    branch: "Textile & Leatherworking",
    race: ["Elf", "Halfling", "Human"],
    description: "Produce high-quality leather armors and garments for durability and style.",
    attributes: ["agility", "strength"],
    isCombatant: false
  },

  craft_basic_tools: {
    name: "Craft Basic Tools",
    level: "novice",
    next_skill: ["metal_tool_crafting", "reinforced_tools"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Create essential hand tools for construction and repair.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  sharpening: {
    name: "Sharpening",
    level: "novice",
    next_skill: ["reinforced_tools"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Hone blades and tools for optimal performance.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  metal_tool_crafting: {
    name: "Metal Tool Crafting",
    level: "apprentice",
    next_skill: ["precision_toolmaking"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Forge specialized tools from durable metals.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  reinforced_tools: {
    name: "Reinforced Tools",
    level: "apprentice",
    next_skill: ["master_tool_enchanting"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Craft tools with enhanced durability and functionality.",
    attributes: ["strength", "agility"],
    isCombatant: false
  },
  precision_toolmaking: {
    name: "Precision Toolmaking",
    level: "veteran",
    next_skill: ["indestructible_tools"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Build finely tuned tools for delicate or exacting work.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  master_tool_enchanting: {
    name: "Master Tool Enchanting",
    level: "veteran",
    next_skill: ["indestructible_tools"],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human", "Elf"],
    description: "Imbue tools with magical properties for unique effects.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  indestructible_tools: {
    name: "Indestructible Tools",
    level: "master",
    next_skill: [],
    branch: "Toolsmithing",
    race: ["Dwarf", "Human"],
    description: "Forge tools with superior materials and magical reinforcement, making them nearly unbreakable.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  cook_meat_on_fire: {
    name: "Cook Meat on Fire",
    level: "novice",
    next_skill: ["preserve_food", "one_pot_meal_efficiency"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Basic technique for roasting raw meat over open flame.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  make_trail_rations: {
    name: "Make Trail Rations",
    level: "novice",
    next_skill: ["boil_safe_water", "foraged_meal_mastery"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Prepare compact and lasting rations suitable for travel.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  preserve_food: {
    name: "Preserve Food",
    level: "apprentice",
    next_skill: ["one_pot_meal_efficiency"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Techniques to dry, salt, or smoke food for long-term storage.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  boil_safe_water: {
    name: "Boil Safe Water",
    level: "apprentice",
    next_skill: ["foraged_meal_mastery"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Learn to purify water in the wild to prevent illness.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  one_pot_meal_efficiency: {
    name: "One-Pot Meal Efficiency",
    level: "veteran",
    next_skill: ["survival_feast_creation"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Create hearty, nutritious meals using minimal resources.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  foraged_meal_mastery: {
    name: "Foraged Meal Mastery",
    level: "veteran",
    next_skill: ["survival_feast_creation"],
    branch: "Field Cooking",
    race: ["All"],
    description: "Master cooking with wild ingredients for flavor and health.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  survival_feast_creation: {
    name: "Survival Feast Creation",
    level: "master",
    next_skill: [],
    branch: "Field Cooking",
    race: ["All"],
    description: "Craft large-scale survival meals that provide lasting buffs.",
    attributes: ["strength", "intelligence", "agility"],
    isCombatant: false
  },
  brew_simple_tonic: {
    name: "Brew Simple Tonic",
    level: "novice",
    next_skill: ["cook_buff_food", "enhance_stat_boost_recipes"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Create basic tonics that offer minor healing or energy boosts.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  mix_herbal_infusion: {
    name: "Mix Herbal Infusion",
    level: "novice",
    next_skill: ["blend_resistance_recipes", "potion_food_hybrids"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Combine herbs into health-enhancing infusions.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  cook_buff_food: {
    name: "Cook Buff-Food",
    level: "apprentice",
    next_skill: ["enhance_stat_boost_recipes"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Prepare food that grants temporary stat bonuses.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  blend_resistance_recipes: {
    name: "Blend Resistance Recipes",
    level: "apprentice",
    next_skill: ["potion_food_hybrids"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Craft meals that increase elemental or physical resistances.",
    attributes: ["intelligence", "strength"],
    isCombatant: false
  },
  enhance_stat_boost_recipes: {
    name: "Enhance Stat-Boost Recipes",
    level: "veteran",
    next_skill: ["legendary_elixirs_via_food"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Improve the potency of food-based stat bonuses.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  potion_food_hybrids: {
    name: "Potion-Food Hybrids",
    level: "veteran",
    next_skill: ["legendary_elixirs_via_food"],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Fuse potion effects into meals for dual benefits.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  legendary_elixirs_via_food: {
    name: "Legendary Elixirs via Food",
    level: "master",
    next_skill: [],
    branch: "Alchemical Cooking",
    race: ["All"],
    description: "Create extraordinary meals that grant powerful magical effects.",
    attributes: ["intelligence", "agility", "strength"],
    isCombatant: false
  },
  local_cuisine_knowledge: {
    name: "Local Cuisine Knowledge",
    level: "novice",
    next_skill: ["festival_dish_creation", "feast_level_cooking"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Understand and recreate local culinary specialties.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  balanced_meal_preparation: {
    name: "Balanced Meal Preparation",
    level: "novice",
    next_skill: ["foreign_spices_use", "multi_course_meals"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Make nutritionally balanced meals that restore stamina faster.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  festival_dish_creation: {
    name: "Festival Dish Creation",
    level: "apprentice",
    next_skill: ["feast_level_cooking"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Create special dishes for festive or cultural celebrations.",
    attributes: ["agility", "intelligence"],
    isCombatant: false
  },
  foreign_spices_use: {
    name: "Foreign Spices Use",
    level: "apprentice",
    next_skill: ["multi_course_meals"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Enhance flavor complexity using exotic spices and ingredients.",
    attributes: ["intelligence"],
    isCombatant: false
  },
  feast_level_cooking: {
    name: "Feast-Level Cooking",
    level: "veteran",
    next_skill: ["royal_banquets"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Prepare large, flavorful meals that boost morale and cohesion.",
    attributes: ["strength", "intelligence"],
    isCombatant: false
  },
  multi_course_meals: {
    name: "Multi-Course Meals",
    level: "veteran",
    next_skill: ["royal_banquets"],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Design elaborate meal sequences for noble and diplomatic functions.",
    attributes: ["intelligence", "agility"],
    isCombatant: false
  },
  royal_banquets: {
    name: "Royal Banquets",
    level: "master",
    next_skill: [],
    branch: "Gourmet & Culture Cuisine",
    race: ["All"],
    description: "Master the art of grand culinary feasts for kings and courts.",
    attributes: ["strength", "intelligence", "agility"],
    isCombatant: false
  },keen_senses: {
  name: "Keen Senses",
  level: "Starter",
  next_skill: ["eagle_vision", "arcane_awareness"],
  branch: "Innate Traits",
  race: ["Elf"],
  description: "Exceptional hearing and sight, especially in low light. Detect hidden threats, track movements, and notice fine artistic or natural details. Grants +2 Perception and vision in near-darkness.",
  attributes: ["intelligence", "agility"],
  isCombatant: false
},

natural_grace: {
  name: "Natural Grace",
  level: "Starter",
  next_skill: ["forest_dancer", "acrobatic_mastery"],
  branch: "Innate Traits",
  race: ["Elf"],
  description: "Unusual agility, balance, and coordination. Move silently through terrain, dodge with ease, or perform complex maneuvers. Reduces movement noise and grants +1 to agility-based actions.",
  attributes: ["agility"],
  isCombatant: false
},

forest_bond: {
  name: "Forest Bond",
  level: "Starter",
  next_skill: ["beast_empathy", "nature_command"],
  branch: "Innate Traits",
  race: ["Elf"],
  description: "Innate connection with forests and their creatures. Calms wild animals, identifies plant properties, and guarantees survival/navigation success in wooded areas.",
  attributes: ["intelligence"],
  isCombatant: false
},

longevity_lore: {
  name: "Longevity Lore",
  level: "Starter",
  next_skill: ["tree_whispering", "etiquette_of_the_courts"],
  branch: "Innate Traits",
  race: ["Elf"],
  description: "Centuries of accumulated wisdom allow elves to recall long-past events and ancient rituals. Bonus to history, ancient language, and arcane knowledge checks.",
  attributes: ["intelligence"],
  isCombatant: false
},

meditative_rest: {
  name: "Meditative Rest",
  level: "Starter",
  next_skill: ["trance_watch", "dream_farsight"],
  branch: "Innate Traits",
  race: ["Elf"],
  description: "Elves enter a deep trance instead of sleep. Fully rest in half the time while remaining semi-aware. A 4-hour trance equals an 8-hour human rest.",
  attributes: ["intelligence"],
  isCombatant: false
},

basic_archery: {
  name: "Basic Archery",
  level: "Beginner",
  next_skill: ["advanced_archery", "sniper_patience"],
  branch: "Common Cultural",
  race: ["Elf"],
  description: "Elves are taught bowcraft from a young age. Useful for hunting, defense, or sport. Unlocks paths to more advanced ranged combat skills.",
  attributes: ["agility"],
  isCombatant: true
},

elven_tongue: {
  name: "Elven Tongue",
  level: "Beginner",
  next_skill: ["script_flourish", "lyric_spellcraft"],
  branch: "Common Cultural",
  race: ["Elf"],
  description: "Fluency in the melodic and ancient elven language. Enables spellcasting, script reading, and ritual communication.",
  attributes: ["intelligence"],
  isCombatant: false
},

tree_whispering: {
  name: "Tree Whispering",
  level: "Beginner",
  next_skill: ["grove_speaking", "druidic_empathy"],
  branch: "Common Cultural",
  race: ["Elf"],
  description: "Communicate with ancient trees to find shelter, sense corruption, or ask directions. Basic druidic affinity for arboreal entities.",
  attributes: ["intelligence"],
  isCombatant: false
},

artistic_crafting: {
  name: "Artistic Crafting",
  level: "Beginner",
  next_skill: ["musical_craft", "fine_smithing"],
  branch: "Common Cultural",
  race: ["Elf"],
  description: "Elves value aesthetics and craftsmanship. Trained in woodcarving, weaving, and music. Leads to specialized artistic branches.",
  attributes: ["intelligence", "agility"],
  isCombatant: false
},

etiquette_of_the_courts: {
  name: "Etiquette of the Courts",
  level: "Beginner",
  next_skill: ["court_diplomacy", "noble_mediator"],
  branch: "Common Cultural",
  race: ["Elf"],
  description: "Graceful manners and refined presence allow elves to navigate noble courts with ease. Grants advantage on Persuasion checks in aristocratic settings.",
  attributes: ["intelligence"],
  isCombatant: false
},brute_strength: {
  name: "Brute Strength",
  level: "Starter",
  type: 'active',
  next_skill: ["crushing_blow", "mighty_lift"],
  branch: "Innate Traits",
  race: ["Orc"],
  description: "Orcs are born with dense muscle mass and tremendous strength. Used to smash obstacles, carry heavy loads, or overpower enemies in melee. Grants +2 Strength and doubles carrying capacity.",
  attributes: ["strength"],
  isCombatant: true,
},

battle_instinct: {
  name: "Battle Instinct",
  level: "Starter",
  next_skill: ["combat_awareness", "counterstrike"],
  branch: "Innate Traits",
  race: ["Orc"],
  description: "Trained from youth to react instantly to threats. Helps anticipate danger, track enemies, and strike first. Grants advantage on initiative rolls and perception in combat.",
  attributes: ["intelligence", "agility"],
  isCombatant: true
},

savage_endurance: {
  name: "Savage Endurance",
  level: "Starter",
  next_skill: ["relentless_drive", "pain_tolerance"],
  branch: "Innate Traits",
  race: ["Orc"],
  description: "Orcs endure pain that would drop others. Remain standing while wounded and resist exhaustion. Once per day, survive a fatal hit at 1 HP and delay exhaustion effects.",
  attributes: ["strength"],
  isCombatant: true
},

fearsome_presence: {
  name: "Fearsome Presence",
  level: "Starter",
  next_skill: ["commanding_roar", "tyrannic_dread"],
  branch: "Innate Traits",
  race: ["Orc"],
  description: "An orc’s glare, growl, or stance can shake resolve. Use intimidation to control a crowd or hold authority. Grants bonus to Intimidation; may cause enemies to flinch.",
  attributes: ["intelligence", "strength"],
  isCombatant: false
},

nightborn_vision: {
  name: "Nightborn Vision",
  level: "Starter",
  next_skill: ["void_sight", "bloodvision"],
  branch: "Innate Traits",
  race: ["Orc"],
  description: "Adapted to hunting and raiding in darkness. Grants the ability to see in total darkness up to 60 ft.",
  attributes: ["intelligence"],
  isCombatant: false
},

basic_weapon_handling: {
  name: "Basic Weapon Handling",
  level: "Beginner",
  next_skill: ["axe_specialization", "hammer_training"],
  branch: "Common Cultural",
  race: ["Orc"],
  description: "Orcs are trained from youth to wield axes, clubs, and blades. Core for hunting and tribal defense. Unlocks advanced paths in weapon mastery.",
  attributes: ["strength", "agility"],
  isCombatant: true
},

war_chanting: {
  name: "War Chanting",
  level: "Beginner",
  next_skill: ["battle_hymn", "death_drummer"],
  branch: "Common Cultural",
  race: ["Orc"],
  description: "Rhythmic battle chants stir blood and bolster morale. Used to inspire allies and demoralize enemies. Grants temporary boosts to strength or morale while chanting.",
  attributes: ["intelligence", "strength"],
  isCombatant: false
},

beast_butchering: {
  name: "Beast Butchering",
  level: "Beginner",
  next_skill: ["trophy_crafting", "hide_armor_crafting"],
  branch: "Common Cultural",
  race: ["Orc"],
  description: "Trained to use every part of a kill. Gather meat, craft bone tools, and create war paint. Leads to crafting trophies, armor, and tribal items.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

tribal_honor_code: {
  name: "Tribal Honor Code",
  level: "Beginner",
  next_skill: ["clan_diplomacy", "battle_oaths"],
  branch: "Common Cultural",
  race: ["Orc"],
  description: "Orcs value loyalty and personal honor. Used to resolve disputes, gain allies, and maintain status. Grants bonus to diplomacy within the clan and builds reputation.",
  attributes: ["intelligence"],
  isCombatant: false
},

rage_control: {
  name: "Rage Control",
  level: "Beginner",
  next_skill: ["berserker_rage", "focused_fury"],
  branch: "Common Cultural",
  race: ["Orc"],
  description: "Orcs are taught to master their fury—either unleashing it in battle or restraining it strategically. Unlocks paths to berserking or tactical rage.",
  attributes: ["strength", "intelligence"],
  isCombatant: true
},nimble_reflexes: {
  name: "Nimble Reflexes",
  level: "Starter",
  next_skill: ["evasive_maneuvers", "acrobat_mastery"],
  branch: "Innate Traits",
  race: ["Goblin"],
  description: "Small frame and wiry limbs grant great agility. Useful for dodging attacks, squeezing through tight spaces, and climbing quickly. Grants +2 Agility and advantage on Acrobatics in confined areas.",
  attributes: ["agility"],
  isCombatant: true
},

darkvision: {
  name: "Darkvision",
  level: "Starter",
  next_skill: ["void_sight", "shadow_ambush"],
  branch: "Innate Traits",
  race: ["Goblin"],
  description: "Adapted to life underground or in poorly lit places. Enables seeing in total darkness up to 60 ft.",
  attributes: ["intelligence"],
  isCombatant: false
},

cowards_instinct: {
  name: "Coward’s Instinct",
  level: "Starter",
  next_skill: ["last_dodge", "panic_escape"],
  branch: "Innate Traits",
  race: ["Goblin"],
  description: "A sixth sense for danger and betrayal. Once per day, instinctively dodge a fatal attack, avoiding death. Helps avoid traps and ambushes.",
  attributes: ["agility", "intelligence"],
  isCombatant: false
},

scavengers_nose: {
  name: "Scavenger’s Nose",
  level: "Starter",
  next_skill: ["junk_mastery", "treasure_hunter"],
  branch: "Innate Traits",
  race: ["Goblin"],
  description: "Masters at finding useful junk and repurposing broken gear. Bonus to Perception and Investigation in urban or ruined environments.",
  attributes: ["intelligence"],
  isCombatant: false
},

pack_mentality: {
  name: "Pack Mentality",
  level: "Starter",
  next_skill: ["swarm_attack", "group_coordination"],
  branch: "Innate Traits",
  race: ["Goblin"],
  description: "Operate best in groups and swarms. Gain bonuses to attack or defense when near allies, enabling flanking and combo attacks.",
  attributes: ["agility", "intelligence"],
  isCombatant: true
},

trapmaking_basic: {
  name: "Trapmaking (Basic)",
  level: "Beginner",
  next_skill: ["advanced_traps", "explosive_rigs"],
  branch: "Common Cultural",
  race: ["Goblin"],
  description: "Goblins love clever and dirty traps. Set snares, tripwires, and alarms. Unlocks advanced traps, explosives, and poison devices.",
  attributes: ["intelligence"],
  isCombatant: false
},

sneaky_movement: {
  name: "Sneaky Movement",
  level: "Beginner",
  next_skill: ["shadow_stalker", "silent_escape"],
  branch: "Common Cultural",
  race: ["Goblin"],
  description: "Trained to move silently and hide in plain sight. Useful for infiltration, theft, and evasion. Grants advantage on Stealth in rocky, urban, or forested terrain.",
  attributes: ["agility"],
  isCombatant: true
},

tinkerers_touch: {
  name: "Tinkerer's Touch",
  level: "Beginner",
  next_skill: ["goblin_engineering", "improvised_bombs"],
  branch: "Common Cultural",
  race: ["Goblin"],
  description: "Fond of strange gadgets, from slingshots to flame-throwers. Build or repair makeshift devices. Unlocks skills in engineering and bomb-making.",
  attributes: ["intelligence", "agility"],
  isCombatant: false
},

quick_liar: {
  name: "Quick Liar",
  level: "Beginner",
  next_skill: ["master_deceiver", "pressure_tactics"],
  branch: "Common Cultural",
  race: ["Goblin"],
  description: "Can lie as naturally as breathing. Trick guards, fake wounds, and confuse foes. Grants bonus to Deception checks, especially under pressure.",
  attributes: ["intelligence"],
  isCombatant: false
},

goblin_cuisine: {
  name: "Goblin Cuisine (Gross but Effective)",
  level: "Beginner",
  next_skill: ["alchemical_cooking", "mushroom_brewing"],
  branch: "Common Cultural",
  race: ["Goblin"],
  description: "Goblins eat almost anything and can cook edible meals from inedible ingredients. Useful for survival and poisoning enemies with foul food. Unlocks alchemical and brewing arts.",
  attributes: ["intelligence"],
  isCombatant: false
},lucky_footwork: {
  name: "Lucky Footwork",
  level: "Starter",
  next_skill: ["nimble_escape", "trap_avoidance"],
  branch: "Innate Traits",
  race: ["Halfling"],
  description: "Halflings often slip through dangers by luck. Once per day, reroll a failed check or saving throw to avoid critical failures or traps.",
  attributes: ["agility", "intelligence"],
  isCombatant: false
},

softstep: {
  name: "Softstep",
  level: "Starter",
  next_skill: ["emergency_bolt"],
  branch: "Innate Traits",
  race: ["Halfling"],
  description: "Naturally light-footed and quiet, able to sneak past enemies or move silently through brush. Grants advantage on Stealth in natural or domestic environments.",
  attributes: ["agility"],
  isCombatant: true
},

brave_heart: {
  name: "Brave Heart",
  level: "Starter",
  next_skill: ["steadfast_will", "fearless_charge"],
  branch: "Innate Traits",
  race: ["Halfling"],
  description: "Halflings show courage beyond reason, resisting fear and intimidation. Grants bonus to saves against fear and intimidation effects.",
  attributes: ["strength", "intelligence"],
  isCombatant: true
},

keen_appetite: {
  name: "Keen Appetite",
  level: "Starter",
  next_skill: ["herbalist", "food_savant"],
  branch: "Innate Traits",
  race: ["Halfling"],
  description: "A foodie with practical survival knowledge. Bonus to Survival and Cooking checks involving identification of edible plants and brewing teas.",
  attributes: ["intelligence"],
  isCombatant: false
},

small_stature: {
  name: "Small Stature",
  level: "Starter",
  next_skill: ["hide_in_plain_sight", "crawlspace_access"],
  branch: "Innate Traits",
  race: ["Halfling"],
  description: "Small size allows hiding behind larger allies and moving through narrow spaces or tiny shelters.",
  attributes: ["agility"],
  isCombatant: false
},

homecrafting: {
  name: "Homecrafting",
  level: "Beginner",
  next_skill: ["domestic_engineering", "secret_compartments"],
  branch: "Common Cultural",
  race: ["Halfling"],
  description: "Expert builders of cozy, clever homes. Skilled in crafting furniture, warm shelters, and hidden nooks.",
  attributes: ["intelligence", "strength"],
  isCombatant: false
},

halfling_hospitality: {
  name: "Halfling Hospitality",
  level: "Beginner",
  next_skill: ["diplomatic_grace", "food_mediation"],
  branch: "Common Cultural",
  race: ["Halfling"],
  description: "Polite and persuasive, able to befriend strangers and calm tensions using aid or food. Advantage on Charisma (Persuasion) when offering hospitality.",
  attributes: ["intelligence"],
  isCombatant: false
},

simple_sling_training: {
  name: "Simple Sling Training",
  level: "Beginner",
  next_skill: ["trick_shot", "ricochet_shot"],
  branch: "Common Cultural",
  race: ["Halfling"],
  description: "Mastery of slings and surprise strikes from a distance. Unlocks trick shots and specialized sling techniques.",
  attributes: ["agility", "strength"],
  isCombatant: true
},

storytelling: {
  name: "Storytelling",
  level: "Beginner",
  next_skill: ["bardic_subskills", "emotional_persuasion"],
  branch: "Common Cultural",
  race: ["Halfling"],
  description: "Tradition of passing down history, morals, and gossip through tales. Useful for entertainment and manipulation.",
  attributes: ["intelligence"],
  isCombatant: false
},

emergency_bolt: {
  name: "Emergency Bolt",
  level: "Beginner",
  next_skill: ["rapid_escape", "defensive_maneuvers"],
  branch: "Common Cultural",
  race: ["Halfling"],
  description: "Instinctive escape maneuver allowing a quick disengage and dash once per short rest.",
  attributes: ["agility"],
  isCombatant: true
}
, versatile_mind: {
  name: "Versatile Mind",
  level: "Starter",
  next_skill: ["quick_learner", "multi_classing"],
  branch: "Innate Traits",
  race: ["Human"],
  description: "Humans learn new trades or paths faster than others. Gain +1 extra skill at creation and reduce training time by 25%.",
  attributes: ["intelligence"],
  isCombatant: false
},

driven_spirit: {
  name: "Driven Spirit",
  level: "Starter",
  next_skill: ["unyielding_will", "iron_determination"],
  branch: "Innate Traits",
  race: ["Human"],
  description: "Strong internal will allowing one to push past physical or mental limits. Once per day, reroll a near-failure with advantage.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

adaptive_resilience: {
  name: "Adaptive Resilience",
  level: "Starter",
  next_skill: ["environmental_hardiness", "cultural_flexibility"],
  branch: "Innate Traits",
  race: ["Human"],
  description: "Survive and adapt in various environments and cultures. Reduce penalties from harsh terrain, social penalties, or unfamiliar customs.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

balanced_build: {
  name: "Balanced Build",
  level: "Starter",
  next_skill: ["versatile_fighter", "balanced_athlete"],
  branch: "Innate Traits",
  race: ["Human"],
  description: "A reliable build without extremes. No racial stat penalties and choose one +1 attribute bonus.",
  attributes: ["strength", "agility", "intelligence"],
  isCombatant: true
},

social_agility: {
  name: "Social Agility",
  level: "Starter",
  next_skill: ["persuasive_leader", "networker"],
  branch: "Innate Traits",
  race: ["Human"],
  description: "Ability to blend into groups, persuade leaders, and organize efforts. Bonus to Persuasion or Leadership rolls.",
  attributes: ["intelligence"],
  isCombatant: false
},

basic_trade_skills: {
  name: "Basic Trade Skills",
  level: "Beginner",
  next_skill: ["blacksmithing", "tailoring", "agriculture"],
  branch: "Common Cultural",
  race: ["Human"],
  description: "Fundamental crafts like farming, masonry, and smithing. Enables producing and repairing basic tools, food, and clothing.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

weapon_familiarity: {
  name: "Weapon Familiarity",
  level: "Beginner",
  next_skill: ["spear_mastery", "sling_mastery"],
  branch: "Common Cultural",
  race: ["Human"],
  description: "Basic proficiency with common weapons used by farmers and villagers. No penalties for common weapons and gain one weapon proficiency of choice.",
  attributes: ["strength", "agility"],
  isCombatant: true
},

bartering: {
  name: "Bartering",
  level: "Beginner",
  next_skill: ["merchant_negotiator", "haggling_expert"],
  branch: "Common Cultural",
  race: ["Human"],
  description: "Skillful negotiation in markets and trades. Bonus to Insight and Persuasion during transactions.",
  attributes: ["intelligence"],
  isCombatant: false
},

written_language_mastery: {
  name: "Written Language Mastery",
  level: "Beginner",
  next_skill: ["scribe", "translator", "spell_sigil_crafter"],
  branch: "Common Cultural",
  race: ["Human"],
  description: "Competence in reading, copying, and creating documents, maps, and magical scripts.",
  attributes: ["intelligence"],
  isCombatant: false
},

civic_organization: {
  name: "Civic Organization",
  level: "Beginner",
  next_skill: ["captain", "administrator", "diplomat"],
  branch: "Common Cultural",
  race: ["Human"],
  description: "Ability to coordinate groups, build alliances, and enact laws. Unlocks leadership-related roles.",
  attributes: ["intelligence"],
  isCombatant: false
},stoneborn_resilience: {
  name: "Stoneborn Resilience",
  level: "Starter",
  next_skill: ["poison_resistance", "stone_skin"],
  branch: "Innate Traits",
  race: ["Dwarf"],
  description: "Dwarves have hardy constitutions and resistance to toxins. Gain resistance to poison and sickness effects.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

darkvision: {
  name: "Darkvision",
  level: "Starter",
  next_skill: ["enhanced_nightvision"],
  branch: "Innate Traits",
  race: ["Dwarf"],
  description: "Dwarves can see in total darkness underground. Allows navigation and combat in caves and dark places up to 60 ft.",
  attributes: ["intelligence"],
  isCombatant: true
},

stone_sense: {
  name: "Stone Sense",
  level: "Starter",
  next_skill: ["earth_bonding", "seismic_awareness"],
  branch: "Innate Traits",
  race: ["Dwarf"],
  description: "Intuitive awareness of stonework, tunnels, and earth movements. Detect weak walls, hidden chambers, or approaching quakes.",
  attributes: ["intelligence"],
  isCombatant: false
},

sturdy_frame: {
  name: "Sturdy Frame",
  level: "Starter",
  next_skill: ["heavy_lifting", "armor_expert"],
  branch: "Innate Traits",
  race: ["Dwarf"],
  description: "Dense muscle and bone structure provide natural toughness. Gain +1 to encumbrance and damage resistance to bludgeoning.",
  attributes: ["strength"],
  isCombatant: true
},

ancestral_memory: {
  name: "Ancestral Memory",
  level: "Starter",
  next_skill: ["rune_reading", "deep_history"],
  branch: "Innate Traits",
  race: ["Dwarf"],
  description: "Deep memory of songs, sagas, and stone lore. Bonuses to history, rune deciphering, and ancient artifact use.",
  attributes: ["intelligence"],
  isCombatant: false
},

basic_mining: {
  name: "Basic Mining",
  level: "Beginner",
  next_skill: ["prospecting", "gem_cutting", "ore_refining"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Use of tools to mine stone and metal. Harvest ore, gems, and construct support structures.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

forge_apprentice: {
  name: "Forge Apprentice",
  level: "Beginner",
  next_skill: ["weapon_smithing", "armor_smithing"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Trained at the forge from youth. Craft basic weapons, armor, and tools. Unlocks Smithing trees.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
},

brewcraft_basics: {
  name: "Brewcraft Basics",
  level: "Beginner",
  next_skill: ["ale_alchemy", "fermentation_mastery"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Dwarves take pride in their brews. Craft ale, tonics, and battlefield spirits with minor buffs or healing.",
  attributes: ["intelligence"],
  isCombatant: false
},

axe_familiarity: {
  name: "Axe Familiarity",
  level: "Beginner",
  next_skill: ["battleaxe_mastery", "throwing_axe_techniques"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Wield axes with expert efficiency. No penalties with axes; unlocks dual-wielding and throwing techniques.",
  attributes: ["strength"],
  isCombatant: true
},

clan_loyalty: {
  name: "Clan Loyalty",
  level: "Beginner",
  next_skill: ["clan_champion", "oath_keeper"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Strong bonds and honor in kinship. Gain morale boosts near allies and bonuses to Leadership and Resolve.",
  attributes: ["strength", "intelligence"],
  isCombatant: false
}, oath_keeper: {
  name: "Oath Keeper",
  level: "Apprentice",
  next_skill: ["clan_judicator", "unyielding_vow"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Uphold sacred oaths and inspire allies through unshakable honor. Boosts to resistance against fear, loyalty aura, and enhanced resolve under pressure.",
  attributes: ["intelligence", "charisma"],
  isCombatant: false
}, 
clan_champion: {
  name: "Clan Champion",
  level: "Apprentice",
  next_skill: ["stoneheart_defender", "war_song"],
  branch: "Common Cultural",
  race: ["Dwarf"],
  description: "Represent the pride and strength of your clan in battle. Gain bonuses when defending allies, increased fortitude, and retaliatory power under pressure.",
  attributes: ["strength", "agility"],
  isCombatant: true
}







}