import {authSettings} from "./settings";

class Auth {

  constructor(settings) {
    this.defaultErrorMessage = settings.defaultErrorMessage;

    this.baseUrl = settings.baseUrl;
    this.signuUpRequest = settings.signUpRequest;
    this.signInRequest = settings.signInRequest;
    this.signOutRequest = settings.signOutRequest;
    this.userRequest = settings.userRequest;
  }

  signUp(data) {
    return fetch(this.baseUrl + this.signuUpRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json()
          .then(data => {
            const message = data.error || this.defaultErrorMessage;

            return Promise.reject(new Error(message));
          })
      })
  }

  signIn(data) {
    return fetch(this.baseUrl + this.signInRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json()
          .then(data => {
            const message = data.message || this.defaultErrorMessage;

            return Promise.reject(new Error(message));
          })
      });
  }

  signOut() {
    return fetch(this.baseUrl + this.signOutRequest, {
      method: 'HEAD',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return Promise.resolve();
        }

        return response.json()
          .then(data => {
            const message = data.message || this.defaultErrorMessage;

            return Promise.reject(new Error(message));
          })
      });
  }

  getUser() {
    return fetch(this.baseUrl + this.userRequest, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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

export const auth = new Auth(authSettings);