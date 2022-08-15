
export default class Card { 
  constructor( data, handleCardClick, handleDeleteClick, handleLikeClick, cardSelector ) { 
    this._name = data.name; 
    this._link = data.link;
    this._cardId = data.id;
    this._likes = data.likes || [];
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick; 
    this._handleLikeClick = handleLikeClick;
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
      this._handleCardClick(this._name, this._link) 
    });  // навешиваем слушатель на картинку карточки 
  } 

  // удаление карточки 
  _deleteCard(event) {
    event.preventDefault();
    this._handleDeleteClick(this._cardId);
    
  }
  
  // проставление лайка 
  _clickLike(event) { 
    event.target.classList.toggle('card__like_active');
    this._handleLikeClick(this._cardId, this._isLiked());
  }

  setLikesCounter(count) {
    this._element.querySelector('.card__like-number').textContent = count;
  }

  updateLikes(likes) {
		this._likes = likes;
	}


  _isLiked() {
    return this._likes.some(user => {
      return user._id === this._myId;
    });
  }

  _setLikeIfActive() {
    const isLiked = this._isLiked();
    if (isLiked) {
      this._element.querySelector('.card__like').classList.add('card__like_active');
    }
  }

  _disableDelete() {
    this._element.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
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
    this.setLikesCounter(this._likes.length);
    this._setLikeIfActive();
    if (this._ownerId !== this._myId) {
			this._disableDelete();
		}
    return this._element; 
  } 
} 