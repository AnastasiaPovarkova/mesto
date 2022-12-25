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
const popupElementImage = popupElementOpenImage.querySelector('.popup__image');
const popupElementText = popupElementOpenImage.querySelector('.popup__text');

const formElementAddCard = popupElementAddCard.querySelector('.popup__content');
const cardInput = formElementAddCard.querySelector('.popup__field_input_card');
const linkInput = formElementAddCard.querySelector('.popup__field_input_link');
const addCardPopupSubmitButton = formElementAddCard.querySelector('.popup__submit');

const allPopups = document.querySelectorAll('.popup');

const settings = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error_active'
}

const formList = Array.from(document.querySelectorAll(settings.formSelector));
import {initialCards} from './initial-сards.js'

export {popupElementOpenImage as popupCardOpen, popupElementImage as image, popupElementText as text};


//-------CLASSES
import {Card} from './card.js';
import {FormValidator} from './validate.js';


//-------FUNCTIONS

//validation
formList.forEach((item) => {
  const formValidator = new FormValidator(settings, item);
  formValidator.enableValidation();
});

//close popup if press Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup); 
  }
}

//open popup
export function openPopup(item) {
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
  const card = new Card(cardInput.value, linkInput.value, '#element-template');
  const myCardElement = card.generateCard();
  cardContainer.prepend(myCardElement);
  closePopup(popupElementAddCard);
}


//-------EVENT LISTENERS

//first cards
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#element-template'); // Создадим экземпляр карточки по классу Card
  const myCardElement = card.generateCard(); // Создаём карточку и возвращаем наружу
  cardContainer.prepend(myCardElement);
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