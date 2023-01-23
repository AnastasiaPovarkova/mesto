import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupElementImage, popupElementText) {
    super(popupSelector);
    this._popupElementImage = popupElementImage;
    this._popupElementText = popupElementText;
  }

  open(imageName, imageLink) {
    this._imageName = imageName;
    this._imageLink = imageLink;
    this._popupElementImage.src = this._imageLink;//устанавливаем ссылку
    this._popupElementImage.alt = this._imageName;
    this._popupElementText.textContent = this._imageName;//устанавливаем подпись картинке
    super.open();
  }

}