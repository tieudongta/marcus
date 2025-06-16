export class Job {
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
    isAvailable() {
        return true;
    }
}