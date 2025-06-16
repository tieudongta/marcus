class ScheduledActivity {
  constructor(activity, startTime) {
    this.activity = activity;
    this.startTime = startTime;
    this.started = false;
  }
}

export class ActivityQueue {
  constructor(character) {
    this.character = character;
    this.queue = [];
  }

  schedule(activity, startTime) {
    this.queue.push(new ScheduledActivity(activity, startTime));
    this.queue.sort((a, b) => a.startTime - b.startTime);
  }

  process(currentTime, timeSystem) {
    for (const task of this.queue) {
      if (!task.started && task.startTime <= currentTime) {
        if (task.activity.canPerform(this.character, timeSystem)) {
          task.started = true;
          task.activity.perform(this.character, timeSystem);
        }
      }
    }

    this.queue = this.queue.filter(task => !task.started);
  }

  clear() {
    this.queue = [];
  }

  getUpcoming() {
    return [...this.queue];
  }
}
