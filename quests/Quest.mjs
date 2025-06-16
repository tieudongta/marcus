// quest.js
export class Quest {
    constructor({ id, name, description, stages }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stages = stages; // array of stage objects
        this.currentStage = 0; // index of current stage
        this.status = 'not_started'; // 'not_started', 'in_progress', 'completed', 'failed'
        this.data = {}; // for tracking progress like destination, item status, etc.
    }
    update(player, gameState) {

    }
    get progress() {
        return this.data?.progress ?? 0;
    }
    start() {
        this.status = 'in_progress';
        this.currentStage = 0;
        console.log(`Quest '${this.name}' started. Stage: ${this.getStage().name}`);
    }
    getStage() {
        return this.stages[this.currentStage];
    }

    advanceStage() {
        if (this.currentStage < this.stages.length - 1) {
            this.currentStage++;
            console.log(`Quest '${this.name}' advanced to stage: ${this.getStage().name}`);
        } else {
            this.status = 'completed';
            console.log(`Quest '${this.name}' is completed!`);
        }
    }

    failQuest(reason) {
        this.status = 'failed';
        console.log(`Quest '${this.name}' failed: ${reason}`);
    }
}
