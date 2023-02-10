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

api.getUserInfo() //заполняем аватар, данные профиля, взятые из сервера и добавляем карточки с сервера
  .then(res => {
    userInfo = new UserInfo(profileName, profileProfession, profileImage, res); 
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
    api.getInitialCards()
      .then(res => {
        cards.renderItems(res.reverse());
    })
      .catch((err) => {
        console.log(err);
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

//const userInfo = new UserInfo(profileName, profileProfession, profileImage); 
let userInfo = 0;

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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      popupWithEditForm.close();
    })
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit(cardInfo, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.addNewCard(cardInfo)
    .then(res => {
       cards.addItem(createCard(res));
     })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      popupWithAddForm.close();
    })
}

let deleteCard = '';
let deleteCardId = '';

//open deleting card popup
function handleTrashClick(element, cardId) {
  deleteCard = element;
  deleteCardId = cardId;
  popupWithDeleteConfirmationForm.open();
}

//delete card from server and DOM
function handleDeleteCardSubmit(smt) {
  api.deleteCard(deleteCardId)
    .then(() => {
      cards.deleteCard(deleteCard);
      //deleteCard.remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithDeleteConfirmationForm.close();
    }); 
}

function handleLikeCard(cardId, counter) {
  return api.likeCard(cardId)
    .then(res => {
      this.likeCardInDom();
      counter.textContent = res.likes.length;
      this._likes = res.likes;
    })
    .catch((err) => {
      console.log(err);
    }); 
}

function handleUnLikeCard(cardId, counter) {
  return api.unlikeCard(cardId)
    .then(res => {
      this.dislikeCardInDom();
      counter.textContent = res.likes.length;
      this._likes = res.likes;
    })
    .catch((err) => {
      console.log(err);
    }); 
}

//open photocard
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleEditAvatarSubmit(data, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.editAvatar(data)
    .then(res => {
      userInfo.setAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      popupEditAvatar.close();
    })
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