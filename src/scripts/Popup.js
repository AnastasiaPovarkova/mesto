export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this) // привязали 1 раз
  }

  _handleEscClose(evt) { //если нажат esc
    if (evt.key === 'Escape') {
      this.close(); 
    }
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) { //если нажат оверлей
        this.close()
      } else if (evt.target.classList.contains('popup__close')) { //если нажат крестик
        this.close()
      }
    })
  }
  
}