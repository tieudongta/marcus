import cloneDeep from 'lodash.clonedeep';
import { ACTION_CONFIG } from '../data/activities/actionConfigs.mjs';
import { PersonalityStats } from '../stats/PersonalityStats.mjs';
import { AttributeStats } from '../stats/AttributeStats.mjs';
import { VitalStats } from '../stats/VitalStats.mjs';
import { Potion } from '../items/Potion.mjs';
import { Inventory } from '../items/Inventory.mjs';
import { Character } from './Character.mjs';


export class Player extends Character {
    constructor(config) {
        super({
            ...config,
            assignStarterSkills: config.assignStarterSkills ?? false
        });
        const baseVital = cloneDeep(config.vitalStats ?? {
            health: { current: 50, max: 50 },
            mana: { current: 50, max: 50 },
            energy: { current: 50, max: 50 }
        });
        // Randomize if coreStats not provided
        const baseAttribute = cloneDeep(config.coreStats ?? Player.randomizeStats(10, ['strength', 'agility', 'intelligence']));

        // Randomize if personalityStats not provided
        const basePersonality = cloneDeep(config.personalityStats ?? Player.randomizeStats(10, ['charisma', 'wisdom', 'bravery']));

        this.vitalStats = new VitalStats(baseVital);
        this.attributeStats = new AttributeStats(baseAttribute);
        this.personalityStats = new PersonalityStats(basePersonality);
        this.inventory = new Inventory(); // Player-specific inventory
        this.questLog = []; // Tracking accepted quests
        this.xp = 0;
        this.level = 1;
        this.skills = {};
        //this.skills = [...config.skills];
        this.levelUp(this.level);
    }
    static randomizeStats(totalPoints, keys) {
        const stats = {};
        let remaining = totalPoints;
        for (let i = 0; i < keys.length - 1; i++) {
        const val = Math.floor(Math.random() * (remaining + 1));
        stats[keys[i]] = val;
        remaining -= val;
        }
        stats[keys[keys.length - 1]] = remaining;
        return stats;
    }
    addSkill(skill) {
        // if (!(skill instanceof Skill)) {
        //     throw new Error("Invalid skill");
        // }
        this.skills[skill.id] = skill;
    }
    get effectiveAttributes() {
        const baseAttrs = this.attributeStats.serialize();
        const effective = { ...baseAttrs};
        
        for (const skill of Object.values(this.skills) ) {
            console.log("Skill types:", Object.values(this.skills).map(s => s.constructor.name));

            const boosts = skill.getAttributeBoosts?.() || {};
            for (const [attr, boost] of Object.entries(boosts)) {
                effective[attr] = (effective[attr] || 0) + boost;
            }
        }
        //console.error(effective);
        return effective;
    }
    
    performAction({xpGained = 0, timeSpent = 0}) {
        if (this.timeSystem) {
            this.timeSystem.advance(timeSpent);
        }
        this.gainXp(xpGained);
    }
    getOffense(target) {
        //console.error(this.effectiveAttributes);
        const strength = this.effectiveAttributes.strength || 0;
        const weaponBonus = (this.equippedWeapon?.durability > 0) ? this.equippedWeapon.attackPower : 0;
        const totalOffense = strength + weaponBonus;
        console.log(`Player attacks! Granting XP for action.`);
        
        this.performAction({
            xpGained: ACTION_CONFIG.attack.xp,
            timeSpent: ACTION_CONFIG.attack.time
        });
        
        return isNaN(totalOffense) ? 5: totalOffense;
    }
    heal(amount) {
        this.vitalStats.change('health', amount);
        this.performAction({
            xpGained: ACTION_CONFIG.heal.xp,
            timeSpent: ACTION_CONFIG.heal.time
        });
    }
    restFor() {
        if (this.isResting) return;

        this.isResting = true;
        this.vitalStats.change('health', ACTION_CONFIG.rest.healAmount || 5);
        this.performAction({
            xpGained: ACTION_CONFIG.rest.xp,
            timeSpent: ACTION_CONFIG.rest.time
        });
        this.wakeUp();
    }
    wakeUp() {
        this.isResting = false;
        console.log(`You feel rested. Health is now ${this.vitalStats.get('health')}`);
    }
    gainXp(amount) {
        if ( amount > 0) {
            console.log(`✨ Gained ${amount} XP!`);
        }
        this.xp += amount;
        let nextlLevelXp = this.xpToNextLevel(this.level);

        while (this.xp >= nextlLevelXp) {
            this.xp -= nextlLevelXp;
            this.level++;
            this.levelUp(this.level);
            nextlLevelXp = this.xpToNextLevel(this.level);
        }
    }
    xpToNextLevel(level) {
        return 100 * level;
    }
    levelUp(level) {
        console.log(`Level up! You are now level ${level}.`);
        this.vitalStats.onLevelUp(level);
        this.attributeStats.onLevelUp(level);

        for (const skill of Object.values(this.skills)) {
            if (typeof skill.recalculate === 'function') {
                skill.recalculate(level);
            }
        }
    }
    pickLoot(item) {
        this.inventory.addItem(item);
    }
   useItem(item) {
        if (!(item instanceof Potion)) return false;
        if (!this.inventory.hasItem(item)) return false;
        const entry = this.inventory.items.find(e => e.item.name === item.name);
        if (!entry) return false;
        const potion = entry.item;
        const currentHealth = this.vitalStats.get('health') || 0;
        const maxHealth = this.vitalStats.getMax('health') || 100;
        if (currentHealth >= maxHealth) {
            console.log("Your health is already full.");
            return false;
        }
        const healAmount = potion.effectAmount || 0;

        const newHealth = Math.min(currentHealth + healAmount, maxHealth);
        this.vitalStats.set('health', newHealth);

        this.inventory.removeItem(potion);
        console.log(`Used ${potion.name}, health increased by ${healAmount}.`);
        return true;
    }
    usePotion(item) {
        const used = this.useItem(item);
        if (used) {
            this.performAction({ xpGained: ACTION_CONFIG.useItem.xp,
                timeSpent: ACTION_CONFIG.useItem.time
            })
        }
        return used;
    }
    acceptQuest(quest) {
        this.questLog.push(quest);
    }
}
