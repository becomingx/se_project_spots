const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: ".modal__error", 
  inputErrorId: "modal__error_input", 
  errorClass: ".modal__error--visible", 
  errorClassHidden: ".modal__error--hidden"
  };

  console.log(settings);


  function showInputError(formElement, inputElement, errorMessage, settings) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(settings.inputErrorId);
      errorElement.textContent = errorMessage;
      errorElement.classList.remove(settings.errorClassHidden);
      errorElement.classList.add(settings.errorClass);
  };
  
  function hideInputError(formElement, inputElement, settings) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(settings.inputErrorId);
      errorElement.classList.remove(settings.errorClass);
      errorElement.classList.add(settings.errorClassHidden);
      errorElement.textContent = "";
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
  
  const disableButton = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  };

  function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, settings);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    };
  };
  
  function setEventListeners(formElement, settings) {
    const inputList = 
    Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
    
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
      hideInputError(formElement, buttonElement, input, settings)});
    disableButton(buttonElement);
  };
  
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
      formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
  };
  
  enableValidation(settings);