export function showPlayerInfo(player) {
    const modal = document.getElementById("player-modal");
    const content = document.getElementById("player-detail-content");
    content.innerHTML = `
    <p>Lv: ${player.level}</p>
    <p>XP: ${player.xp}/${player.xpToNextLevel(player.level)}</p>
    <p>HP: ${player.health}/${player.maxHealth}</p>
    <p>Energy: ${player.energy}/${player.maxEnergy}</p>
    <p>Gold: ${player.gold} g</p>

    `;
    modal.classList.remove('hidden');
}
export function closePlayerInfo() {
    document.getElementById('player-modal').classList.add("hidden");
}