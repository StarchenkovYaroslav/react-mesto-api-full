import {useFormWithValidation} from "../utils/hooks";

function Login(props) {
  const {
    inputValues,
    inputsValidity,
    inputErrorMessages,
    isFormValid,
    handleInputChange,
  } = useFormWithValidation(
    {email: '', password: ''},
    {email: true, password: true},
    {email: '', password: ''},
    false
  );

  const isSubmitButtonActive = isFormValid && !props.isSubmitting;


  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSignIn(inputValues);
  }


  return (
    <form
      className="form form_place_page"
      name='login'
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form__title form__title_place_page">Вход</h2>
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="form__input form__input_place_page"
            value={inputValues.email}
            onChange={handleInputChange}
          />
          <span
            className={`form__input-error${!inputsValidity.email ? ' form__input-error_active' : ''}`}
          >
            {inputErrorMessages.email}
          </span>
        </label>
        <label className="form__field">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            minLength={2}
            maxLength={200}
            required
            autoComplete="off"
            className="form__input form__input_place_page"
            value={inputValues.password}
            onChange={handleInputChange}
          />
          <span
            className={`form__input-error${!inputsValidity.password ? ' form__input-error_active' : ''}`}
          >
            {inputErrorMessages.password}
          </span>
        </label>
      </fieldset>
      <button
        type="submit"
        className="form__button form__button_place_page form__button_type_submit"
        disabled={!isSubmitButtonActive}
      >
        Войти
      </button>
    </form>
  )
}

export default Login;