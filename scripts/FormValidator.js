export class FormValidator {
  constructor(parameters, formElement) {
    this._inputSelector = parameters.inputSelector;
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inactiveButtonClass = parameters.inactiveButtonClass;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isFieldValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((field) => {
      return !field.validity.valid; // Если поле не валидно, колбэк вернёт true, Обход массива прекратится и вся функция вернёт true
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "disabled");
    }
  }

  _isFieldValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Подсветить ошибку ввода
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //Скрыть ошибку
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }
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