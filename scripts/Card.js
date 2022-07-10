
import { popupOpenImage, openPopup, popupImage, popupFigcaption } from './index.js'

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true); // забираем разметку из HTML и клонируем элемент

    return cardElement; //вернем DOM-эелемент карточки 
  }

  
  _addEventListeners() {
    this._deleteButton.addEventListener('click', (event) => {
      this._deleteCard(event);
    });  // навешиваем слушатель на кнопку удаления карточки

    this._likeButton.addEventListener('click', (event) => {
      this._clickLike(event);
    });  // навешиваем слушатель на кнопку лайка

    this._image.addEventListener('click', () => {
      this._openPopupCard(); 
    });  // навешиваем слушатель на картинку карточки
  }

  // удаление карточки
  _deleteCard(event) {
    event.preventDefault();
    this._element.remove();
  }

  // проставление лайка
  _clickLike(event) {
    event.target.classList.toggle('card__like_active');
  }

  // открытие попапа карточки
  _openPopupCard() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupFigcaption.textContent = this._name;
    
    openPopup(popupOpenImage); // откройте попап
    }
      
  // вставляем данные в карточку
  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.card__like')
    this._deleteButton = this._element.querySelector('.card__delete-button')
    
    this._element.querySelector('.card__title').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.alt = this._name;
    this._image.src = this._link;

    this._addEventListeners();
  
    return this._element;
  }
}