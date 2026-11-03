const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  });
}

const mascot = document.querySelector("#mascot");
const heroVisual = document.querySelector(".hero-visual");

if (mascot && heroVisual) {
  customElements.whenDefined("model-viewer").then(() => {
    const resetCamera = () => {
      mascot.cameraOrbit = "0deg 75deg 105%";
    };

    heroVisual.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;

      const bounds = heroVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const azimuth = (x - 0.5) * 36;
      const elevation = 75 + (0.5 - y) * 18;

      mascot.cameraOrbit = `${azimuth}deg ${elevation}deg 105%`;
    });

    heroVisual.addEventListener("pointerleave", resetCamera);
  });
}

const appDialog = document.querySelector("#app-dialog");

if (appDialog instanceof HTMLDialogElement) {
  document.querySelectorAll("[data-open-app-dialog]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      appDialog.showModal();
    });
  });

  appDialog.querySelector(".app-dialog-close")?.addEventListener("click", () => {
    appDialog.close();
  });

  appDialog.addEventListener("click", (event) => {
    if (event.target === appDialog) appDialog.close();
  });

  appDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      appDialog.close();
    }
  });
}


