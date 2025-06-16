export class Activity {
  constructor({
    label, 
    duration, 
    effect = () => {},
    allowedPhases = null,
    requiredStats = {},
    locationRequired = null,
    onStart = () => {},
    onComplete = () => {},
    requiresItem = [],
    givesXP = {},
}) {
    this.label = label;
    this.duration = duration;
    this.effect = effect;
    this.allowedPhases = allowedPhases;
    this.requiredStats = requiredStats;
    this.locationRequired = locationRequired;
    this.requiresItem = Array.isArray(requiresItem) ? requiresItem : [requiresItem];
    this.givesXP = givesXP;
    this.onStart = onStart;
    this.onComplete = onComplete;
  }
  canPerform(character, timeSystem) {
    //Phase check 
    if(this.allowedPhases && !this.allowedPhases.includes(timeSystem.phase)) {
      return false;
    }
    //Stat check
    for (const stat in this.requiredStats) {
      if((character.stats[stat] || 0) < this.requiredStats[stat]) {
        return false;
      }
    }
    //Location check
    if (this.locationRequired && character.location !== this.locationRequired) {
      return false;
    }
    // Item check
    if (this.requiresItem.length) {
      const inventory = character.inventory || [];
      for (const item of this.requiresItem) {
        if(!inventory.includes(item)) return false;
      }
    }
    return true;
  }
  perform(character, timeSystem) {
    if (!this.canPerform(character, timeSystem)) {
      throw new Error(`Cannot perform activity: ${this.label}`);
    }
    if (this.onStart) 
    this.onStart(character);//Pre-action hook
    if (this.effect) this.effect(character);
    if (this.givesXP) {
      for (const skill in this.givesXP) {
        //character.skills[skill].xp???
        character.xp[skill] = (character.xp[skill] || 0) + this.givesXP[skill];
      }
    }
    if (timeSystem && typeof timeSystem.advance === "function") {
      timeSystem.advance(this.duration);
    }
    if (this.onComplete)
    this.onComplete(character); //Post-action hook
  }
}