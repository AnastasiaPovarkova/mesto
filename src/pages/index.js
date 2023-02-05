import './index.css';

import { settings, popupOpenButtonElement, popupAddButtonElement, nameInput, 
  jobInput, profileName, profileProfession, popupElementImage, popupElementText } from '../utils/constants.js'
//import { initialCards } from '../utils/initial-сards.js'

import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
    'Content-Type': 'application/json'
  }
}); 

let myProfileData = {};

api.getUserInfo() //заполняем данные профиля, взятые из сервера и добавляем карточки с сервера
  .then(res => {
    console.log(res);
    handleProfileFormSubmit(res);
    myProfileData = res;
    api.getInitialCards()
      .then(res => {
        cards.renderItems(res);
    });
  });  


//display first cards
const cards = new Section({ 
  renderer: (cardItem) => {
    cards.addItem(createCard(cardItem));
  },
}, '.elements');



//Listeners 
const popupWithEditForm = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm('.popup_add-card', handleAddFormSubmit);
popupWithAddForm.setEventListeners();
const popupWithDeleteConfirmationForm = new PopupWithForm('.popup_delete-card', handleDeleteCardSubmit);
popupWithDeleteConfirmationForm.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_open-card', popupElementImage, popupElementText);
popupWithImage.setEventListeners();

const userInfo = new UserInfo(profileName, profileProfession); 


//create card
function createCard(cardItem) {
  const card = new Card(cardItem, '#element-template', handleCardClick, handleTrashClick, myProfileData);
  const myCardElement = card.generateCard();
  return myCardElement
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit (data) {
  api.changeUserInfo(data);
  userInfo.setUserInfo(data.name, data.about); //writeNameAndJobToProfile
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit(cardInfo) {
  api.addNewCard(cardInfo)
     .then(res => {
       cards.addItem(createCard(res));
     })
}
let deleteCard = '';
let deleteCardId = '';

function handleDeleteCardSubmit(smt) {
  api.deleteCard(deleteCardId)
    .then(res => {
      console.log(res);
      deleteCard.remove();
    })
  
}

function handleTrashClick(element, cardId) {
  deleteCard = element;
  deleteCardId = cardId;
  console.log(deleteCardId);
  popupWithDeleteConfirmationForm.open();
}

//open photocard
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}


//open profile popup
popupOpenButtonElement.addEventListener('click', function() {
  popupWithEditForm.open();
  api.getUserInfo()
    .then(res => {
      console.log(res);
      nameInput.value = res.name;
      jobInput.value = res.about; 
    }); 
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