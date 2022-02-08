export const paths = {
  signUp: 'sign-up',
  signIn: 'sign-in'
}

export const authSettings = {
  defaultErrorMessage: 'Что-то пошло не так',
  baseUrl: 'http://localhost:3001',
  signUpRequest: '/signup',
  signInRequest: '/signin',
  userRequest: '/users/me',
}

export const apiSettings = {
  token: '0b40a95f-9332-4356-a732-eb5ba165765e',
  baseUrl: 'http://localhost:3001',
  userRequest: '/users/me',
  initialCardsRequest: '/cards',
  newCardRequest: '/cards',
  cardOffRequest: '/cards/',
  cardLikeRequest: '/cards/likes/',
  userInfoRequest: '/users/me',
  userAvatarRequest: '/users/me/avatar'
}
export const formClassesAndSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  errorPostfix: '-error'
};

export const cardClassesAndSelectors = {
  templateSelector: '#card-template',
  elementSelector: '.card',
  imageSelector: '.card__image',
  titleSelector: '.card__title',
  likeButtonSelector: '.card__like-button',
  likeCounterSelector: '.card__like-counter',
  deleteButtonSelector: '.card__delete-button',
  activeLikeButtonClass: 'card__like-button_active',
  activeDeleteButtonClass: 'card__delete-button_active'
};

export const popupClassesAndSelectors = {
  popupClass: 'popup',
  closeButtonClass: 'popup__close-button',
  openedPopupClass: 'popup_opened'
}

export const pictureClassesAndSelectors = {
  imageSelector: '.picture__image',
  descriptionSelector: '.picture__description'
}

export const profileClassesAndSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
}

export const loadingMessage = 'Сохранение...';

export const errorMessage = 'Что-то пошло не так...';
