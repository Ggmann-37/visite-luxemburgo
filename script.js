const openButtons = document.querySelectorAll(".fancy-btn");
const overlays = document.querySelectorAll(".overlay");

const closeAllPanels = () => {
  overlays.forEach((overlay) => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  });
  document.body.style.overflow = "";
};

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeAllPanels();
    const targetPanel = document.getElementById(button.dataset.panel);
    if (!targetPanel) return;

    targetPanel.classList.add("open");
    targetPanel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", closeAllPanels);
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeAllPanels();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPanels();
  }
});
