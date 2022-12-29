class FormValidator {
  constructor(parameters) {
    this._inactiveButtonClass = parameters.inactiveButtonClass;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
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


export class ProfileFormValidator extends FormValidator {
  constructor(settings) {
    super(settings);
    this._formElement = document.querySelector('#popup__profile-content');
    this._buttonElement = this._formElement.querySelector('.popup__submit');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__field'));
  }

  resetValidation() {
    this._toggleButtonState();// управляем кнопкой 
    
    this._inputList.forEach((item) => {
      this._hideInputError(item) // очищаем ошибки 
    });
  }
}


export class CardFormValidator extends FormValidator {
  constructor(settings) {
    super(settings);
    this._formElement = document.querySelector('#popup__card-content');
    this._buttonElement = this._formElement.querySelector('.popup__submit');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__field'));
  }

  resetValidation() {
    this._toggleButtonState();// управляем кнопкой 
    
    this._inputList.forEach((item) => {
      this._hideInputError(item)// очищаем ошибки 
    });
  }
}