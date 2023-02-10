export default class Card {

    constructor(data, templateSelector, handleCardClick, handleTrashClick, myData, handleLikeCard, handleUnLikeCard) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._cardId = data._id;
      this._owner = data.owner._id;
      this._myProfileId = myData._id;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleTrashClick = handleTrashClick;
      this._handleLikeCard = handleLikeCard;
      this._handleUnLikeCard = handleUnLikeCard;
    }
  
    _getTemplate() {
      const templateClone = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

      return templateClone;  // вернём DOM-элемент карточки
    }
  
    generateCard() {
      this._element = this._getTemplate(); // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
      this._cardImage = this._element.querySelector('.element__image');
      this._likeButton = this._element.querySelector('.element__like');
      this._likesCount = this._element.querySelector('.element__count');
      this._setEventListeners();
    
      this._element.querySelector('.element__text').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._likesCount.textContent = this._likes.length;
    
      if (this._owner === this._myProfileId) {
        console.log('Моя карточка');
      } else {
        this._element.querySelector('.element__trash').remove();
      }

      this._likes.forEach((like) => {
        if (like._id === this._myProfileId) {
          this._likeButton.classList.add('element__like_liked')
        } 
      })

      return this._element // Вернём элемент наружу
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeToggle();
      });
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._handleTrashClick(this._element.closest('.element'), this._cardId);
      });
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    _isCardLikedByMe() {
      return this._likes.some(like => like._id === this._myProfileId);
    }
  
    _likeToggle() {
      if (this._isCardLikedByMe()) {
        this._handleUnLikeCard(this._cardId, this._likesCount)
      } else {
        this._handleLikeCard(this._cardId, this._likesCount)
      }
    }

    likeCardInDom = () => {
      this._likeButton.classList.add('element__like_liked');
    }

    dislikeCardInDom = () => {
      this._likeButton.classList.remove('element__like_liked');
    }

}