import {useContext, useEffect, useRef} from 'react';

import {useFormWithValidation, usePrevious} from "../utils/hooks";

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const isInitialMount = useRef(true);

  const prevIsOpened = usePrevious(props.isOpened);

  const {
    inputValues,
    setInputValues,
    inputsValidity,
    inputErrorMessages,
    isFormValid,
    handleInputChange,
    resetForm
  } = useFormWithValidation(
    {name: currentUser.name, about: currentUser.about},
    {name: true, about: true},
    {name: '', about: ''},
    true
  );

  const isSubmitButtonActive = isFormValid && !props.isSubmitting;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser(inputValues);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (prevIsOpened && !props.isOpened) {
        resetForm(
          {name: currentUser.name, about: currentUser.about},
          {name: true, about: true},
          {name: '', about: ''},
          true
        )
      }
    }
  }, [props.isOpened, prevIsOpened, currentUser, resetForm])

  useEffect(() => {
    setInputValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, setInputValues]);

  return (
    <PopupWithForm
      name={'edit-profile-form'}
      title={'Редактировать профиль'}
      submitButtonDefaultValue={'Сохранить'}
      submitButtonLoadingValue={'Сохраняем...'}
      isOpened={props.isOpened}
      isSubmitButtonActive={isSubmitButtonActive}
      isSubmitting={props.isSubmitting}
      onMouseDown={props.onMouseDown}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            id="profile-name-input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required
            className="form__input form__input_data_profile-name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
          <span
            className={`form__input-error${!inputsValidity.name ? ' form__input-error_active' : ''}`}
          >
            {inputErrorMessages.name}
          </span>
        </label>
        <label className="form__field">
          <input
            id="profile-status-input"
            type="text"
            name="about"
            placeholder="Статус"
            minLength={2}
            maxLength={200}
            required
            className="form__input form__input_data_profile-status"
            value={inputValues.about}
            onChange={handleInputChange}
          />
          <span
            className={`form__input-error${!inputsValidity.about ? ' form__input-error_active' : ''}`}
          >
            {inputErrorMessages.about}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;