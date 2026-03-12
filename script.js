const openButtons = document.querySelectorAll(".fancy-btn");
const overlays = document.querySelectorAll(".overlay");
const gate = document.getElementById("access-gate");
const gateForm = document.getElementById("gate-form");
const visitorNameInput = document.getElementById("visitor-name");
const enterButton = document.getElementById("enter-site");
const welcomeUser = document.getElementById("welcome-user");

let recaptchaValidated = false;

const closeAllPanels = () => {
  overlays.forEach((overlay) => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  });

  document.body.classList.remove("panel-open");

  if (!document.body.classList.contains("locked")) {
    document.body.style.overflow = "";
  }
};

const updateEnterButtonState = () => {
  const hasName = visitorNameInput.value.trim().length > 0;
  enterButton.disabled = !(hasName && recaptchaValidated);
};

window.onRecaptchaSuccess = () => {
  recaptchaValidated = true;
  updateEnterButtonState();
};

window.onRecaptchaExpired = () => {
  recaptchaValidated = false;
  updateEnterButtonState();
};

visitorNameInput.addEventListener("input", updateEnterButtonState);

gateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!recaptchaValidated || visitorNameInput.value.trim().length === 0) {
    return;
  }

  const visitorName = visitorNameInput.value.trim();
  welcomeUser.textContent = `Bonjour ${visitorName}`;
  welcomeUser.classList.add("visible");

  gate.classList.add("hidden");
  document.body.classList.remove("locked");
  document.body.style.overflow = "";
});

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gate.classList.contains("hidden")) return;

    closeAllPanels();
    const targetPanel = document.getElementById(button.dataset.panel);
    if (!targetPanel) return;

    targetPanel.classList.add("open");
    targetPanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-open");
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
