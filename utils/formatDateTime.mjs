 /**
   * Convert total minutes left to a friendly string, e.g. "0 day 2 h 30 m left"
   * @param {number} totalMinutesLeft 
   * @returns {string}
   */
    export function formatTimeLeft(totalMinutesLeft) {
        if (totalMinutesLeft <= 0) return "Time's up";

        const days = Math.floor(totalMinutesLeft / (24 * 60));
        const hours = Math.floor((totalMinutesLeft % (24 * 60)) / 60);
        const minutes = Math.floor(totalMinutesLeft % 60);

        const dayStr = days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : '';
        const hourStr = hours > 0 ? `${hours} h ` : '';
        const minuteStr = minutes > 0 ? `${minutes} m ` : '';

        return `${dayStr}${hourStr}${minuteStr}left`.trim();
    }