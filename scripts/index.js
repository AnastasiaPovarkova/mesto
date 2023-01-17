//------CONSTS

const popupElementEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAddCard = document.querySelector('.popup_add-card');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupElementOpenImage = document.querySelector('.popup_open-card');

const formElementEditProfile = popupElementEditProfile.querySelector('.popup__content');
export const nameInput = formElementEditProfile.querySelector('.popup__field_input_name');
export const jobInput = formElementEditProfile.querySelector('.popup__field_input_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

export const popupElementImage = popupElementOpenImage.querySelector('.popup__image');
export const popupElementText = popupElementOpenImage.querySelector('.popup__text');


const settings = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error_active'
}

import {initialCards} from './initial-сards.js'


//-------CLASSES
import Card from './Card.js';
import {FormValidator} from './FormValidator.js';

import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


//-------FUNCTIONS

//open phootocard
function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupElementOpenImage, name, link);
  popupWithImage.open();
  popupWithImage.setEventListeners();
}



//------POPUP SUBMIT

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



const popupWithEditForm = new PopupWithForm(popupElementEditProfile, handleProfileFormSubmit);
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm(popupElementAddCard, handleAddFormSubmit);
popupWithAddForm.setEventListeners();



//open popups
popupOpenButtonElement.addEventListener('click', function() {
  const popupWithForm = new PopupWithForm(popupElementEditProfile, handleProfileFormSubmit);
  popupWithForm.open();
  const userInfo = new UserInfo(nameInput, jobInput); 
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().profession;
  formValidators['popup__profile-content'].resetValidation();
});

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

// Включение валидации
const enableValidationn = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidationn(settings);