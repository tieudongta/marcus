
export class Wallet {
    #balance;
    constructor(initial = 0, logger = null) {
        this.#balance = initial;
        this.logger = logger;
    }
    get balance() {
        return this.#balance;
    }
    add(amount) {
        if (amount < 0) throw new Error("Cannot add negative gold");
        this.#balance += amount;
        if (this.logger) this.logger(`Added ${amount} gold. New balance: ${this.#balance}g`);
    }
    spend(amount) {
        if (amount < 0) throw new Error("Cannot spend negative gold");
        if (this.#balance < amount) {
            this.logger?.("Not enough gold!");
            return false;
        }
        this.#balance -= amount;
        this.logger?.(`Spent ${amount} gold. Balance: ${this.#balance}`);
        return true;
    }
    has(amount) {
        return this.#balance >= amount;
    }
    toString() {
        return `${this.#balance}g`;
    }
    toJSON() {
        return { balance: this.#balance };
    }
}