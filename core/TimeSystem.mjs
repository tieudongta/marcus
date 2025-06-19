export class TimeSystem {
    constructor() {
        this.totalMinutes = 480;
        this.subscribers = new Set();
        this.lastPhase = this.phase;
        this.phaseChangeCallback = null; // Rename to avoid collision
    }
    get currentTime() {
        return this.totalMinutes / 60;
    }
    get phase() {
        const minutesToday = this.totalMinutes % 1440;
        const hour = Math.floor(minutesToday / 60);
        if (hour >= 6 && hour < 12) return "Morning";
        if (hour >= 12 && hour < 18) return "Afternoon";
        if (hour >= 18 && hour < 22) return "Evening";
        return "Night";
    }
    advanceTime(hours = 0, minutes = 0) {
        const total = (hours * 60) + minutes;
        this.advance(total);
        return this.formatTime(total);
    }
    advance(minutes) {
        this.totalMinutes += minutes;
        const newPhase = this.phase;
        if (newPhase !== this.lastPhase) {
            if (typeof this.phaseChangeCallback === 'function') {
                this.phaseChangeCallback(this.lastPhase, newPhase);
            }
            this.lastPhase = newPhase;
        }
        this.notifySubscribers(minutes);
    }
    setOnPhaseChange(callback) {
        this.phaseChangeCallback = callback;
    }
    subscribe(subscriber) {
        if (
            typeof subscriber !== 'function' &&
            (typeof subscriber !== 'object' ||
                (typeof subscriber.onTimeTick !== 'function' &&
                    typeof subscriber.onPhaseChange !== 'function'))
        ) {
            console.warn("Invalid subscriber ignored:", subscriber);
            return;
        }
        this.subscribers.add(subscriber);
    }

    unsubscribe(callbackOrObject) {
        this.subscribers.delete(callbackOrObject);
    }
    notifySubscribers(minutesPassed) {
        for (const sub of this.subscribers) {
            if (typeof sub === 'function') {
                sub(minutesPassed, this.totalMinutes);
            }

            if (typeof sub?.onTimeTick === 'function') {
                sub.onTimeTick(minutesPassed, this.totalMinutes);
            }

            if (typeof sub?.onPhaseChange === 'function') {
                sub.onPhaseChange(this.phase);
            }
        }
    }


    get time() {
        const total = this.totalMinutes % (24 * 60);
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    get day() {
        return Math.floor(this.totalMinutes / (24 * 60) + 1);
    }
    get FullTime() {
        return `Day ${this.day}, ${this.time}`;
    }
    /**
   * Convert total minutes left to a friendly string, e.g. "0 day 2 h 30 m left"
   * @param {number} totalMinutesLeft 
   * @returns {string}
   */
    formatTimeLeft(totalMinutesLeft) {
        if (totalMinutesLeft <= 0) return "Time's up";

        const days = Math.floor(totalMinutesLeft / (24 * 60));
        const hours = Math.floor((totalMinutesLeft % (24 * 60)) / 60);
        const minutes = Math.floor(totalMinutesLeft % 60);

        const dayStr = days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : '';
        const hourStr = hours > 0 ? `${hours} h ` : '';
        const minuteStr = minutes > 0 ? `${minutes} m ` : '';

        return `${dayStr}${hourStr}${minuteStr}left`.trim();
    }
    /**
   * Convert total minutes to a friendly string, e.g. "2 h 30 m"
   * @param {number} totalMinutes 
   * @returns {string}
   */
    formatTime(totalMinutesLeft) {
        if (totalMinutesLeft <= 0) return "0 m";

        const hours = Math.floor((totalMinutesLeft % (24 * 60)) / 60);
        const minutes = Math.floor(totalMinutesLeft % 60);

        const hourStr = hours > 0 ? `${hours} h ` : '';
        const minuteStr = minutes > 0 ? `${minutes} m ` : '';
        return `${hourStr}${minuteStr}`.trim();
    }
}