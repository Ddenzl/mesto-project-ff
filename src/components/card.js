
const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(cardElement) {
  cardElement.remove();
}
export function setLike(likeButton, likeCounter, count) {
  likeButton.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = count;  
}

export function createCard(data, cbHandleDeleteCard, cbCardLike, cbShowImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length;

  hasLikeCard(data.likes, userId) &&
    setLike(likeButton, likeCounter, data.likes.length)

  !isMyCard(data, userId) && deleteButton.remove();

  deleteButton.addEventListener("click", () => {
    cbHandleDeleteCard(cardElement, data._id);
  });

  likeButton.addEventListener("click", () => {
    cbCardLike(likeButton, likeCounter, data._id);
  });

  cardImage.addEventListener("click", () => {
    cbShowImage(cardImage);
  });

  return cardElement;
}

function hasLikeCard(likes, userId) {
  return likes.some((like) => like._id === userId);
}

function isMyCard(data, userId) {
 return data.owner._id === userId;
}
