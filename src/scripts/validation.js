const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn--disabled", 
  inputErrorClass: "modal__error_input", 
  errorClass: "modal__error--visible", 
  errorClassHidden: "modal__error--hidden"
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const inputElementSelector = formElement.querySelector(`#${inputElement.id}`);
  const inputErrorElementId = formElement.querySelector(`#${inputElementSelector.id}-error`);
  
  if (inputErrorElementId) {
    inputElement.classList.add(settings.inputErrorClass);
    inputElement.classList.add(settings.errorClass);
    inputErrorElementId.textContent = errorMessage;
  }
};

const hideInputError = (formElement, inputElement, settings) => {
  const inputErrorElementId = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  inputElement.classList.remove(settings.errorClass);

  
  if (inputErrorElementId) {
    inputErrorElementId.textContent = "";
  }
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const disableButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, settings);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const resetValidation = (formElement, inputList, buttonElement, settings) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  });
  disableButton(buttonElement, settings);
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
};

enableValidation(settings);