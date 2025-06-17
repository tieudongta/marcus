import chalk from "chalk";

export class Quest {
  constructor({ id, name, description, stages = [], target = {} }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stages = stages;
    this.currentStage = 0;
    this.status = 'not_started'; // 'not_started' | 'in_progress' | 'completed' | 'failed'
    this.data = {};
    this.target = target;
  }

  start() {
    if (this.status !== 'not_started') {
      console.warn(`⚠ Quest "${this.name}" already started or finished.`);
      return;
    }

    this.status = 'in_progress';
    this.currentStage = 0;
    console.log(chalk.magenta(`🚀 Quest '${this.name}' started. Stage: "${this.getStage()?.name}"`));
  }

  getStage() {
    return this.stages[this.currentStage] ?? null;
  }

  advanceStage() {
    if (this.currentStage < this.stages.length - 1) {
      this.currentStage++;
      console.log(chalk.magenta(`➡ Quest '${this.name}' advanced to stage: "${this.getStage()?.name}"`));
    } else {
      this.status = 'completed';
      console.log(chalk.magenta(`🏁 Quest '${this.name}' completed!`));
    }
  }

  fail(reason = 'Unknown reason') {
    this.status = 'failed';
    console.log(chalk.blueBright(`❌ Quest '${this.name}' failed: ${reason}`));
  }

  evaluateQuestStatus(validationResult) {
    if (!validationResult?.isValid) {
      return {
        status: 'expired',
        message: 'Quest has expired or is no longer valid.',
      };
    }

    if (validationResult.isComplete) {
      return {
        status: 'complete',
        message: 'Quest objectives completed successfully!',
      };
    }

    return {
      status: 'in_progress',
      message: 'Quest is still active but incomplete.',
      details: validationResult.details,
    };
  }

  validateTime(player) {
    const targetTimeLimit = this.target?.time ?? this.target?.timeOffset * 60;
    return player.timeSystem.totalMinutes <= targetTimeLimit;
  }

  get progress() {
    return this.data?.progress ?? 0;
  }

  update(player, gameState) {
    // Default behavior: attempt to auto-advance if a custom `validateStage` is defined
    const stage = this.getStage();
    if (this.status !== 'in_progress' || !stage) return;

    if (typeof this.validateStage === 'function' && this.validateStage(player, gameState, stage)) {
      this.advanceStage();
    }
  }
}
