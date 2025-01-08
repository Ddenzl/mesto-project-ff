const cardTemplate = document.querySelector("#card-template").content;

export function createCard(data, cbDeleteCard, cbToggleLike, cbShowImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  function handleDelete() {
    cbDeleteCard(cardElement)
  }

  function handleLike() {
    cbToggleLike(likeButton)
  }

  function handleShow() {
    cbShowImage(cardImage)
  }

  deleteButton.addEventListener("click", handleDelete);

  likeButton.addEventListener("click", handleLike);

  cardImage.addEventListener("click", handleShow);

  return cardElement;
}
