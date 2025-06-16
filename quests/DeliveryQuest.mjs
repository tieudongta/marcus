import { Quest } from "./Quest.mjs";

export class DeliveryQuest extends Quest {
    constructor(config) {
        super(config);
        this.data.from = config.from;
        this.data.to = config.to;
        this.data.arrived = false;
    }
    update(player, gameState) {
        if (this.status !== 'in_progress') return;
        if (player.currentLocation === this.data.to && !this.data.arrived) {
            this.data.arrived = true;
            this.advanceStage();
        }
    }
}