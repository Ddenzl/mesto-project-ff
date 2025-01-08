export { openModal, closeModal };

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("click", handleOverlayClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("click", handleOverlayClose);
}

function handleOverlayClose(evt) {
  evt.target === evt.currentTarget && closeModal(evt.currentTarget);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
