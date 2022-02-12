import {apiSettings} from './settings';

class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;

    this._defaultErrorMessage = settings.defaultErrorMessage;

    this._signUpEndpoint = settings.signUpEndpoint;
    this._signInEndpoint = settings.signInEndpoint;
    this._signOutEndpoint = settings.signOutEndpoint;

    this._tokenEndpoint = settings.tokenEndpoint;
    this._tokenCheckEndpoint = settings.tokenCheckEndpoint;

    this._usersEndpoint = settings.usersEndpoint;
    this._userInfoEndpoint = settings.userInfoEndpoint;
    this._userAvatarEndpoint = settings.userAvatarEndpoint;

    this._cardsEndpoint = settings.cardsEndpoint;
    this._cardLikeEndpoint = settings.cardLikeEndpoint;
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/${this._signUpEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  signIn(data) {
    return fetch(`${this._baseUrl}/${this._signInEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  signOut() {
    return fetch(`${this._baseUrl}/${this._signOutEndpoint}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/${this._tokenEndpoint}/${this._tokenCheckEndpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this._baseUrl}/${this._usersEndpoint}/${this._userInfoEndpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/${this._usersEndpoint}/${this._userInfoEndpoint}`, {
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
    return fetch(`${this._baseUrl}/${this._usersEndpoint}/${this._userInfoEndpoint}/${this._userAvatarEndpoint}`, {
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
    return fetch(`${this._baseUrl}/${this._cardsEndpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/${this._cardsEndpoint}`, {
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
    return fetch(`${this._baseUrl}/${this._cardsEndpoint}/${card._id}`, {
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

    return fetch(`${this._baseUrl}/${this._cardsEndpoint}/${cardId}/${this._cardLikeEndpoint}`, {
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

    return response.json()
      .then(data => {
        const message = data.message || this._defaultErrorMessage;

        return Promise.reject(new Error(message));
      });
  }
}

export const api = new Api(apiSettings);
