import {apiSettings} from './settings';

class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._token = settings.token;

    this._userRequest = settings.userRequest;
    this._initialCardsRequest = settings.initialCardsRequest;
    this._newCardRequest = settings.newCardRequest;
    this._cardLikeRequest = settings.cardLikeRequest;
    this._userInfoRequest = settings.userInfoRequest;
    this._userAvatarRequest = settings.userAvatarRequest;
    this._cardOffRequest = settings.cardOffRequest;
  }

  getUser() {
    return fetch(this._baseUrl + this._userRequest, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(this._baseUrl + this._userInfoRequest, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(this._checkResponse);
  }

  editUserAvatar(avatarData) {
    return fetch(this._baseUrl + this._userAvatarRequest, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatarData)
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + this._initialCardsRequest, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  addCard(cardData) {
    return fetch(this._baseUrl + this._newCardRequest, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then(this._checkResponse);
  }

  deleteCard(card) {
    return fetch(this._baseUrl + this._cardOffRequest + card._id, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  toggleCardLike(cardId, isLikedByUser) {
    const method = isLikedByUser ? 'DELETE' : 'PUT';

    return fetch(this._baseUrl + this._cardLikeRequest + cardId, {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  }
}

export const api = new Api(apiSettings);
