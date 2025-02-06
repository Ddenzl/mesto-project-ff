const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-31";
const HEADERS = {
  headers: {
    authorization: "019e960c-23b5-40ce-b253-f53234c15865",
    "Content-Type": "application/json",
  },
};
// -----------------------Общая функция для выполнения запросов------------------------------------------------------------------
const checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res.status);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

// -----------------------Получения данных пользователя------------------------------------------------------------------
export const getUserData = () => {
  return request("/users/me", {
    method: "GET",
    ...HEADERS,
  })
};

// ------------------------Получения карточек-----------------------------------------------------------------
export const getCards = () => {
  return request("/cards", {
    method: "GET",
    ...HEADERS,
  });
};

// -------------------------Обновления профиля----------------------------------------------------------------
export const updateProfile = (name, about) => {
  return request("/users/me", {
    method: "PATCH",
    headers: HEADERS.headers,
    body: JSON.stringify({ name, about }),
  });
};

// --------------------------Добавления карточки на сервер---------------------------------------------------------------
export const addCardToServer = (cardData) => {
  return request("/cards", {
    method: "POST",
    headers: HEADERS.headers,
    body: JSON.stringify(cardData),
  });
};

// ---------------------------Удаления карточки с сервера--------------------------------------------------------------
export const deleteCardFromServer = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: HEADERS.headers,
  });
};

// -----------------------------Добавления лайка-----------------------------------------------------------------------------------------
export const likeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: HEADERS.headers,
  });
};

// -------------------------------Удаления лайка---------------------------------------------------------------------------------------
export const unlikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: HEADERS.headers,
  });
};

// -------------------------------Обновления аватара---------------------------------------------------------------------------------------
export const updateAvatar = (avatarUrl) => {
  return request("/users/me/avatar", {
    method: "PATCH",
    headers: HEADERS.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  });
};
