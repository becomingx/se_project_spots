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

const api =  new Api({ 
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "30487a64-5f71-41bb-bbbd-2f7240ebc0c2",
    "content-Type": "application/json"
  }
});

const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarModalBtn = document.querySelector(".profile__edit-avatar-btn");
const avatarModalFormElement = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarModalUrlInput = avatarModal.querySelector("#edit-avatar-url-input");

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

const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardModalCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");
const deleteCardModalCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");
const deleteCardModalBtn = deleteCardModal.querySelector(".modal__submit-btn");
const deleteCardModalCloseBtn = deleteCardModal.querySelector(".modal__close-btn") 
const deleteCardModalCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardModalForm = deleteCardModal.querySelector(".modal__form"); 

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
<<<<<<< HEAD
let selectedCard;
let selectedCardId;

=======
>>>>>>> parent of e1b9864 (se_project_se_project_spots-final delete modal complete)

let selectedCard;
let selectedCardId;


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
    openModal(deleteCardModal);
  });

  deleteCardModalBtn.addEventListener("submit", () => {
    cardElement.remove();
  })

  deleteCardModalCancelBtn.addEventListener("click", () => {
    closeModal(deleteCardModal);
  })

  deleteCardModalCloseBtn.addEventListener("click", () => {
    closeModal(deleteCardModal);
  })
  deleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
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


const handleAvatarModalFormSubmit = (evt) => {
  evt.preventDefault();

  api.editUserAvatar({avatar: avatarModalUrlInput.value})
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
};

const handleEditModalFormSubmit = (evt) => {
  evt.preventDefault();

  api.editUserInfo({name: editModalNameInput.value, about: editModalDescriptionInput.value})
  .then((data) => {  
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(editModal);
  })
  .catch(console.error);
};

const handleAddModalFormSubmit = (evt) => {
  evt.preventDefault();
  const inputValues = { 
    name: addModalNameInput.value, 
    link: addModalCardInput.value
  };
  api.createCard(inputValues)
    .then((newCardData) => {
      const addCardElement = getCardElement(newCardData);
      cardsList.prepend(addCardElement);
      evt.target.reset();
      closeModal(addModal);
      disableButton(addModalSubmitBtn, settings);
    })
    .catch((error) => {
      console.error("Error creating card:", error);
    });
};

const handleDeleteCard = (cardElement, data) => {
  selectedCard = cardElement;
  selectedCardId = data._id; 
  openModal(deleteCardModal);
};

const handleDeleteCardSubmit = () => {
  api.removeCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteCardModal);
  }).catch(console.error);  
}

deleteCardModalBtn.addEventListener("click", () => {
  openModal(deleteCardModal);
})
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
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
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});
addModalCloseBtn.addEventListener("click", () => {
  closeModal(addModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});
avatarModalCloseBtn.addEventListener("click",()  => {
  closeModal(avatarModal);
});
deleteCardModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
})
deleteCardModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
})


editModalFormElement.addEventListener("submit", handleEditModalFormSubmit);
addModalFormElement.addEventListener("submit", handleAddModalFormSubmit);
avatarModalFormElement.addEventListener("submit", handleAvatarModalFormSubmit);
deleteCardModalForm.addEventListener("submit", handleDeleteCardSubmit);


api.getAppInfo()
.then(([cards, userInfo]) => {
  cards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
  });
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
})
.catch(console.error);

<<<<<<< HEAD

enableValidation(settings); 
=======
/*
 Note that the array of cards returned by the server will be empty until
  you’ve added cards to it with the POST /cards request.
*/
>>>>>>> parent of e1b9864 (se_project_se_project_spots-final delete modal complete)

enableValidation(settings); 