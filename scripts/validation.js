

const configurationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    disabledSubmitButtonClass: ".modal__submit-btn--disabled",
    inputErrorClass: ".modal__error--input",
    errorClass: ".modal__error"
};

/*
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, InputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, InputElement);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
        });
    };

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true;
    };
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__submit-btn");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


const enableValidation = () => {
    const formList = document.querySelectorAll(".modal__form");

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

enableValidation(configurationSettings);
