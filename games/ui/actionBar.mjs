import { renderUI } from "./uiManager.mjs";

export function renderActions(gameState) {
    const { actions, player } = gameState;
    const container = document.querySelector("#action-buttons");
    container.innerHTML = '';
    actions.forEach(({ name }) => {
        const btn = document.createElement("button");
        btn.textContent = name;
        btn.onclick = () => {
            gameState.message = player.performAction(name);
            gameState.actions = player.getAvailableActions();
            gameState.scene = player.currentLocation.src;
            renderUI(gameState); // ← now correct!
        };
        container.appendChild(btn);
    });
}
