const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('#input-popup-title');
let aboutInput = document.querySelector('#input-popup-subtitle');
let saveButton = popup.querySelector('.popup__save-button');
let Name = document.querySelector('.profile__title');
let About = document.querySelector('.profile__subtitle');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
}

function popupOverlayClickHandler(evt) {
  console.log(evt.target);
  console.log(evt.currentTarget);
  if (evt.target === evt.currentTarget) {
    popupOpenToggle();
  }
}

openPopupButton.addEventListener('click', popupOpenToggle);

popupCloseButton.addEventListener('click', popupOpenToggle);

popup.addEventListener('click', popupOverlayClickHandler);

if (nameInput.length < 2) {
  saveButton.setAttribute('disabled', true);
  saveButton.classList.add('popup__save-button_disabled');
} else {
  saveButton.removeAttribute('disabled');
  saveButton.classList.remove('popup__save-button_disabled');
}

if (aboutInput.length < 2) {
  saveButton.setAttribute('disabled', true);
  saveButton.classList.add('popup__save-button_disabled');
} else {
  saveButton.removeAttribute('disabled');
  saveButton.classList.remove('popup__save-button_disabled');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameInput.value; // Получите значение полея nameInput из свойства value
  aboutInput.value; // Получите значение полея jobInput из свойства value

  Name.textContent = nameInput.value;
  About.textContent = aboutInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 