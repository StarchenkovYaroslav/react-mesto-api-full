import {useCallback, useEffect, useRef, useState} from "react";


export function  usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function useFormWithValidation(initialInputValues, initialInputsValidity, initialInputErrorMessages, initialIsFormValid) {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [inputsValidity, setInputsValidity] = useState(initialInputsValidity)
  const [inputErrorMessages, setInputErrorMessages] = useState(initialInputErrorMessages);

  const [isFormValid, setIsFormValid] = useState(initialIsFormValid);

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    const isValid = evt.target.validity.valid;
    const validationMessage = evt.target.validationMessage;

    setInputValues((inputValues) => {
      return {
        ...inputValues,
        [name]: value
      }
    });

    setInputsValidity((inputsValidity) => {
      return {
        ...inputsValidity,
        [name]: isValid
      }
    });

    setInputErrorMessages((inputErrorMessages) => {
      return {
        ...inputErrorMessages,
        [name]: validationMessage
      }
    });

    setIsFormValid(evt.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newInputValues, newInputsValidity, newErrorMessages, newIsFormValid) => {
    setInputValues(newInputValues);
    setInputsValidity(newInputsValidity);
    setInputErrorMessages(newErrorMessages);
    setIsFormValid(newIsFormValid);
  }, []);

  return {inputValues, setInputValues, inputsValidity, inputErrorMessages, isFormValid, handleInputChange, resetForm};
}