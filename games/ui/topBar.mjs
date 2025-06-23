export function updateTopBar(player) {
    document.querySelector("#game-time").textContent = `Day: ${player.timeSystem.day} - ${player.timeSystem.phase}`;
    document.querySelector("#player-status").textContent = `Energy: ${Math.floor(player.energy)}/${player.maxEnergy}`;
}