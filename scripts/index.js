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
}

function closePopup(item) {
  item.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', function(){openPopup(popupElementEditProfile)});
popupAddButtonElement.addEventListener('click', function(){openPopup(popupElementAddCard)});
popupCloseButtonElementEditProfile.addEventListener('click', function(){closePopup(popupElementEditProfile)});
popupCloseButtonElementAddCard.addEventListener('click', function(){closePopup(popupElementAddCard)});

//SUBMIT

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field_input_name');
let jobInput = formElement.querySelector('.popup__field_input_profession');
// Элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


// Обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 