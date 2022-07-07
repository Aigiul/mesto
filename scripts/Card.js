class Card {
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
    this._element.querySelector('.card__delete-button')
      .addEventListener('click', (event) => {
        this._deleteCard(event);
      });  // навешиваем слушатель на кнопку удаления карточки

    this._element.querySelector('.card__like')
      .addEventListener('click', (event) => {
        this._clickLike(event);
    });  // навешиваем слушатель на кнопку лайка
  }

  // удаление карточки
  _deleteCard(event) {
    event.preventDefault();
    this._element.remove();
  }

  // лайкаем
  _clickLike(event) {
    event.preventDefault();
    event.target.classList.toggle('card__like_active');
  }
    
  
   // вставляем данные
  generateCard() {
    this._element = this._getTemplate();
  
    this._element.querySelector('.card__title').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.alt = this._name;
    this._image.src = this._link;

    this._addEventListeners();
  
    return this._element;
  }
}
  
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();
  
  document.querySelector('.cards').prepend(cardElement);
});

//export default Card;