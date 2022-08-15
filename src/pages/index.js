import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config, profileEditButton, openPopupButtonAddCard, nameInput, jobInput, 
formReductElement, formAddCard, cardsSelector, titleProfileSelector, subtitleProfileSelector, popupConfirmSelector,
editAvatarButtonSelector, formNewAvatar } from "../utils/constants.js";
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

//инфо о юзере и получение списка карточек с сервера 
const userInfo = new UserInfo(
  titleProfileSelector,
  subtitleProfileSelector,
  editAvatarButtonSelector
  );

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserId(userData._id);
  userInfo.setUserAvatar(userData.avatar);
  cardsSection.setItems(cardsData);
  cardsSection.renderItems();
})
.catch((err) => {
  console.log(err);
});
  
// отрисовка карточек через Section
const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      cardsSection.addItem(card);
    }
  },
  cardsSelector
);
    
//попап добавления нового места
const popupWithFormAddCard = new PopupWithForm(
  {
    handleFormSubmit: (values) => {
      return api.addCard({
        name: values.name,
        link: values.link
      })
      .then((data) => {
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

// попап редактирования профиля
const popupWithFormReductElement = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      return api.addProfileInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupWithFormReductElement.close();
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  ".popup_edit"
);
popupWithFormReductElement.setEventListeners();


// попап изменения аватара
const popupNewAvatar = new PopupWithForm(
  {
    handleFormSubmit: (values) => {
      return api.newAvatar(values)
      .then(() => {
        userInfo.setUserAvatar(values.avatar);
        popupNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  ".popup_avatar"
)
popupNewAvatar.setEventListeners();

document.querySelector(editAvatarButtonSelector).addEventListener("click", () => {
  popupNewAvatar.open();
})


// созданиe карточки
function createCard({name, link, likes, _id, owner}) {
  const data = {
    name: name,
    link: link,
    id: _id,
    likes: likes,
    myId: userInfo.getUserId(),
    owner: owner
  }
  const card = new Card( data, handleCardClick, handleDeleteClick, handleLikeClick, "#card-template" );
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
  function handleLikeClick(id, isLiked) {
		if (isLiked) {
			api.deleteLike(id)
			.then((data) => {
				card.setLikesCounter(data.likes.length);
				card.updateLikes(data.likes);
			})
			.catch((err) => {
				console.log(err);
			});
		} else {
			api.putLike(id)
			.then((data) => {
				card.setLikesCounter(data.likes.length);
				card.updateLikes(data.likes);
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}
  return cardElement;
};

// открытие попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  popupWithFormReductElement.open();
  popupWithFormReductElement.setInputValues(userInfo.getUserInfo());
});

// открытие попапа добавления нового места
openPopupButtonAddCard.addEventListener("click", () => {
  popupWithFormAddCard.open();
});


const validatorAvatar = new FormValidator(config, formNewAvatar);
validatorAvatar.enableValidation();
const validatorProfile = new FormValidator(config, formReductElement);
validatorProfile.enableValidation();
const validatorCard = new FormValidator(config, formAddCard);
validatorCard.enableValidation();
