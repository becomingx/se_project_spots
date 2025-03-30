const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn--disabled", 
  inputErrorClass: "modal__error_input", 
  errorClass: "modal__error", 
  errorClassHidden: "modal__error--hidden"
  };

  function showInputError(formElement, inputElement, errorMessage, settings) {
    if (!formElement.closest('#edit-modal')) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.remove(settings.errorClassHidden);
      errorElement.classList.add(settings.errorClass);
    };
  };
  
  function hideInputError(formElement, inputElement, settings) {
    if (!formElement.closest('#edit-modal')) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(settings.errorClass);
      errorElement.classList.add(settings.errorClassHidden);
    };
  };
  
  function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    };
  };
  
  function hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  };
  
  function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    };
  };
  
  function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
  function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
  };
  
  enableValidation(settings);