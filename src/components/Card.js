
export default class Card {
  constructor({ data, handleCardClick }, cardSelector, handleDeleteClick ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data.id;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
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
      if (this._ownerId !== this._myId) {
        this._disableDelete(cardElement);
      }
    });  // навешиваем слушатель на кнопку удаления карточки

    this._likeButton.addEventListener('click', (event) => {
      this._clickLike(event);
    });  // навешиваем слушатель на кнопку лайка

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });  // навешиваем слушатель на картинку карточки
  }

  // удаление карточки
  async _deleteCard(event) {
    try {
      event.preventDefault();
      await this._handleDeleteClick();
      this._element.remove();
      this._element = null;
    }
    catch(error) {
      console.log(error);
    }
  }
// если карточка не моя
  _disableDelete(cardElement) {
		cardElement.querySelector(".card__delete-button").classList.add("card__delete-button_hidden");
	}

  // проставление лайка
  _clickLike(event) {
    event.target.classList.toggle('card__like_active');
  }
     
  // вставляем данные в карточку
  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.card__like');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    
    this._element.querySelector('.card__title').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.alt = this._name;
    this._image.src = this._link;

    this._addEventListeners();
  
    return this._element;
  }
}