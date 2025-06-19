
export class UI {
    constructor(game) {
        this.game = game;
        document.querySelector("#actions").addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const action = e.target.getAttribute("data-action");
                if (action) this.game.performAction(action);
                this.update(action);
            }
        });
        document.querySelector("#next-day-btn").addEventListener("click", () => {
            this.game.nextDay();
        });
    }
    update(action) {
        document.getElementById("day").textContent = this.game.day +" "+ this.game.player.timeSystem.phase;
        document.getElementById("energy").textContent = this.game.player.energy;
        document.getElementById("xp").textContent = this.game.player.xp;
        if (this.game.player.energy <= 0) {
            document.getElementById("actions").style.display = "none";
            document.getElementById("next-day-btn").style.display = "block";
        } else {
            if (action === "explore") {
                this.renderMap();
            }
             this.renderActions();
             document.getElementById("actions").style.display = "block";
             document.getElementById("next-day-btn").style.display = "none";
        }
    }
    renderMap() {
        const actionContainer = document.getElementById("actions");
        actionContainer.innerHTML = this.game.player.travelSystem.showMap();
    }
    renderActions() {
        const actionContainer = document.getElementById("actions");
        actionContainer.innerHTML = "";
        //Get available actions based on location, time of days, character level, 
        const availebleActions = this.game.player.getAvailableActions();
        console.log(availebleActions);
        availebleActions.forEach(action => {
            const btn = document.createElement('button');
            btn.dataset.action = action.name;
            btn.textContent = action.description;
            actionContainer.appendChild(btn);
        });
    }
    log(text) {
        const logBox = document.getElementById("log");
        logBox.innerHTML += `<p>${text}</p>`;
        logBox.scrollTop = logBox.scrollHeight;
    }
}