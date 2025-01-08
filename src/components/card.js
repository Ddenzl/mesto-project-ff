const cardTemplate = document.querySelector("#card-template").content;

export function createCard(data, deleteCardHandler, likeHendler, imageClickHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => {
    deleteCardHandler(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeHendler(likeButton);
  });

  cardImage.addEventListener("click", () => {
    imageClickHandler(cardImage);
  });

  return cardElement;
}
