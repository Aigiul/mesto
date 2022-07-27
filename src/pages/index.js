import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, config, profileEditButton, openPopupButtonAddCard, nameInput, jobInput, 
formReductElement, formAddCard, cardsSelector, titleProfileSelector, subtitleProfileSelector } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// попап с картинкой
const popupWithImage = new PopupWithImage(".popup_view-card");
popupWithImage.setEventListeners();

// созданиe карточки
const createCard = function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
    },
    "#card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
};

// отрисовка через Section
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  cardsSelector
);

cardsSection.renderItems();

const userInfo = new UserInfo(
  titleProfileSelector,
  subtitleProfileSelector
);

function openPopupProfile() {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  popupWithFormReductElement.open();
}

// попап редактирования профиля
const popupWithFormReductElement = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupWithFormReductElement.close();
    },
  },
  ".popup_edit"
);
popupWithFormReductElement.setEventListeners();

//попап добавления нового места
const popupWithFormAddCard = new PopupWithForm(
  {
    handleFormSubmit: (values) => {
      cardsSection.addItem(createCard(values));
      popupWithFormAddCard.close();
    },
  },
  ".popup_add-card"
);
popupWithFormAddCard.setEventListeners();

profileEditButton.addEventListener("click", () => {
  openPopupProfile();
});

openPopupButtonAddCard.addEventListener("click", () => {
  popupWithFormAddCard.open();
});

const validatorProfile = new FormValidator(config, formReductElement);
validatorProfile.enableValidation();
const validatorCard = new FormValidator(config, formAddCard);
validatorCard.enableValidation();
