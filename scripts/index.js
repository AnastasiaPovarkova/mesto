//------CONSTS

const popupElementEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAddCard = document.querySelector('.popup_add-card');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupElementOpenImage = document.querySelector('.popup_open-card');

const formElementEditProfile = popupElementEditProfile.querySelector('.popup__content');
const nameInput = formElementEditProfile.querySelector('.popup__field_input_name');
const jobInput = formElementEditProfile.querySelector('.popup__field_input_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const cardContainer = document.querySelector('.elements');
const popupElementImage = popupElementOpenImage.querySelector('.popup__image');
const popupElementText = popupElementOpenImage.querySelector('.popup__text');

const formElementAddCard = popupElementAddCard.querySelector('.popup__content');
const cardInput = formElementAddCard.querySelector('.popup__field_input_card');
const linkInput = formElementAddCard.querySelector('.popup__field_input_link');

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
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


//-------FUNCTIONS

//open card
function handleCardClick(name, link) {
  popupElementImage.src = link;//устанавливаем ссылку
  popupElementImage.alt = name;
  popupElementText.textContent = name;//устанавливаем подпись картинке
  openPopup(popupElementOpenImage);//открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
}

//create card
function createCard(name, link) {
  const card = new Card(name, link, '#element-template', handleCardClick); // Создадим экземпляр карточки по классу Card
  const myCardElement = card.generateCard(); // Создаём карточку и возвращаем наружу
  return myCardElement 
}

//open popup
function openPopup(item) {
  item.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

//close popup
function closePopup(item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

//write name and job to profile
function writeNameAndJobToProfile () {
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
}

//write name and job to form
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
  cardContainer.prepend(createCard(cardInput.value, linkInput.value));
  closePopup(popupElementAddCard);
}


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



//-------EVENT LISTENERS

//display first cards
initialCards.forEach((item) => {
  cardContainer.prepend(createCard(item.name, item.link));
});

//open popups
popupOpenButtonElement.addEventListener('click', function() {
  openPopup(popupElementEditProfile);
  writeNameAndJobToForm();
  formValidators['popup__profile-content'].resetValidation();
});

popupAddButtonElement.addEventListener('click', function() {
  openPopup(popupElementAddCard);
  formElementAddCard.reset(); 
  formValidators['popup__card-content'].resetValidation();
});


//submit listener
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit); 
formElementAddCard.addEventListener('submit', handleAddFormSubmit); 


//close popup if press Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup); 
  }
}

//close popup if click on overlay or closebutton
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) { //если нажат оверлей
      closePopup(popup)
    } else if (evt.target.classList.contains('popup__close')) { //если нажат крестик
      closePopup(popup)
    }
  })
})