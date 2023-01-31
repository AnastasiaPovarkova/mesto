import './index.css';

import { settings, popupOpenButtonElement, popupAddButtonElement, nameInput, 
  jobInput, profileName, profileProfession, popupElementImage, popupElementText } from '../utils/constants.js'
import { initialCards } from '../utils/initial-сards.js'

import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';


fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
  method: 'GET',
  headers: {
  authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 


//Listeners 
const popupWithEditForm = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm('.popup_add-card', handleAddFormSubmit);
popupWithAddForm.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_open-card', popupElementImage, popupElementText);
popupWithImage.setEventListeners();

const userInfo = new UserInfo(profileName, profileProfession); 


//display first cards
const cards = new Section({ 
  items: initialCards,
  renderer: (cardItem) => {
    cards.addItem(createCard(cardItem));
  },
}, '.elements');
cards.renderItems();

//create card
function createCard(cardItem) {
  const card = new Card(cardItem, '#element-template', handleCardClick);
  const myCardElement = card.generateCard();
  return myCardElement
}

//open photocard
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit (data) {
  console.log(data);
  userInfo.setUserInfo(data.name, data.profession); //writeNameAndJobToProfile
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit (cardInfo) {
  cards.addItem(createCard(cardInfo));
}

//open profile popup
popupOpenButtonElement.addEventListener('click', function() {
  popupWithEditForm.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.profession; 
  formValidators['popup__profile-content'].resetValidation();
});

//open card popup
popupAddButtonElement.addEventListener('click', function() {
  popupWithAddForm.open();
  formValidators['popup__card-content'].resetValidation();
});




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