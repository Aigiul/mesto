import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config, profileEditButton, openPopupButtonAddCard, nameInput, jobInput, 
formReductElement, formAddCard, cardsSelector, titleProfileSelector, subtitleProfileSelector, popupConfirmSelector } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupConfirmation from '../components/PopupConfirmation.js';

// экземпляр АПИ

const api = new Api(config.host, config.token);


// попап с картинкой
const popupWithImage = new PopupWithImage(".popup_view-card");
popupWithImage.setEventListeners();

// попап подтверждения
const popupConfirmDelete = new PopupConfirmation(popupConfirmSelector);
popupConfirmDelete.setEventListeners();

// созданиe карточки
function createCard({name, link, _id}) {
  const data = {
    name: name,
    link: link,
    id: _id
  }
  const card = new Card( data, handleCardClick, handleDeleteClick, "#card-template" )
  const cardElement = card.generateCard();
  function handleCardClick (name, link) { 
    popupWithImage.open(name, link);
  }
  function handleDeleteClick() {
    popupConfirmDelete.setHandleFormSubmit(() => {
      api.deleteCard(_id)
      .then(() => {
        cardElement.remove();
        popupConfirmDelete.close();
      })
      .catch((err) => {
				console.log(err);
			});
		});
    popupConfirmDelete.open();
  }
  return cardElement;
};

// отрисовка через Section
const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      cardsSection.addItem(card);
    }
  },
  cardsSelector
)

// Получение списка карточек с сервера и их рендеринг:
api.getInitialCards()
.then((data) => {
	cardsSection.setItems(data);
	cardsSection.renderItems();
})
.catch((err) => {
	console.log(err);
});

//попап добавления нового места
const popupWithFormAddCard = new PopupWithForm(
  {
    handleFormSubmit: (values) => {
     return api.addCard({
        name: values.name,
        link: values.link
      })
      .then( (data) => {
        const card = createCard(data);
        cardsSection.addItem(card);
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
