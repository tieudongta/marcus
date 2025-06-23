import { showImage, showMessage } from "./infoPanel.mjs";
import { updateTopBar } from "./topBar.mjs";
import { updateDialog } from "./dialogBox.mjs";
import { renderActions } from "./actionBar.mjs";
export function renderUI(gameState) {
    updateTopBar(gameState.player);
    showImage(gameState.scene);
    showMessage(gameState.message);
    updateDialog(gameState.dialog);
    renderActions(gameState, gameState.player);
}