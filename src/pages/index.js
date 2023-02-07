import './index.css';

import { settings, popupOpenButtonElement, popupAddButtonElement, nameInput, 
  jobInput, profileName, profileProfession, popupElementImage, popupElementText, profileAvatar, profileImage } from '../utils/constants.js'

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

api.getUserInfo() //заполняем аватар, данные профиля, взятые из сервера и добавляем карточки с сервера
  .then(res => {
    console.log(res);
    api.changeUserInfo(res)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about); //writeNameAndJobToProfile
      })
    myProfileData = res;
    profileImage.src = res.avatar;
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
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarSubmit);
popupEditAvatar.setEventListeners();

const userInfo = new UserInfo(profileName, profileProfession); 


//create card
function createCard(cardItem) {
  const card = new Card(cardItem, '#element-template', handleCardClick, handleTrashClick, myProfileData, handleLikeCard, handleUnLikeCard, isCardLikedByMe);
  const myCardElement = card.generateCard();
  return myCardElement
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit (data, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.changeUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about); //writeNameAndJobToProfile
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit(cardInfo, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.addNewCard(cardInfo)
    .then(res => {
       cards.addItem(createCard(res));
     })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
}

let deleteCard = '';
let deleteCardId = '';

//delete card from server and DOM
function handleDeleteCardSubmit(smt) {
  api.deleteCard(deleteCardId)
    .then(() => {
      deleteCard.remove();
    })
}

function isCardLikedByMe(likes, myID) {
  likes.some(like => like._id === myID)
}

function handleLikeCard(cardId, counter, likes) {
  api.likeCard(cardId)
    .then(res => {
      this._likeButton.classList.add('element__like_liked');
      likes = res.likes;
      console.log(likes);
      counter.textContent = likes.length;
    })
}

function handleUnLikeCard(cardId, counter, likes) {
  api.unlikeCard(cardId)
    .then(res => {
      console.log('unlike')
      this._likeButton.classList.remove('element__like_liked');
      likes = res.likes;
      counter.textContent = likes.length;
    })
}

//open deleting card popup
function handleTrashClick(element, cardId) {
  deleteCard = element;
  deleteCardId = cardId;
  popupWithDeleteConfirmationForm.open();
}

//open photocard
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleEditAvatarSubmit(data, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.editAvatar(data)
    .then(res => {
      console.log(res);
      profileImage.src = res.avatar;
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
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

profileAvatar.addEventListener('click', function() {
  popupEditAvatar.open();
})


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