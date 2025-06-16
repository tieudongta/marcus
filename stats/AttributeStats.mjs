import { BaseStats } from './BaseStats.mjs';

export class AttributeStats extends BaseStats {
  constructor(config = {}) {
    super(config);
  }
  onLevelUp(level) {
    super.onLevelUp(level);
  }
}