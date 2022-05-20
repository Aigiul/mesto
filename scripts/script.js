const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const openPopupButtonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__close-button');
let nameInput = document.querySelector('#input-popup-title');
let jobInput = document.querySelector('#input-popup-subtitle');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container');
// let saveButton = popup.querySelector('.popup__save-button'); - не используется пока

// открытие попапа редакта профиля

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрытие попапа редакта профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

// открытие попапа добавления карточки
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

// закрытие попапа добавления краточки
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
} 


function formSubmitHandler (evt) { 
  evt.preventDefault();  
  profileName.textContent = nameInput.value; 
  profileJob.textContent = jobInput.value;
  closePopup();
}; 

formElement.addEventListener('submit', formSubmitHandler);  

openPopupButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

openPopupButtonAddCard.addEventListener('click', openPopupAddCard);

popupCloseButtonAddCard.addEventListener('click', closePopupAddCard);



/* function popupOverlayClickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
} */ // - закрытие попапа кликом на оверлэй

/* if (nameInput.length < 2) {
  saveButton.setAttribute('disabled', true);
  saveButton.classList.add('popup__save-button_disabled');
} else {
  saveButton.removeAttribute('disabled');
  saveButton.classList.remove('popup__save-button_disabled');
}

if (jobInput.length < 2) {
  saveButton.setAttribute('disabled', true);
  saveButton.classList.add('popup__save-button_disabled');
} else {
  saveButton.removeAttribute('disabled');
  saveButton.classList.remove('popup__save-button_disabled');
} */ // - условия кол-ва символов в инпутах

/* function popupOpen() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
} */
// popup.addEventListener('click', popupOverlayClickHandler); - закрытие попапа оверлэем

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

// Дом элементы

const initialContainer = document.querySelector('.cards');
const form = document.querySelector('#popup-form-add-card');
const nameInputCard = document.querySelector('#input-popup-title-card');
const linkInputCard = document.querySelector('#input-popup-link-card');

// Обработчики событий

const handleSubmitAddIninitialForm = (event) => {
  event.preventDefault();

  renderInitialCard({ name: nameInputCard.value, link: linkInputCard.value });

  nameInputCard.value = '';
  linkInputCard.value = '';
  closePopupAddCard();
};

// Рендер карточки

const renderInitialCard = (initialData) => {
  initialContainer.insertAdjacentHTML('afterbegin', `
  <li class="card">
    <img class="card__image" src=${initialData.link}>
    <div class="card__info">
      <h2 class="card__title">${initialData.name}</h2>
      <button type="button" class="card__like"></button>
    </div>
  </li>
  `)
};

initialCards.forEach((initialData) => {
renderInitialCard(initialData);
});

form.addEventListener('submit', handleSubmitAddIninitialForm);