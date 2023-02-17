import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__content');
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit();
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => this._submit(evt)); 
  }

  setSubmitConfirmation(callback) {
    this._handleFormSubmit = callback;
  }

}