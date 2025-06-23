export function showInventory(items) {
    const modal = document.getElementById("inventory-modal");
    const content = document.getElementById("inventory-content");
    content.innerHTML = '';
    items.forEach(entry => {
        console.log(entry);
        const div = document.createElement('div');
        div.textContent =  `${entry.item.name} x ${entry.quantity}`;
        content.appendChild(div);
    });
    modal.classList.remove('hidden');
}
export function closeInventory() {
    document.getElementById('inventory-modal').classList.add("hidden");
}