export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// ----------------------------------------Функция для показа ошибки ввода--------------------------------------------------------------
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  const inputElementBox = inputElement.getBoundingClientRect();
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.style.top = `${inputElementBox.bottom}px`;
  errorElement.style.left = `${inputElementBox.left}px`;
};
// -----------------------------------------Функция для скрытия ошибки ввода-------------------------------------------------------------
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};
// -----------------------------------------Функция для проверки валидности ввода-------------------------------------------------------------
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};
// ------------------------------------------Функция для установки слушателей событий------------------------------------------------------------
const setEventListeners = (formElement, validationConfig) => {
  const inputList = [...formElement.querySelectorAll(validationConfig.inputSelector)];
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};
// ------------------------------------------Функция для включения валидации форм------------------------------------------------------------
export const enableValidation = () => {
  const formList = [...document.querySelectorAll(validationConfig.formSelector)];
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
// --------------------------------------------Функция для проверки состояния кнопки отправки----------------------------------------------------------
const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

// ---------------------------------------------Функция для переключения состояния кнопки отправки----------------------------------------------------------
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};
// ---------------------------------------------Функция для очистки валидации-------------------------------------------------------------------------
export const clearValidation = (formElement) => {
  const inputList = [...formElement.querySelectorAll(validationConfig.inputSelector)];
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};
