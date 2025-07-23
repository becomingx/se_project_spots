import {
  settings,
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  disableButton,
  toggleButtonState,
  setEventListeners,
  resetValidation,
  enableValidation
} from "/src/scripts/validation.js";
import "/src/pages/index.css";
import Api from "/src/utils/api.js";

/*
const initialCards = [
  {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },

  {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },

  {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },

  {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },

  {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },

  {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  }

];*/

/*
auth token
{
  "user": {
    "name": "Placeholder name",
    "about": "Placeholder description",
    "avatar": "https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg",
    "_id": "282ae76e083305b16c5ef25c"
  },
  "token": "30487a64-5f71-41bb-bbbd-2f7240ebc0c2"
}
*/

const api =  new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "30487a64-5f71-41bb-bbbd-2f7240ebc0c2",
    "content-Type": "application/json"
  }
});

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");
const editModalSubmitBtn = editModal.querySelector(".modal__submit-btn");

const addModal = document.querySelector("#add-card-modal");
const addModalFormElement = addModal.querySelector(".modal__form");
const addModalCloseBtn = addModal.querySelector(".modal__close-btn");
const addModalCardInput = addModal.querySelector("#add-card-link-input");
const addModalNameInput = addModal.querySelector("#add-card-name-input");
const addModalSubmitBtn = addModal.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__preview-caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn--preview");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const getCardElement = (data) => {
  const cardElement = cardTemplate.content
  .querySelector(".card")
  .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  const likeBtn = cardElement.querySelector(".card__like-btn");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-btn-liked");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImageElement.alt = data.name;
    previewModalImageElement.src = data.link;

  });

  return cardElement;
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    };
  };
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  };
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("mousedown", handleOverlayClick);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("mousedown", handleOverlayClick);
};

const handleEditModalFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
};

const handleAddModalFormSubmit = (evt) => {
  evt.preventDefault();

  const inputValues = { 
    name: addModalNameInput.value, 
    link: addModalCardInput.value
  };

  const addCardElement = getCardElement(inputValues);
  cardsList.prepend(addCardElement);
  evt.target.reset();
  closeModal(addModal);
  disableButton(addModalSubmitBtn, settings);
};

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

profileAddBtn.addEventListener("click", () => {
  openModal(addModal); 
});

profileEditBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
  resetValidation(editModal, [editModalNameInput, editModalDescriptionInput], editModalSubmitBtn, settings);
});

addModalCloseBtn.addEventListener("click", () => {
  closeModal(addModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

editModalFormElement.addEventListener("submit", handleEditModalFormSubmit);
addModalFormElement.addEventListener("submit", handleAddModalFormSubmit);

api.getInitialCards().then((cards) => {
  cards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
  });
}).catch(console.error);

enableValidation(settings);
