import PopupWithForm from "./PopupWithForm";

function PopupToConfirm(props) {
  const isSubmitButtonActive = props.objectToHandle && !props.isSubmitting;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit(props.objectToHandle);
  }

  return (
    <PopupWithForm
      name={'confirm-delete-card-form'}
      title={'Вы уверены?'}
      submitButtonDefaultValue={'Да'}
      submitButtonLoadingValue={'Удаляем...'}
      isOpened={props.objectToHandle}
      isSubmitButtonActive={isSubmitButtonActive}
      isSubmitting={props.isSubmitting}
      onMouseDown={props.onMouseDown}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default PopupToConfirm;