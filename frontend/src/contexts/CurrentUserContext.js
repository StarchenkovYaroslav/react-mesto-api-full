import {createContext} from 'react';

export const CurrentUserContext = createContext();

export const defaultUser = {
  about: '',
  avatar: '',
  cohort: '',
  name: '',
  _id: ''
}