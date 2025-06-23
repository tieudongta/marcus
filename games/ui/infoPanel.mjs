export function showImage(src) {
  const panel = document.querySelector("#info-panel");
  panel.style.backgroundImage = `url('${src}')`;
}
export function showMessage(text) {
    document.querySelector("#game-message").textContent = text;
}