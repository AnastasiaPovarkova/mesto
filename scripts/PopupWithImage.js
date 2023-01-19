import { popupElementImage, popupElementText } from './constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageName, imageLink) {
    super(popupSelector);
    this._imageName = imageName;
    this._imageLink = imageLink;
  }

  open() {
    popupElementImage.src = this._imageLink;//устанавливаем ссылку
    popupElementImage.alt = this._imageName;
    popupElementText.textContent = this._imageName;//устанавливаем подпись картинке
    super.open();
  }

}