import {useEffect, useRef, useState} from "react";

import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const isInitialMount = useRef(true);
  const avatarInput = useRef();

  const [isAvatarValid, setIsAvatarValid] = useState(false);
  const [avatarErrorMessage, setAvatarErrorMessage] = useState('');

  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  function handleAvatarInputChange() {
    const inputValue = avatarInput.current.value;
    const isInputValid = avatarInput.current.validity.valid;
    const inputValidationMessage = avatarInput.current.validationMessage;

    setIsAvatarValid(isInputValid);
    setAvatarErrorMessage(inputValidationMessage);
    setIsSubmitButtonActive(isInputValid && inputValue !== '' && !props.isSubmitting);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!props.isOpened) {
        avatarInput.current.value = '';
        setIsAvatarValid(true);
        setAvatarErrorMessage('');
        setIsSubmitButtonActive(false);
      }
    }
  }, [props.isOpened])

  useEffect(() => {
    props.isSubmitting && setIsSubmitButtonActive(false);
  }, [props.isSubmitting])

  return (
    <PopupWithForm
      name={'change-avatar-form'}
      title={'Обновить аватар'}
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
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
            className="form__input form__input_data_profile-name"
            ref={avatarInput} // ref необходим по заданию к ПР 11
            onChange={handleAvatarInputChange}
          />
          <span
            className={`form__input-error${!isAvatarValid ? ' form__input-error_active' : ''}`}
          >
            {avatarErrorMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;