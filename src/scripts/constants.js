export const settings = {
    formSelector: '.popup__content',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field_error_active'
}

export const popupElementEditProfile = document.querySelector('.popup_edit-profile');
export const popupElementAddCard = document.querySelector('.popup_add-card');
export const popupOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupAddButtonElement = document.querySelector('.profile__add-button');
export const popupElementOpenImage = document.querySelector('.popup_open-card');

const formElementEditProfile = popupElementEditProfile.querySelector('.popup__content');
export const nameInput = formElementEditProfile.querySelector('.popup__field_input_name');
export const jobInput = formElementEditProfile.querySelector('.popup__field_input_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

export const popupElementImage = popupElementOpenImage.querySelector('.popup__image');
export const popupElementText = popupElementOpenImage.querySelector('.popup__text');