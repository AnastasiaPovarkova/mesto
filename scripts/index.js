//OPEN/CLOSE popups

const popupElementEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAddCard = document.querySelector('.popup_add-card');
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__close');
const popupCloseButtonElementAddCard = popupElementAddCard.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');

function openPopup(item) {
  item.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  cardInput.value = '';
  linkInput.value = '';
}

function closePopup(item) {
  item.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', function(){openPopup(popupElementEditProfile)});
popupAddButtonElement.addEventListener('click', function(){openPopup(popupElementAddCard)});
popupCloseButtonElementEditProfile.addEventListener('click', function(){closePopup(popupElementEditProfile)});
popupCloseButtonElementAddCard.addEventListener('click', function(){closePopup(popupElementAddCard)});


//PROFILE EDIT SUBMIT

// Находим форму в DOM
let formElementEditProfile = popupElementEditProfile.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = formElementEditProfile.querySelector('.popup__field_input_name');
let jobInput = formElementEditProfile.querySelector('.popup__field_input_profession');
// Элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


// Обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupElementEditProfile);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', formSubmitHandler); 


//CARDS

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//FIRST CARDS FROM JS

const cardContainer = document.querySelector('.elements');

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
}
);


//LIKING

function likeToggle () {
  this.classList.toggle('element__like_liked');
}


//DELETE CARD

function deleteCard () {
  const card = this.closest('.element');
  card.remove();
}; 



//ADD CARD

function addCard(cardName, link) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__text').textContent = cardName;
  cardElement.querySelector('.element__image').src = link;

  cardElement.querySelector('.element__like').addEventListener('click', likeToggle);
  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);

  cardContainer.prepend(cardElement);
};


//ADD CARD SUBMIT

let formElementAddCard = popupElementAddCard.querySelector('.popup__content');
let cardInput = formElementAddCard.querySelector('.popup__field_input_card');
let linkInput = formElementAddCard.querySelector('.popup__field_input_link');

function formSubmitHandlerForAdd (evt) {
  evt.preventDefault(); 
  
  addCard(cardInput.value, linkInput.value)
  closePopup(popupElementAddCard);
}

formElementAddCard.addEventListener('submit', formSubmitHandlerForAdd); 
