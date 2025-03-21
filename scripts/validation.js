const configurationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn--disabled",
    inputErrorClass: "modal__error_type--input",
    errorClass: ".modal__error"
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (errorMsgElement) {
        inputElement.classList.add(config.inputErrorClass);
        errorMsgElement.textContent = errorMessage;
    }
};

const hideInputError = (formElement, inputElement, config) => {
    const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);

    if (errorMsgElement) {
        errorMsgElement.textContent = "";
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const disableButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
        );
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const resetValidation = (formElement, inputList, config) => {
    inputList.forEach((input) => {
        hideInputError(formElement, input, config);
    });
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

enableValidation(configurationSettings);



/*const configurationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    disabledSubmitButtonClass: ".modal__submit-btn--disabled",
    inputErrorClass: "modal__error_type--input",
    errorClass: ".modal__error"
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (errorMsgElement) {
      inputElement.classList.add(config.inputErrorClass);
      errorMsgElement.textContent = errorMessage;
    };
};

const hideInputError = (formElement, inputElement, config) => {
    const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);

    if (errorMsgElement) {
        errorMsgElement.textContent = "";
    };
};

const invalidInputTrue = (inputList) => {
    //if invalidInputTrue returns true, at least one of the input is invalid
    return inputList.some((input) => {
      return !input.validity.valid;
    });
};

const disableButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.disabledSubmitButtonClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (invalidInputTrue(inputList)) {
      disableButton(buttonElement, config);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.disabledSubmitButtonClass);
    };
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
        );

    } else {
        hideInputError(formElement, inputElement, config);
    };
};

const resetValidation = (formElement, inputList, config) =>{
    inputList.forEach((input) => {
        hideInputError(formElement, input, config);
    });};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector("modal__submit-btn");
 
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            invalidInputTrue(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".modal__form"));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

enableValidation(configurationSettings);

*/