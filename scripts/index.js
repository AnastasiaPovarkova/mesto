import { settings, popupElementEditProfile, popupElementAddCard, popupOpenButtonElement, 
  popupAddButtonElement, popupElementOpenImage, nameInput, jobInput } from './constants.js'
import { initialCards } from './initial-сards.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';

import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


//Listeners 
const popupWithEditForm = new PopupWithForm(popupElementEditProfile, handleProfileFormSubmit);
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm(popupElementAddCard, handleAddFormSubmit);
popupWithAddForm.setEventListeners();

//open photocard
function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupElementOpenImage, name, link);
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit () {
  const userInfo = new UserInfo(nameInput, jobInput); 
  userInfo.setUserInfo(); //writeNameAndJobToProfile
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit (cardInfo) {
  const newCard = new Section({ 
    items: cardInfo,
    renderer: () => {},
    }, '.elements');
  const card = new Card(cardInfo, '#element-template', handleCardClick);
  const myCardElement = card.generateCard();
  newCard.addItem(myCardElement);
}

//open profile popup
popupOpenButtonElement.addEventListener('click', function() {
  const popupWithForm = new PopupWithForm(popupElementEditProfile, handleProfileFormSubmit);
  popupWithForm.open();
  const userInfo = new UserInfo(nameInput, jobInput); 
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().profession;
  formValidators['popup__profile-content'].resetValidation();
});

//open card popup
popupAddButtonElement.addEventListener('click', function() {
  const popupWithForm = new PopupWithForm(popupElementAddCard, handleAddFormSubmit);
  popupWithForm.open();
  formValidators['popup__card-content'].resetValidation();
});

//display first cards
const firstCards = new Section({ 
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#element-template', handleCardClick);
    const myCardElement = card.generateCard();

    firstCards.addItem(myCardElement);
  },
}, '.elements');
firstCards.renderItems();


//VALIDATION 
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);