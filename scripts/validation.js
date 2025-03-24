const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "#modal__submit-btn--disabled",
    getInputErrorClass: (inputId) => `#${inputId}--error`,
    errorClass: "modal__error",
};

const checkInputValidity = (formElement, inputElement) => {
    console.log(inputElement.validity);
};

const setEventListeners =  (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__submit-btn");

    //handle initial states
    //toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("change", function () {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const resetValidation = (formElement, inputElement, settings) => {

    inputList.forEach((input) => {
        hideInputError(formElement, input, settings);
    });
};


const enableValidation = () => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formElement) => {
        setEventListeners(formElement);
 });
};

enableValidation();