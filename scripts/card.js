export class Card {

    constructor(name, link, templateSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const templateClone = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      
      return templateClone;  // вернём DOM-элемент карточки
    }
  
    generateCard() {
      this._element = this._getTemplate(); // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
      this._cardImage = this._element.querySelector('.element__image');
      this._likeButton = this._element.querySelector('.element__like');
      this._setEventListeners();
    
      this._element.querySelector('.element__text').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
    
      return this._element; // Вернём элемент наружу
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeToggle();
      });
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard();
      });
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
  
    _likeToggle() {
      this._likeButton.classList.toggle('element__like_liked');
    }
  
    _deleteCard() {
      this._element.closest('.element').remove();
    }
}