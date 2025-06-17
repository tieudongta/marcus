import { Quest } from './Quest.mjs';

export class DeliveryQuest extends Quest {
  constructor(config) {
    super(config);
    this.data.from = config.from ?? 'unknown';
    this.data.to = config.to ?? config.target?.location ?? 'unknown';
    this.data.arrived = false;
    this.data.itemDelivered = false;
  }

  validate(player) {
    const item = this.target?.item;
    const location = this.target?.location;

    if (!item || !location) {
      console.warn("⚠ Delivery quest target item or location is undefined.");
      return { isValid: false, isComplete: false, details: {} };
    }

    const onTime = this.validateTime(player);
    const hasItem = player.inventory?.hasItem?.(item);
    const atLocation = player.currentLocation === location;

    return {
      isValid: onTime,
      isComplete: onTime && hasItem && atLocation,
      details: { onTime, hasItem, atLocation },
    };
  }
  validateStage(player, gameState, stage) {
    const stageName = stage?.name.toLowerCase();

    switch (stageName) {
      case 'receive quest':
        return true; // Always auto-progress after start

      case 'travel to destination':
        return player.currentLocation === this.data.to;

      case 'deliver package':
        if (
          player.currentLocation === this.data.to &&
          player.inventory?.hasItem?.(this.target.item)
        ) {
          player.inventory.removeItem(this.target.item);
          this.data.itemDelivered = true;
          return true;
        }
        return false;

      case 'complete quest':
        return this.data.itemDelivered;

      default:
        return false;
    }
  }
  update(player, gameState) {
    if (this.status !== 'in_progress') return;
    super.update(player, gameState);
  }
}
