import * as api from "./components/api.js";
import { createCard, deleteCard, setLike } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { openModal, closeModal } from "./components/modal.js";
import { renderLoading } from "./components/render-loading.js";
import { setUser, userInfo } from "./components/user-info.js";
import "./index.css";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editAvatarPopup = document.querySelector(".popup_type_edit_avatar");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const cardImage = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
const profileForm = editPopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(".popup__input_type_description");
const editProfileImage = document.querySelector(".profile__image-edit-icon");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const submitButtonEditProfile = profileForm.querySelector(".popup__button");
const submitButtonNewCard = newCardForm.querySelector(".popup__button");
const submitButtonEditAvatar = editAvatarForm.querySelector(".popup__button");

// -------------------------------Открытие изображения карточки-------------------------------------------
function showImage(image) {
  cardImage.src = image.src;
  cardImage.alt = image.alt;
  caption.textContent = image.alt;
  openModal(imagePopup);
}

// --------------------------------Добавление карточек-------------------------------------------------
function renderCard(card, method = "prepend") {
  cardsContainer[method](card);
}

// --------------------------------Кнопки открытия/закрытия попапов---------------------------------------
profileEditButton.addEventListener("click", () => {
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.about;
  openModal(editPopup);
  clearValidation(profileForm);
});

addButton.addEventListener("click", () => {
  openModal(newCardPopup);
  clearValidation(newCardForm);
});
editProfileImage.addEventListener("click", () => {
  openModal(editAvatarPopup);
  clearValidation(editAvatarPopup);
});

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    closeModal(popup);
  });
});

// ----------------------------------Форма редакторования профиля-------------------------------------------
function handleEditProfile(evt) {
  evt.preventDefault();

  setButtonTextEditProfile(true, "Сохранение...");

  api
    .updateProfile(nameInput.value, descriptionInput.value)
    .then((userData) => {
      setUser(userData);

      closeModal(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      setButtonTextEditProfile(false);
    });
}

const setButtonTextEditProfile = renderLoading(submitButtonEditProfile);
profileForm.addEventListener("submit", handleEditProfile);
// ----------------------------------Форма редакторования аватара-------------------------------------------
function handleEditAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = editAvatarForm.querySelector(".popup__input_type_url").value;

  setButtonTextEditAvatar(true, "Сохранение...");

  api
    .updateAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(editAvatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      setButtonTextEditAvatar(false);
    });
}

const setButtonTextEditAvatar = renderLoading(submitButtonEditAvatar);
editAvatarForm.addEventListener("submit", handleEditAvatar);
// -----------------------------------Форма добавления новой карточки-------------------------------------------
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  setButtonTextNewCard(true, "Сохранение...");

  const placeName = cardNameInput.value;
  const imagelink = cardLinkInput.value;

  const newCardData = {
    name: placeName,
    link: imagelink,
  };

  api
    .addCardToServer(newCardData)
    .then((card) => {
      const newCard = createCard(cardData, handleDeleteCard, cardLike, showImage, userData._id);
      renderCard(newCard);
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      setButtonTextNewCard(false);
    });
});

const setButtonTextNewCard = renderLoading(submitButtonNewCard);
// --------------------------------------Валидация форм------------------------------------------------------------
enableValidation();

// --------------------------------------Функция лайка карточки-------------------------------------------
function cardLike(likeButton, likeCounter, cardID) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    api.unlikeCard(cardID).then((cardData) => {
      setLike(likeButton, likeCounter, cardData.likes.length);
    });
  } else {
    api.likeCard(cardID).then((cardData) => {
      setLike(likeButton, likeCounter, cardData.likes.length);
    });
  }
}
// ----------------------------------------Удаление карточки с сервера----------------------------------------------------------------------
function handleDeleteCard(cardElement, cardID) {
  api.deleteCardFromServer(cardID)
  .then(() => {
    deleteCard(cardElement);
  })
}
// -----------------------------------------Загрузка карточек с сервера-------------------------------------------
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    setUser(userData);

    cards.forEach((cardData) => {
      const card = createCard(cardData, handleDeleteCard, cardLike, showImage, userData._id);
      renderCard(card, "append");
    });
  })
  .catch((error) => {
    console.log(error);
  });
