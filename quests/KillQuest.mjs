import { Quest } from "./Quest.mjs";

export class KillQuest extends Quest {
    constructor(config) {
        super(config);
        this.data.kills = 0;
        this.data.requiredKills = config.targetCount || config.requiredKills || 10;
        this.data.timeLimit = config.target?.time || null; // Optional time limit in minutes
    }

    onEnemyKilled(enemy) {
        if (this.status !== 'in_progress') return;

        // Only count kills of the correct type
        if (enemy.name.toLowerCase().includes(this.target.enemy.toLowerCase())) {
            this.data.kills++;
            console.log(`🩸 Killed ${enemy.name}. Progress: ${this.data.kills}/${this.data.requiredKills}`);

            // Stage logic
            if (this.data.kills === 1 && this.currentStage === 1) {
                this.advanceStage(); // Start killing ➜ mid progress
            } else if (
                this.data.kills >= this.data.requiredKills &&
                this.currentStage < this.stages.length - 1
            ) {
                this.advanceStage(); // Finish killing ➜ final stage
            }
        }
    }

    update(player, gameState) {
        super.update?.(player, gameState); // Always call base logic

        if (this.data.timeLimit && player.timeSystem.totalMinutes > this.data.timeLimit) {
            this.fail("Out of time");
        }
    }
}
