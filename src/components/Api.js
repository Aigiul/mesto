export default class Api {
  constructor (host, token) {
    this._host = host;
    this._token = token;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  // метод получения списка карточек

  getInitialCards() {
    return fetch(`${this._host}`, {
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }

  //метод добавления карточки на сервер

  addCard(data) {
    return fetch(`${this._host}`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    })
    .then(this._getJsonOrError)
  }

  // метод удаления картчоки

  removeCard(cardId) {
    return fetch(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._getJsonOrError)
  }
}