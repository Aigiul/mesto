import Card from './Card.js';
const openPopupButton = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector('.popup_edit');
const openPopupButtonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
export const popupOpenImage = document.querySelector('.popup_view-card');
const nameInput = document.querySelector("#input-popup-title");
const jobInput = document.querySelector("#input-popup-subtitle");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formReductElement = document.querySelector(".popup__container");

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('mousedown', closeClick);
}

openPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
})

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// закрытие попапа 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('mousedown', closeClick);
}

const closeClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

popups.forEach((popup) => { 
  popup.addEventListener('click', (evt) => { 
    if (evt.target.classList.contains('popup__close-button')) { 
      closePopup(popup);
    } 
  })
})

formReductElement.addEventListener("submit", formSubmitHandler);

openPopupButtonAddCard.addEventListener("click", () => openPopup(popupAddCard));

// закрытие с помощью Esc

const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//initialCards.reverse();

const initialContainer = document.querySelector(".cards");
const formAddCard = document.querySelector("#popup-form-add-card");
const nameInputCard = document.querySelector("#input-popup-title-card");
const linkInputCard = document.querySelector("#input-popup-link-card");
export const popupImage = document.querySelector('.popup__image');
export const popupFigcaption = document.querySelector('.popup__figcaption');
//const cardSelector = document.querySelector('#card-template');

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  initialContainer.append(cardElement);
});



/*function renderCard(cardElement) {
  initialContainer.prepend(cardElement);
}*/

function createCard(item) {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  initialContainer.prepend(cardElement);
}
 
function generateUserCard() {
  const userCard = {};
  userCard.name = nameInputCard.value;
  userCard.link = linkInputCard.value;
  createCard(userCard);
}

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  generateUserCard();
  closePopup(popupAddCard);
  
  formAddCard.reset();
});




//const deleteButton = newInitialCard.querySelector('.card__delete-button');

// Шаблоны

// const initialCardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Дом элементы



// Обработчики событий

/*const handleSubmitAddInitialForm = (event) => {
  const data = {
    name: nameInputCard.value, 
    link: linkInputCard.value
  };

  event.preventDefault();
  let card = new Card(data, '#card-template');
  elementsContain.prepend(card.generateCard());
  
  document.querySelector('.cards').prepend(cardElement);
  closePopup(popupAddCard);
  
  formAddCard.reset();

  enableValidation(config);
};

/*const handleDeleteInitialCard = (event) => {
  event.target.closest('.card').remove();
};

//Генерация карточки

const generateInitialCard = (initialData) => {

  const newInitialCard = initialCardTemplate.cloneNode(true); // клонировать узел

  const nameInitialCard = newInitialCard.querySelector(".card__title");  // вставляем название карты
  nameInitialCard.textContent = initialData.name;

  const linkInitialCard = newInitialCard.querySelector(".card__image"); // вставляем картинку
  linkInitialCard.src = initialData.link;
  linkInitialCard.alt = initialData.name; */

  /*function handleOpenPopup(event) {
    popupImage.src = initialData.link;
    popupImage.alt = initialData.name;

    popupFigcaption.textContent = initialData.name;

    openPopup(popupOpenImage);
  };

  /*const deleteButton = newInitialCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', handleDeleteInitialCard);

  newInitialCard.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });

  return newInitialCard;
};

// Рендер карточки

const renderInitialCard = (initialData) => {
  initialContainer.prepend(generateInitialCard(initialData));
};

initialCards.forEach((initialData) => {
  renderInitialCard(initialData);
});
*/

