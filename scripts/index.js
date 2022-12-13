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

const cardTemplate = document.querySelector('#element-template').content;

const allPopups = document.querySelectorAll('.popup');


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
function likeToggle (evt) {
  evt.target.classList.toggle('element__like_liked');
}

//DELETE CARD
function deleteCard (evt) {
  const card = evt.target.closest('.element');
  card.remove();
}; 

//ADD LINK AND NAME TO IMAGE
function handleOpenImage (link, cardName) {
  popupElementImage.src = link;
  popupElementImage.alt = cardName;
  popupElementText.textContent = cardName;
  openPopup(popupElementOpenImage);
}

//CREATE CARD
function createCard(cardName, link) {
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
};

//ADD CARD
function addCard(container, card) {
  container.prepend(card);
}

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
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  writeNameAndJobToProfile();
  closePopup(popupElementEditProfile);
}

//Обработчик отправки формы добавления карточки
function handleAddFormSubmit (evt) {
  evt.preventDefault(); 
  addCard(cardContainer, createCard(cardInput.value, linkInput.value));
  closePopup(popupElementAddCard);
}


//-------EVENT LISTENERS

//first cards
initialCards.forEach(function (item) {
  addCard(cardContainer, createCard(item.name, item.link));
}
);

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

