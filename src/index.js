import { initialCards } from "./data/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import "./index.css";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const cardImage = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
const profileForm = editPopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// -------------------------------Коллбэки создания карточки-------------------------------------------
function showImage(image) {
  cardImage.src = image.src;
  cardImage.alt = image.alt;
  caption.textContent = image.alt;
  openModal(imagePopup);
}

// --------------------------------Добавление карточек-------------------------------------------------
function renderCards(cards) {
  cards.forEach((card) => {
    const addCard = createCard(card, deleteCard, toggleLike, showImage);
    cardsContainer.prepend(addCard);
  });
}

renderCards(initialCards);

// --------------------------------Кнопки открытия/закрытия попапов---------------------------------------
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener("click", () => openModal(newCardPopup));

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    closeModal(popup);
  });
});

// ----------------------------------Форма редакторования профиля-------------------------------------------
function handleEditProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closeModal(editPopup);
}

profileForm.addEventListener("submit", handleEditProfile);

// -----------------------------------Форма добавления новой карточки-------------------------------------------
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const placeName = cardNameInput.value;
  const imagelink = cardLinkInput.value;

  const newCardData = {
    name: placeName,
    link: imagelink,
  };

  const newCard = createCard(newCardData, deleteCard, toggleLike, showImage);
  cardsContainer.prepend(newCard);
  closeModal(newCardPopup);
  newCardForm.reset();
});
