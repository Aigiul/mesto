const openPopupButton = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector('.popup_edit');
const openPopupButtonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const popupOpenImage = document.querySelector('.popup_view-card');
const nameInput = document.querySelector("#input-popup-title");
const jobInput = document.querySelector("#input-popup-subtitle");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formReductElement = document.querySelector(".popup__container");

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

openPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
})

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// закрытие попапа 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

formReductElement.addEventListener("submit", formSubmitHandler);

openPopupButtonAddCard.addEventListener("click", () => openPopup(popupAddCard));


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

initialCards.reverse();

// Шаблоны

const initialCardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Дом элементы

const initialContainer = document.querySelector(".cards");
const formAddCard = document.querySelector("#popup-form-add-card");
const nameInputCard = document.querySelector("#input-popup-title-card");
const linkInputCard = document.querySelector("#input-popup-link-card");
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

// Обработчики событий

const handleSubmitAddInitialForm = (event) => {
  event.preventDefault();

  renderInitialCard({ name: nameInputCard.value, link: linkInputCard.value });

  closePopup(popupAddCard);
  
  formAddCard.reset();
};

const handleDeleteInitialCard = (event) => {
  event.target.closest('.card').remove();
};

// Генерация карточки

const generateInitialCard = (initialData) => {
  const newInitialCard = initialCardTemplate.cloneNode(true); // клонировать узел

  const nameInitialCard = newInitialCard.querySelector(".card__title");  // вставляем название карты
  nameInitialCard.textContent = initialData.name;

  const linkInitialCard = newInitialCard.querySelector(".card__image"); // вставляем картинку
  linkInitialCard.src = initialData.link;
  linkInitialCard.alt = initialData.name;

  linkInitialCard.addEventListener('click', function() {
    popupImage.src = initialData.link;
    popupImage.alt = initialData.name;

    popupFigcaption.textContent = initialData.name;

    openPopup(popupOpenImage);  
  });

  const deleteButton = newInitialCard.querySelector('.card__delete-button');

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

formAddCard.addEventListener("submit", handleSubmitAddInitialForm);
