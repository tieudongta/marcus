import playerInstance from "../scripts/utils/playerInstance.mjs";
import { UI } from "./ui/UI.mjs";

export class Game {
    constructor() {
        this.player = playerInstance;
        this.day = this.player.timeSystem.day;
        this.ui = new UI(this);
    }
    start() {
        this.ui.update();
        this.ui.log("Welcome, survivor. Make your choices wisely.");
    }
    showMap() {
        this.player.travelSystem.showMap();
    }
    performAction(type) {
        const msg = this.player.performAction(type);
        this.ui.log(msg);
        this.ui.update();
    }
    nextDay() {
        this.day++;
        this.player.energy = this.player.maxEnergy;
        this.ui.update();
        this.ui.log(`<strong>Day ${this.day} begins.</strong>`)
    }
}