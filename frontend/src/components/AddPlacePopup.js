import {useEffect, useRef} from "react";

import PopupWithForm from "./PopupWithForm";
import {useFormWithValidation} from "../utils/hooks";


function AddPlacePopup(props) {
  const isInitialMount = useRef(true);

  const {
    inputValues,
    inputsValidity,
    inputErrorMessages,
    isFormValid,
    handleInputChange,
    resetForm
  } = useFormWithValidation(
    {name: '', link: ''},
    {name: true, link: true},
    {name: '', link: ''},
    false
  );

  const isSubmitButtonActive = isFormValid && !props.isSubmitting;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace(inputValues);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!props.isOpened) {
        resetForm(
          {name: '', link: ''},
          {name: true, link: true},
          {name: '', link: ''},
          false
        )
      }
    }
  }, [props.isOpened, resetForm])

  return (
    <PopupWithForm
      name={'add-card-form'}
      title={'Новое место'}
      submitButtonDefaultValue={'Создать'}
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
            type="text"
            name="name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required
            className="form__input form__input_data_card-title"
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
            id="card-image-url-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            className="form__input form__input_data_card-image-url"
            value={inputValues.link}
            onChange={handleInputChange}
          />
          <span
            className={`form__input-error${!inputsValidity.link ? ' form__input-error_active' : ''}`}
          >
            {inputErrorMessages.link}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;