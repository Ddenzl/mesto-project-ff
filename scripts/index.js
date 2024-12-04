// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(data, deleteCardHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => { 
    deleteCardHandler(cardElement);
  });

  return cardElement;
}

function renderCards(cards) {
  cards.forEach(card => {
      const addCard = createCard(card, deleteCard);
      cardsContainer.append(addCard);
  });
}

renderCards(initialCards);
