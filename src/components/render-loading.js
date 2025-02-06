// ----------------------------------Функция для изменения текста кнопки---------------------------------
export function renderLoading(button) {
    const buttonText = button.textContent;
    return function (isLoading, initialText) {
      if (isLoading) {
        button.textContent = initialText;
      } else {
        button.textContent = buttonText;
      }
    };
  }