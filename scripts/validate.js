const settings = {
    formSelector: '.popup__content',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field_error_active'
  }

/* //Сброс ошибки (при открытии попапа)
function resetSpan (popupElement) {
  const spanlist = Array.from(popupElement.querySelectorAll('.popup__field-error'));

  spanlist.forEach((spanInput) => {
    spanInput.textContent = '';
  });
}

//Сброс подсветки красной линии инпута (при открытии попапа)
function resetRedLine (popupElement) {
  const inputlist = Array.from(popupElement.querySelectorAll('.popup__field'));

  inputlist.forEach((input) => {
    input.classList.remove('popup__field_type_error');
  });
}*/
  
  //Подсветить ошибку ввода
  const showInputError = (formElement, inputElement, errorMessage, parameters) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parameters.errorClass);
  };
  
  //Скрыть ошибку
  const hideInputError = (formElement, inputElement, parameters) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorClass);
    errorElement.textContent = '';
  };
  
  //Проверка каждого поля на валидность для сабмита
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }; 
  
  //Переключатель кнопки сабмит
  const toggleButtonState = (inputList, buttonElement, parameters) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(parameters.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(parameters.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "disabled");
    }
  }; 
  
  // Функция, проверяющая валидность инпута
  const isFieldValid = (formElement, inputElement, parameters) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
    } else {
      hideInputError(formElement, inputElement, parameters);
    }
  };
  
  //Валидация для всех инпутов
  const setEventListeners = (formElement, parameters) => {
    const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
    const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, parameters);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isFieldValid(formElement, inputElement, parameters);
        toggleButtonState(inputList, buttonElement, parameters);
      });
    });
  };
  
  //Валидация для всех форм
  const enableValidation = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, parameters);
    });
  };
  
  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове
  enableValidation(settings); 