export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popups = document.querySelectorAll('.popup');
  }

  _handleEscClose(evt) { //если нажат esc
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      this.close(openedPopup); 
    }
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  setEventListeners() {
    this._popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) { //если нажат оверлей
          this.close(popup)
        } else if (evt.target.classList.contains('popup__close')) { //если нажат крестик
          this.close(popup)
        }
      })
    })
  }
  
}