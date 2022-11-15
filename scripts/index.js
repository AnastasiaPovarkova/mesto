console.log('Привет, мир!');

//OPEN/CLOSE popup

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__editButton');

function openPopup() {
  popupElement.classList.add('popup_is-opened');
}

function closePopup() {
  popupElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//SUBMIT

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__profession');


// Обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  console.log('Вызвалась функция');

  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileProfession = document.querySelector('.profile__profession');
  
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileProfession.textContent = jobValue;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 