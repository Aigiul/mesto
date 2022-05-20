const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = document.querySelector('#input-popup-title');
let jobInput = document.querySelector('#input-popup-subtitle');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container');
// let saveButton = popup.querySelector('.popup__save-button'); - не используется пока

// открытие попапа

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
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


// Рендер карточки

const renderInitialCard = (initialData) => {
  initialContainer.insertAdjacentHTML('beforeend', `
  <li class="card">
    <img class="card__image" src=${initialData.link}>
    <div class="card__info">
      <h2 class="card__title">${initialData.name}</h2>
      <button type="button" class="card__like"></button>
    </div>
  </li>
  `)
}

initialCards.forEach((initialData) => {
renderInitialCard(initialData);
})