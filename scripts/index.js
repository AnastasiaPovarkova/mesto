//------CONSTS

const popupElementEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAddCard = document.querySelector('.popup_add-card');
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__close');
const popupCloseButtonElementAddCard = popupElementAddCard.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupElementOpenImage = document.querySelector('.popup_open-card');
const popupCloseButtonElementOpenImage = popupElementOpenImage.querySelector('.popup__close');

const formElementEditProfile = popupElementEditProfile.querySelector('.popup__content');
const nameInput = formElementEditProfile.querySelector('.popup__field_input_name');
const jobInput = formElementEditProfile.querySelector('.popup__field_input_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const cardContainer = document.querySelector('.elements');
//const popupElementImage = popupElementOpenImage.querySelector('.popup__image');
//const popupElementText = popupElementOpenImage.querySelector('.popup__text');

const formElementAddCard = popupElementAddCard.querySelector('.popup__content');
const cardInput = formElementAddCard.querySelector('.popup__field_input_card');
const linkInput = formElementAddCard.querySelector('.popup__field_input_link');
const addCardPopupSubmitButton = formElementAddCard.querySelector('.popup__submit');

const cardTemplate = document.querySelector('#element-template').content;

const allPopups = document.querySelectorAll('.popup');


//CLASSES

class Card {

  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateClone = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
  // вернём DOM-элемент карточки
    return templateClone;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); //обработчики
  
    // Добавим данные
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
  
    // Вернём элемент наружу
    return this._element;
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
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._name;
    document.querySelector('.popup__text').textContent = this._name;
    const openCard = document.querySelector('.popup_open-card');
    openPopup(openCard);
  }

}

//-------FUNCTIONS

//close popup if press Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup); 
  }
}

//OPEN POPUP
function openPopup(item) {
  item.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

//CLOSE POPUP
function closePopup(item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

//LIKING
/*function likeToggle (evt) {
  evt.target.classList.toggle('element__like_liked');
}*/

//DELETE CARD
/*function deleteCard (evt) {
  const card = evt.target.closest('.element');
  card.remove();
}; */

//ADD LINK AND NAME TO IMAGE
/*function handleOpenImage (link, cardName) {
  popupElementImage.src = link;
  popupElementImage.alt = cardName;
  popupElementText.textContent = cardName;
  openPopup(popupElementOpenImage);
}*/

//CREATE CARD
/*function createCard(cardName, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementText = cardElement.querySelector('.element__text');
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementText.textContent = cardName;
  cardElementImage.src = link;
  cardElementImage.alt = cardName;

  cardElement.querySelector('.element__like').addEventListener('click', likeToggle);
  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__image').addEventListener('click', function(){
    handleOpenImage(link, cardName);
  });

  return cardElement;
};*/

//ADD CARD
/*function addCard(container, card) {
  container.prepend(card);
}*/

//WRITE NAME AND JOB TO PROFILE
function writeNameAndJobToProfile () {
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
}

//WRITE NAME AND JOB TO FORM
function writeNameAndJobToForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}



//------POPUP SUBMIT

// Обработчик отправки формы профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
  writeNameAndJobToProfile();
  closePopup(popupElementEditProfile);
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit (evt) {
  evt.preventDefault(); 
  const card = new Card(cardInput.value, linkInput.value, '#element-template');
  const myCardElement = card.generateCard();
  cardContainer.prepend(myCardElement);
  //addCard(cardContainer, createCard(cardInput.value, linkInput.value));
  closePopup(popupElementAddCard);
}


//-------EVENT LISTENERS

//first cards
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#element-template'); // Создадим экземпляр карточки
  const myCardElement = card.generateCard(); // Создаём карточку и возвращаем наружу
  cardContainer.prepend(myCardElement);

  //addCard(cardContainer, createCard(item.name, item.link));
});

//open popups
popupOpenButtonElement.addEventListener('click', function() {
  openPopup(popupElementEditProfile);
  writeNameAndJobToForm();
  //resetSpan(popupElementEditProfile);
  //resetRedLine(popupElementEditProfile);
});

popupAddButtonElement.addEventListener('click', function() {
  openPopup(popupElementAddCard);
  formElementAddCard.reset(); 
  //resetSpan(popupElementAddCard);
  //resetRedLine(popupElementAddCard);
  addCardPopupSubmitButton.classList.add('popup__submit_inactive');
  addCardPopupSubmitButton.setAttribute("disabled", "disabled");
});

//close popups
popupCloseButtonElementEditProfile.addEventListener('click', function(){closePopup(popupElementEditProfile)});
popupCloseButtonElementAddCard.addEventListener('click', function(){closePopup(popupElementAddCard)});
popupCloseButtonElementOpenImage.addEventListener('click', function(){closePopup(popupElementOpenImage)})

//submit listener
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit); 
formElementAddCard.addEventListener('submit', handleAddFormSubmit); 


//close popup if click on overlay
allPopups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

