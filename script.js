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

