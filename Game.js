// Utility function
function log(msg) {
    console.log(msg);
}

// TimeSystem Class
class TimeSystem {
    constructor(currentTime = 0, currentDay = 0, timeListeners = [], logger = console.log) {
        this.currentTime = currentTime;
        this.currentDay = currentDay;
        this.timeListeners = timeListeners;
        this.logger = logger;
    }
    log(msg) {
        if (this.logger) this.logger(msg);
    }
    register(listener) {
        if (listener && (typeof listener.onTimeAdvance === 'function')) {
            this.timeListeners.push(listener);
        } else {
            throw new Error("Listener must implement onTimeAdvance or onNewDay");
        }
        
    }

    advanceTime(hours) {
        const totalHours = this.currentTime + hours;
        const dayPassed = Math.floor(totalHours / 24);
        this.currentTime = totalHours % 24;

        if (dayPassed > 0) {
            this.currentDay += dayPassed;
            this.onNewDay();
        }

        log(`${hours} hour(s) passed. Day ${this.currentDay}, Time ${this.currentTime}`);

        for (const listener of this.timeListeners) {
            if (typeof listener.onTimeAdvance === 'function') {
                listener.onTimeAdvance(hours);
            }
        }
    }

    onNewDay() {
        log("A new day has begun.");
        for (const listener of this.timeListeners) {
            if (typeof listener.onNewDay === 'function') {
                listener.onNewDay();
            }
        }
    }
}
class Stat {
    constructor(value = 100, max = value, passive = 1) {
        this.base = value;
        this.current = value;
        this.max = max;
        this.passive = passive;
    }
    scaleMax(level, multiplier = 1) {
        this.max = this.base * level * multiplier;
        this.current = Math.min(this.current, this.max);
    }
    onTimeAdvance(hours) {
        const delta = this.passive * hours;
        if (delta > 0) this.increase(delta);
        else if (delta <0) this.decrease(-delta);
    }
    increaseByHours(hours) {
        this.increase(this.passive*hours);
        console.log(`In ${hours}, increased by ${this.passive*hours}`);
    }
    increase(amount) {
        this.current = Math.min(this.max, this.current + amount);
    }
    decreaseByHours(hours) {
        this.decrease(this.passive*hours);
        console.log(`In ${hours}, decreased by ${this.passive*hours}`);
    }
    decrease(amount) {
        this.current = Math.max(0, this.current - amount);
    }
    isFull() {
        return this.current === this.max;
    }
    isEmpty() {
        return this.current === 0;
    }
}
class Stats {
    constructor(level =1) {
        this.energy = new Stat(100 * level, 100, -1);
        this.hunger = new Stat(100, 100, -2);
        this.happiness = new Stat(100, 100, -0.5);
    }
    onTimeAdvance(hours) {
        Object.values(this).forEach(stat => {
            if( typeof stat.onTimeAdvance === 'function') {
                stat.onTimeAdvance(hours);
            }
        });
    }
    updateWithLevel(level) {
        this.energy.max = 100 * level;
    }
}
class TraitStat {
    constructor(value = 10) {
        this.base = value;
        this.current = value;
    }
    increase(amount) {
        this.current += amount;
    }
    decrease(amount) {
        this.current = Math.max(0, this.current - amount);
    }
}
class Traits {
    constructor(str = 10, int = 10, agi = 10, level = 1) {
        this.strength = new TraitStat(str* level);
        this.intelligence = new TraitStat(int * level);
        this.agility = new TraitStat(agi * level);
    }
    updateWithLevel(level) {
        this.strength.current = this.strength.base  * level;
        this.intelligence.current = this.intelligence.base * level;
        this.agility.current = this.agility.base * level;
    }
}
class Character {
    constructor(name = 'Unnamed Hero', level = 1, baseTraits = { str: 10, int: 10, agi: 10 }) {
        this.name = name;
        this.level = level;
        this.stats = new Stats(level);
        this.traits = new Traits(baseTraits.str, baseTraits.int, baseTraits.agi, level);
    }
    onTimeAdvance(hours) {
        this.stats.onTimeAdvance(hours);
    }
    levelUp() {
        this.level++;
        this.stats.updateWithLevel(this.level);
        this.traits.updateWithLevel(this.level);
    }
}
class Player extends Character {
    constructor(name = 'Unnamed Hero', level = 1, baseTraits) {
        super(name, level, baseTraits);
        this.xp = 0;
        this.wallet = new Wallet();
        this.skills = {};
    }
    addSkill(skill) {
        if (skill instanceof Skill && !this.skills[skill.name]) {
            this.skills[skill.name] = skill;
        }
    }
    xpToNextLevel() {
        return 100 * this.level;
    }
    gainXp(amount) {
        this.xp += amount; // should add, not replace
        while (true) {  // handle multiple levels gained
            const xpNeeded = this.xpToNextLevel();
            if (this.xp <xpNeeded) break;
            this.xp -= xpNeeded;
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.stats.updateWithLevel(this.level);
        this.traits.updateWithLevel(this.level);
        // Reset and reapply skill trait bonuses
        Object.values(this.skills).forEach(skill => {
            skill.resetPlayerBonus(this);   // remove old bonus
            skill.updatePlayer(this);       // apply updated bonus
        });
        log(`${this.name} has level up. Current level ${this.level}`);
    }
}
class Activity {
    constructor(name, duration = 1, requirements = {}, effects = {}) {
        this.name = name;
        this.duration = duration;
        this.requirements = requirements;
        this.effects = effects;
    }

    canPerform(character) {
        for (const [key, value] of Object.entries(this.requirements || {})) {
            const stat = character.stats[key];
            const trait = character.traits[key];

            if (stat) {
                if (stat.current < value) return false;
            } else if (trait) {
                if (trait.current < value) return false;
            } else {
                // Stat or trait not found
                return false;
            }
        }
        return true;
    }


    perform(character) {
    character.stats.onTimeAdvance(this.duration);
    this.applyEffects(character);
    }

    applyEffects(character) {
        const cAllStats = { ...character.stats, ...character.traits };
        console.log('Applying effects:', this.effects);
        for (const key in this.effects) {
            const amount = this.effects[key];
            console.log(`Effect: ${key} -> ${amount}`);
            if (key in cAllStats) {
                if (amount > 0) {
                    cAllStats[key].increase(amount);
                } else {
                    cAllStats[key].decrease(Math.abs(amount));
                }
            } else if (key === 'xp') {
                console.log('Calling gainXp with', amount);
                character.gainXp(amount);
            } else if (key === 'gold') {
                if (amount > 0) {
                    character.wallet.add(amount);
                } else {
                    character.wallet?.spend?.(Math.abs(amount));
                }
            }
        }
    }

}
class Wallet {
    #balance;
    constructor(initial = 0, logger = null) {
        this.#balance = initial;
        this.logger = logger;
    }
    get balance() {
        return this.#balance;
    }
    add(amount) {
        if (amount < 0) throw new Error("Cannot add negative gold");
        this.#balance += amount;
        if (this.logger) this.logger(`Added ${amount} gold. New balance: ${this.#balance}g`);
    }
    spend(amount) {
        if (amount < 0) throw new Error("Cannot spend negative gold");
        if (this.#balance < amount) {
            this.logger?.("Not enough gold!");
            return false;
        }
        this.#balance -= amount;
        this.logger?.(`Spent ${amount} gold. Balance: ${this.#balance}`);
        return true;
    }
    has(amount) {
        return this.#balance >= amount;
    }
    toString() {
        return `${this.#balance}g`;
    }
}
class Skill {
    constructor(name, traitName = "strength", traitMultiplier = 1, xp = 0, level = 0) {
        this.name = name;
        this.xp = xp;
        this.level = level;
        this.traitName = traitName;
        this.traitMultiplier = traitMultiplier;
    }
    //TODO: Skill should boost trait based on level
    
    gainXp(amount) {
        if (amount <= 0) return;
        this.xp += amount; // should add, not replace
        while (true) {  // handle multiple levels gained
            const xpNeeded = this.xpToNextLevel();
            if (this.xp <xpNeeded) break;
            this.xp -= xpNeeded;
            this.levelUp();
        }
    }
    xpToNextLevel() {
        return 100 * (this.level+1);
    }
    levelUp() {
        this.level++;

        log(`Skill ${this.name} has level up. Now at level: ${this.level}.`);
    }
    getTraitBonus() {
        return {[this.traitName]:this.level*this.traitMultiplier};
    }
    updatePlayer(player) {
        const bonus = this.getTraitBonus();
        for (const trait in bonus) {
            if(player.traits?.[trait] && typeof player.traits[trait].current === 'number') {
                player.traits[trait].increase(bonus[trait]);
            } else {
                log(`Warning: Trait ${trait} not found on player.`);
            }
        }
    }
    toJSON() {
        return {
            name: this.name,
            traitName: this.traitName,
            traitMultiplier: this.traitMultiplier,
            xp: this.xp,
            level: this.level
        }
    }
    resetPlayerBonus(player) {
        const bonus = this.getTraitBonus();
        for (const trait in bonus) {
            if (player.traits?.[trait]) {
                player.traits[trait].decrease(bonus[trait]);
            }
        }
    }
}
class Job {
    constructor(name, payRate = 1, energyRate = 1, trainedSkills = [], duration = 1) {
        this.name = name;
        this.payRate = payRate;
        this.energyRate = energyRate;
        this.trainedSkills = trainedSkills;
        this.duration = duration;
    }
    isHirable(player) {
        return this.trainedSkills.every(({ skillName, requiredLevel }) => {
            const skill = player.skills[skillName];
            if(!skill && requiredLevel > 0) return false;
            return (skill?.level || 0) >= requiredLevel;
        });
    }
    perform(player) {
    const totalEnergyCost = this.duration * this.energyRate;

    // Check for enough energy
    if (player.stats.energy.current < totalEnergyCost) {
        return false;
    }

    // Deduct energy
    player.stats.energy.decrease(totalEnergyCost);

    // Add gold
    const goldGain = this.payRate * this.duration;
    player.wallet.add(goldGain);

    // Train skills
    this.trainedSkills.forEach(({ skillName, requiredLevel, xpPerHour }) => {
        const totalXp = this.duration * xpPerHour;

        // Initialize skill if not present and requiredLevel is 0
        if (!player.skills[skillName] && requiredLevel === 0) {
            player.skills[skillName] = new Skill(skillName); // use default trait/values or infer them
        }

        if (player.skills[skillName]) {
            player.skills[skillName].gainXp(totalXp);
        }
    });

    // Advance time
    player.onTimeAdvance(this.duration);

    return true;
}

}
function disablePassive(character) {
    const allStats = { ...character.stats, ...character.traits };
    for (const stat of Object.values(allStats)) {
        if (stat instanceof Stat) {
            stat.passive = 0;
        }
    }
}
