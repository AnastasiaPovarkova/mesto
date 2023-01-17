import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = popupSelector.querySelector('.popup__content');
  }

  _getInputValues() { //собирает данные всех полей формы
    this._inputList = this._popupSelector.querySelectorAll('.popup__field'); // достаём все элементы полей
    this._formValues = {};
    
    // добавляем в объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._formValues);
    this.close();
  }

  close() {
    this._formElement.reset;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => this._submit(evt)); 
  }
}