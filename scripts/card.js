import { popupCardOpen, image, text } from './index.js';
import { openPopup } from './index.js';

export class Card {

    constructor(name, link, templateSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._image = image;
      this._text = text;
      this._popupCardOpen = popupCardOpen;
    }
  
    _getTemplate() {
      const templateClone = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return templateClone;  // вернём DOM-элемент карточки
    }
  
    generateCard() {
      this._element = this._getTemplate(); // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
      this._setEventListeners(); //обработчики
    
      this._element.querySelector('.element__text').textContent = this._name;
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
    
      return this._element; // Вернём элемент наружу
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like').addEventListener('click', () => {
        this._likeToggle();
      });
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard();
      });
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleOpenImage();
      });
    }
  
    _likeToggle() {
      this._element.querySelector('.element__like').classList.toggle('element__like_liked');
    }
  
    _deleteCard() {
      this._element.closest('.element').remove();
    }
  
    _handleOpenImage() {
      this._image.src = this._link;
      this._image.alt = this._name;
      this._text.textContent = this._name;
      openPopup(this._popupCardOpen);
    }
  
}

