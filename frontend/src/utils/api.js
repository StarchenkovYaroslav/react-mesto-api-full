import {apiSettings} from './settings';

class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;

    this._checkTokenRequest = settings.checkTokenRequest;
    this._userRequest = settings.userRequest;
    this._cardsRequest = settings.cardsRequest;
    this._likeRequest = settings.likeRequest;
    this._initialCardsRequest = settings.initialCardsRequest;
    this._newCardRequest = settings.newCardRequest;
    this._userInfoRequest = settings.userInfoRequest;
    this._userAvatarRequest = settings.userAvatarRequest;
    this._cardOffRequest = settings.cardOffRequest;
  }

  checkToken() {
    return fetch(this._baseUrl + this._checkTokenRequest, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  getUser() {
    return fetch(this._baseUrl + this._userRequest, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(this._baseUrl + this._userInfoRequest, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    })
      .then(this._checkResponse);
  }

  editUserAvatar(avatarData) {
    return fetch(this._baseUrl + this._userAvatarRequest, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(avatarData)
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + this._initialCardsRequest, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  addCard(cardData) {
    return fetch(this._baseUrl + this._newCardRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(cardData)
    })
      .then(this._checkResponse);
  }

  deleteCard(card) {
    return fetch(this._baseUrl + this._cardOffRequest + card._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  toggleCardLike(cardId, isLikedByUser) {
    const method = isLikedByUser ? 'DELETE' : 'PUT';

    return fetch(this._baseUrl + this._cardsRequest + '/' + cardId + this._likeRequest, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
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
