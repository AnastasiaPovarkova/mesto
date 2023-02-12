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
import PopupWithConfirmation from '../scripts/PopupWithConfirmation.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'd2287a93-13da-4c7a-9dc9-db17e7519537',
    'Content-Type': 'application/json'
  }
}); 

//заполняем аватар, данные профиля, взятые из сервера и добавляем карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resInfo, resCards]) => {
    userInfo.setData(resInfo);
    userInfo.setUserInfo(resInfo.name, resInfo.about);
    userInfo.setAvatar(resInfo.avatar);
    cards.renderItems(resCards.reverse());
  })
  .catch((err) => {
    console.log(err);
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
const popupWithDeleteConfirmationForm = new PopupWithConfirmation('.popup_delete-card');
popupWithDeleteConfirmationForm.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_open-card', popupElementImage, popupElementText);
popupWithImage.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarSubmit);
popupEditAvatar.setEventListeners();

const userInfo = new UserInfo(profileName, profileProfession, profileImage); 


//create card
function createCard(cardItem) {
  const myProfileData = userInfo.getUserInfo().data;
  const card = new Card(cardItem, '#element-template', handleCardClick, handleTrashClick, myProfileData, handleLikeCard, handleUnLikeCard);
  const myCardElement = card.generateCard();
  return myCardElement
}

// Обработчик отправки формы профиля
function handleProfileFormSubmit (data, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.changeUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about); //writeNameAndJobToProfile
      popupWithEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    })
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit(cardInfo, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.addNewCard(cardInfo)
    .then(res => {
      cards.addItem(createCard(res));
      popupWithAddForm.close();
     })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    })
}

//open deleting card popup
function handleTrashClick(cardId) {
  popupWithDeleteConfirmationForm.setSubmitConfirmation(() => {
    api.deleteCard(cardId)
    .then(() => {
      this.deleteCard();
      popupWithDeleteConfirmationForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
  })
  popupWithDeleteConfirmationForm.open();
}

//Like Card
function handleLikeCard(cardId) {
  return api.likeCard(cardId)
    .then(res => {
      this.likeCardInDom(res);
    })
    .catch((err) => {
      console.log(err);
    }); 
}

//Unlike Card
function handleUnLikeCard(cardId) {
  return api.unlikeCard(cardId)
    .then(res => {
      this.dislikeCardInDom(res);
    })
    .catch((err) => {
      console.log(err);
    }); 
}

//update avatar
function handleEditAvatarSubmit(data, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.editAvatar(data)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    })
}

//open photocard
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//open profile popup
popupOpenButtonElement.addEventListener('click', function() {
  popupWithEditForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
  formValidators['popup__profile-content'].resetValidation();
});

//open card popup
popupAddButtonElement.addEventListener('click', function() {
  popupWithAddForm.open();
  formValidators['popup__card-content'].resetValidation();
});

//open avatar popup
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