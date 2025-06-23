import playerInstance from "../scripts/utils/playerInstance.mjs";

export class Game {
    constructor() {
        this.player = playerInstance;
        this.day = this.player.timeSystem.day;
        this.scene = this.player.currentLocation.src;
        this.message = "Welcome, survivor.";
        this.actions = this.player.getAvailableActions();
    }
    showMap() {
        this.player.travelSystem.showMap();
    }
}