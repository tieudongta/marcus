import { Quest } from "./Quest.mjs";

export class KillQuest extends Quest {
    constructor(config) {
        super(config);
        this.data.kills = 0;
        this.data.requiredKills = config.requiredKills;
    }
    onEnemyKilled(enemy) {
        if (this.status !== 'in_progress') return;
        this.kills++;
        if (this.data.kills >= this.data.requiredKills) {
            this.advanceStage();
        }
    }
    update(player, gameState) {
        if (gameState.timePassed > this.data.timeLimit) {
            this.failQuest("Out of time");
        }
    }
}