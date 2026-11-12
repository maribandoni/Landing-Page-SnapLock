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

const heroVisual = document.querySelector(".hero-visual");
const mascot = heroVisual?.querySelector(".mascot");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (
  heroVisual &&
  mascot instanceof HTMLImageElement
) {
  let animationFrame = 0;

  heroVisual.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const bounds = heroVisual.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    const movementScale = prefersReducedMotion.matches ? 0.35 : 1;

    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      mascot.style.setProperty("--pointer-x", `${pointerX * 12 * movementScale}px`);
      mascot.style.setProperty("--pointer-y", `${pointerY * 8 * movementScale}px`);
      mascot.style.setProperty("--pointer-tilt", `${prefersReducedMotion.matches ? 0 : pointerX * 5}deg`);
    });
  });

  heroVisual.addEventListener("pointerleave", () => {
    cancelAnimationFrame(animationFrame);
    mascot.style.removeProperty("--pointer-x");
    mascot.style.removeProperty("--pointer-y");
    mascot.style.removeProperty("--pointer-tilt");
  });
}

