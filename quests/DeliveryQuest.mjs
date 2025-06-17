import { Quest } from "./Quest.mjs";

export class DeliveryQuest extends Quest {
    constructor(config) {
        super(config);
        this.data.from = config.from;
        this.data.to = config.to;
        this.data.arrived = false;
    }
    validate(player) {
        if (!this.target.item) {
            console.warn("⚠ Quest target item is undefined.");
            return false;
        }
        const onTime = this.validateTime(player);
        const hasItem = player.inventory.hasItem(this.target.item);
        const atLocation = player.currentLocation === this.target.location;
        return {
            isValid: onTime,
            isComplete: onTime && hasItem && atLocation,
            details: {
                onTime,
                hasItem,
                atLocation
            }
        }
    }
    update(player, gameState) {
        if (this.status !== 'in_progress') return;
        if (player.currentLocation === this.data.to && !this.data.arrived) {
            this.data.arrived = true;
            this.advanceStage();
        }
    }
}