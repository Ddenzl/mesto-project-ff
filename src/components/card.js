const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

export function createCard(data, cbCardDel, cbCardLike, cbShowImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", () => {
    cbCardDel(cardElement);
  });

  likeButton.addEventListener("click", () => {
    cbCardLike(likeButton);
  });

  cardImage.addEventListener("click", () => {
    cbShowImage(cardImage);
  });

  return cardElement;
}
