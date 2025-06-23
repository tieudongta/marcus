// Core Game logic

import { Game } from './Game.mjs';

// Modals
import { showPlayerInfo, closePlayerInfo } from './ui/modals/playerDetails.mjs';
import { showInventory, closeInventory } from './ui/modals/inventoryDetails.mjs';
import { renderUI } from './ui/uiManager.mjs';
// Initialize game
const game = new Game();

// Initial UI Render
renderUI(game);

// Event listeners for modals
document.getElementById('show-details').addEventListener('click', () => {
  showPlayerInfo(game.player);
});
document.getElementById('close-details').addEventListener('click', () => {
  closePlayerInfo();
});

// Example: open inventory
document.getElementById('open-inventory')?.addEventListener('click', () => {
  showInventory(game.player.inventory.items);
});
document.getElementById('close-inventory').addEventListener('click', () => {
  closeInventory();
});
