function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_content_${props.name}${props.isOpened ? ' popup_opened' : ''}`}
      onMouseDown={props.onMouseDown}
    >
      <div className="popup__container">
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="form__title">{props.title}</h2>

          {props.children}

          <button
            type="submit"
            className={`form__button form__button_type_submit${!props.isSubmitButtonActive ? ' form__button_inactive' : ''}`}
            disabled={!props.isSubmitButtonActive}
          >
            {props.isSubmitting ? props.submitButtonLoadingValue : props.submitButtonDefaultValue}
          </button>
        </form>
        <button type="button" className="popup__close-button"/>
      </div>
    </div>
  )
}

export default PopupWithForm;