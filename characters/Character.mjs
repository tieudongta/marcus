import { Weapon } from '../items/Weapon.mjs';
import { Wallet } from '../items/Wallet.mjs';
import { createCharacter } from '../factory/characters/characterFactory.mjs';
import { Skill } from '../skills/Skill.mjs';
import { Inventory } from '../items/Inventory.mjs';
import { LEVELING_CONFIG, raceStatIncrements } from '../data/configs/levelingConfigs.mjs';
import { Location } from '../world/Location.mjs';
import { locations } from '../data/world/locationPresets.mjs';
import { TimeSystem } from '../core/TimeSystem.mjs';
import { Item } from '../items/Item.mjs';
import { itemPresets } from '../data/items/itemPresets.mjs';
import { actionConfigs } from '../data/configs/actionConfigs.mjs';
import { TravelSystem } from '../core/TravelSystem.mjs';
export class Character {
    _energy;
    _health;
    constructor({
        name = "Unnamed",
        race = 'Human',
        level = 1,
        xp = 0,
        gold = 0,
        health = 100,
        energy = 100,
        strength = 10,
        agility = 10,
        intelligence = 10,
        luck = 1,
        bravery = 1,
        charisma = 1,
        isPlayer = false,
        timeSystem = null,
        allSkills = null,
        inventory = null,
        travelSystem = null,
        currentLocation = null
    } = {}) {
        this.name = name;
        this.race = race;
        this.level = level;
        this.xp = xp;
        this.level = level;
        this.gold = gold;
        // Vital
        this.maxHealth = health;
        this.health = health;
        this.maxEnergy = energy;
        this.energy = energy;
        // Attributes
        this.strength = strength;
        this.agility = agility;
        this.intelligence = intelligence;
        // Personality
        this.luck = luck;
        this.charisma = charisma;
        this.bravery = bravery;
        // Inventory
        this.inventory = inventory || new Inventory();//
        this.timeSystem = timeSystem || new TimeSystem();
        this.travelSystem = travelSystem || new TravelSystem();
        this.isResting = false;
        this.isPlayer = isPlayer;

        if (this.timeSystem) this.timeSystem.subscribe(this);
        this.equippedWeapon = null;
        this.skills = allSkills ? this.initializeSkills(allSkills) : [];
        this.lastUsedSkill = null;
        // ✅ Use passed location or default to Elaria
        if (currentLocation) {
            this.currentLocation = currentLocation;
        } else {
            const startingLocationData = locations["Elaria"];
            this.currentLocation = new Location(startingLocationData);
        }
        // Quests
        this.activeQuests = [];
        this.completedQuests = [];
        this.kills = [];
    }
    getAvailableActions() {
        const actions = Object.values(actionConfigs);
        const currentPhase = this.timeSystem.phase.toLowerCase();
        return actions
            // Time-of-day check
            .filter(action =>
                action.dayPhase.includes("any") ||
                action.dayPhase.includes(currentPhase)
            )
            // Energy filtering logic
            .filter(action => {
                if (this.energy > this.maxEnergy * 0.7) {
                    return action.name !== "eat" && action.name !== "rest" && action.name !== "sleep";
                }
                if (this.energy < this.maxEnergy * 0.3) {
                    return action.name !== "hunt" && action.name !== "forage";
                }
                return true;
            })
            // Location filtering logic
            .filter(action => {
                return action.locationType.includes(this.currentLocation.type) || action.locationType.includes("any");
            })
            // Inventory-based requirement
            .filter(action => {
                if (action.itemType !== null) {
                    return this.inventory.hasItemType(action.itemType);
                }
                return true;
            })
            // Return only the minimal action data needed for UI
            .map(({ name, description }) => ({ name, description }));
    }
    eat() {
        console.log("Need to remove item from inventory");
    }
    performAction(str) {
        let msg;
        const time = this.timeSystem.advanceTime(actionConfigs[str].timeCost);
        msg = `You ${str} in ${time}, `
        if (str === "eat") {
            this.eat();
        }
        if (actionConfigs[str].energyCost > 0) {
            const energy = this.loseEnergy(actionConfigs[str].energyCost);
            msg += ` lose ${energy} energy,`;
        } else {
            const energy = this.recoverEnergy(Math.abs(actionConfigs[str].energyCost));
            msg += ` recover ${energy} energy,`;
        }
        if (actionConfigs[str].xp > 0) {

            const xp = this.gainXp(actionConfigs[str].xp);
            msg += ` gain ${xp} XP`
        }

        return msg;
    }

    addCompletedQuest(quest) {
        if (quest.completed) {
            this.activeQuests = this.activeQuests.filter(q => q !== quest);
            this.completedQuests.push(quest);
        }
    }
    acceptQuest(questSystem, quest) {
        questSystem.addQuestToPlayer(quest, this);
        quest.start(this);
        quest.update(this);
        console.log(`Added quest: ${quest.name}`);
    }
    getQuestById(id) {
        return this.quests.find(q => q.id === id);
    }
    updateQuest(id, updateFunc) {
        const quest = this.getQuestById(id);
        if (!quest) {
            console.warn(`Quest ${id} not found.`);
            return;
        }
        updateFunc(quest);
    }
    showQuestLog() {
        console.log('-----Quest Log ----');
        this.quests.forEach(q => {
            console.log(`${q.name} [${q.status} - Stage: ${q.getStage().name}]`);
        })
    }
    set energy(val) {
        this._energy = Math.min(val, this.maxEnergy);
    }
    get energy() {
        return Math.floor(this._energy);
    }
    set health(val) {
        this._health = Math.min(val, this.maxHealth);
    }
    get health() {
        return this._health;
    }
    addItemToInventory(item) {
        return this.inventory.addItem(item);
    }
    getInventoryList() {
        return this.inventory.getItemList();
    }
    initializeSkills(allSkills) {
        const eligible = Object.entries(allSkills).filter(([_, skill]) =>
            skill.race.includes(this.race) && skill.level.toLowerCase() === 'starter'
        );
        const count = Math.floor(Math.random() * 3) + 2;
        const selected = eligible.sort(() => Math.random() - 0.5).slice(0, count);

        const result = [];
        for (const [id, data] of selected) {
            const skillData = { ...data, id };
            if (skillData.type === 'active' && skillData.effectFn !== 'function') {
                skillData.effectFn = Skill.generateEffectFn(skillData);
            }
            result.push(new Skill(skillData));
        }

        return result;
    }

    levelUp() {
        this.level++;

        const raceIncrements = raceStatIncrements[this.race] || {
            strength: 1, agility: 1, intelligence: 1, charisma: 1, health: 10, energy: 10,
        };

        this.strength += raceIncrements.strength;
        this.agility += raceIncrements.agility;
        this.intelligence += raceIncrements.intelligence;
        this.charisma += raceIncrements.charisma;

        this.maxHealth += raceIncrements.health;
        this.maxEnergy += raceIncrements.energy;

        // Restore health and energy after level up
        this.health = this.maxHealth;
        this.energy = this.maxEnergy;

        for (const skill of Object.values(this.skills)) {
            skill.recalculate?.(this.level);
        }

        console.log(`Level up! You are now level ${this.level}.`);
        return true;
    }


    gainXp(amount) {
        if (amount > 0) {
            console.log(`✨ Gained ${amount} XP!`);
        }
        this.xp += amount;
        let nextlLevelXp = this.xpToNextLevel(this.level);
        while (this.xp >= nextlLevelXp) {
            this.xp -= nextlLevelXp;
            this.levelUp();
            nextlLevelXp = this.xpToNextLevel(this.level);
        }
        // 🔧 Add this:

        console.log(`${this.name}'s XP is now: ${this.xp}`);
        return amount;
    }
    xpToNextLevel(level) {
        const { type, exponent, multiplier } = LEVELING_CONFIG.xpCurve;

        switch (type) {
            case 'linear':
                return multiplier * level;
            case 'exponential':
                return Math.floor(multiplier * Math.pow(2, level - 1));
            case 'polynomial':
            default:
                return Math.floor(multiplier * Math.pow(level, exponent));
        }
    }

    getOffense() {
        const weaponBonus = this.equippedWeapon?.durability > 0
            ? (this.equippedWeapon.attackPower || 0)
            : 0;

        return (this.strength || 0) + weaponBonus;
    }


    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        if (this.health === 0) this.die();
        if (this.isPlayer) {
            console.log(`${this.name} attacked gained ${amount} XP.`);
            this.gainXp(amount);
        }
    }
    useSkill(target) {
        //console.log("Skills at runtime:", this.skills);
        const activeSkills = this.skills.filter(skill => skill.type === 'active');
        const chosenSkill = activeSkills.length > 0
            ? activeSkills[Math.floor(Math.random() * activeSkills.length)]
            : null;

        let damage = 0;
        let usedSkill = null;

        if (chosenSkill) {
            const result = chosenSkill.use(this, target);
            damage = result.damage || 0;
            usedSkill = chosenSkill;
            chosenSkill.gainXp(5);
            this.lastUsedSkill = chosenSkill;
            if (this.lastUsedSkill) {
                console.log(`${this.name} used ${this.lastUsedSkill.name} on ${target.name}`);
            }
            return damage;
        } else {
            return 0;

        }
    }
    calculateDamageTo(targetCharacter) {
        const dodged = targetCharacter.calculateDodge();
        const isCrit = this.calculateCrit();

        if (dodged) {
            console.log(`${targetCharacter.name} dodged the attack from ${this.name}.`);
            return { damage: 0, dodged: true, critical: false };
        }

        let base = this.useSkill(targetCharacter);
        if (base <= 0) {
            base = this.getOffense();
        }

        if (isCrit) base = Math.floor(base * 1.5 + this.intelligence * 0.05);

        console.log(`${this.name} attacks ${targetCharacter.name} for ${base} damage.${isCrit ? ' (Critical!)' : ''}`);

        return { damage: base, dodged: false, critical: isCrit };
    }

    calculateCrit() {
        const baseChance = 0.05; // 5% base
        const intBonus = (this.intelligence || 0) * 0.003; // +0.3% per INT
        const chance = baseChance + intBonus;
        return Math.random() < chance;
    }

    calculateDodge() {
        const baseChance = 0.03; // 3% base
        const agiBonus = (this.agility || 0) * 0.003; // +0.3% per AGI
        const chance = baseChance + agiBonus;
        const roll = Math.random();
        console.log(`${this.name} dodge chance: ${(chance * 100).toFixed(2)}% — rolled ${(roll * 100).toFixed(2)}`);
        return roll < chance;
    }

    heal(amount) {
        this.health += amount;
        console.log(`${this.name} heals for ${amount}. Health is now ${this.health}/${this.maxHealth}.`);
    }

    recoverEnergy(amount) {
        this.energy += amount;
        console.log(`${this.name} recovers ${amount} energy. Energy is now ${this.energy}/${this.maxEnergy}.`);
        return amount;
    }
    loseEnergy(amount) {
        this.energy -= amount;
        console.log(`${this.name} lost ${amount} energy. Energy is now ${this.energy}/${this.maxEnergy}.`);
        return amount;
    }
    die() {
        this.health = 0;
        console.log(`${this.name} has died.`);
    }

    get isAlive() {
        return this.health > 0;
    }
    getAvailableShops() {
        return this.currentLocation.shops;
    }
    spendGold(amount) {
        if (amount > this.gold) return false;
        this.gold -= amount;
        return true;
    }

    addGold(amount) {
        if (amount < 0) return false;
        this.gold += amount;
        return true;
    }

    onTimeTick(deltaTime) {
        if (this.isResting && this.timeSystem?.phase === "Night") {
            this.energy += deltaTime * 0.2;
            this.health += deltaTime * 0.1;
        } else {
            this.energy -= deltaTime * 0.1;
        }

        if (this.energy < 0) this.energy = 0;
        // Add max energy cap if needed
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
        if (this.health < 0) this.health = 0;
        if (this.health > this.maxHealth) {
            this.energy = this.maxHealth;
        }
    }

    rest() {
        this.isResting = true;
    }

    wakeUp() {
        this.isResting = false;
    }

    equipWeapon(weapon) {
        if (!(weapon instanceof Weapon)) throw new Error("Invalid weapon type.");
        this.equippedWeapon = weapon;
        console.log(`${this.name} equipped ${weapon.name}.`);
    }

    serialize() {
        return {
            name: this.name,
            level: this.level,
            wallet: this.wallet.balance,
            health: this.health,
            maxHealth: this.maxHealth,
            energy: this.energy,
            maxEnergy: this.maxEnergy,
            strength: this.strength,
            agility: this.agility,
            intelligence: this.intelligence,
            luck: this.luck,
            bravery: this.bravery,
            charisma: this.charisma,
            inventory: this.getInventoryList()
        };
    }

    deserialize(data) {
        this.name = data.name;
        this.level = data.level;
        this.wallet = new Wallet(data.wallet);
        this.health = data.health;
        this.maxHealth = data.maxHealth || data.health;
        this.energy = data.energy;
        this.maxEnergy = data.maxEnergy || data.energy;
        this.strength = data.strength;
        this.agility = data.agility;
        this.intelligence = data.intelligence;
        this.luck = data.luck;
        this.bravery = data.bravery;
        this.charisma = data.charisma;
        if (Array.isArray(data.inventory)) {
            this.inventory = new Inventory();
            for (const { name, quantity } of data.inventory) {
                const itemInstance = new Item({ name });
                for (let i = 0; i < quantity; i++) {
                    this.inventory.addItem(itemInstance);
                }
            }
        }
    }

    onPhaseChange(phase) {
        console.log(phase);
    }

    /**
     * Create a character using presets via characterFactory.
     * Useful for quick NPC/enemy spawning with minimal setup.
     * @param {string} configKey - Key from characterConfigs, e.g., "orc", "goblin"
     * @param {Object} overrides - Optional overrides (name, allSkills, etc.)
     * @returns {Character}
     */
    static fromTemplates(configKey = 'orc', overrides = {}) {
        return createCharacter(configKey, overrides);
    }

    get effectiveAttributes() {
        const base = {
            strength: this.strength,
            agility: this.agility,
            intelligence: this.intelligence
        };

        const boosts = {};
        for (const skill of Object.values(this.skills)) {
            const skillBoosts = skill.getAttributeBoosts?.() || {};
            for (const [attr, value] of Object.entries(skillBoosts)) {
                boosts[attr] = (boosts[attr] || 0) + value;
            }
        }

        const result = {};
        for (const key in base) {
            result[key] = base[key] + (boosts[key] || 0);
        }
        return result;
    }
}
