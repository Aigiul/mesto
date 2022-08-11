import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config, profileEditButton, openPopupButtonAddCard, nameInput, jobInput, 
formReductElement, formAddCard, cardsSelector, titleProfileSelector, subtitleProfileSelector } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';

// экземпляр АПИ

const api = new Api(config.host, config.token);


// попап с картинкой
const popupWithImage = new PopupWithImage(".popup_view-card");
popupWithImage.setEventListeners();

// созданиe карточки
const createCard = function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: (name, link, id) => {
        popupWithImage.open(name, link, id);
      },
    },
    "#card-template",
    deleteCard
  );
  const cardElement = card.generateCard();
  return cardElement;
};

// удаление карточки

function deleteCard(_id) {
  return api.deleteCard(_id);
}

// Получение списка карточек с сервера и их рендеринг:
api.getInitialCards()
.then((data) => {
	cardsSection.setItems(data);
	cardsSection.renderItems();
})
.catch((err) => {
	console.log(err);
});

// отрисовка через Section
const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  cardsSelector
)

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
     return api.addCard({
        name: values.name,
        link: values.link
      })
      .then((data) => {
        cardsSection.addItem(createCard(data));
        popupWithFormAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
