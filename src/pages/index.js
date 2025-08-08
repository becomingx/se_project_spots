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
import {setSaveButtonText} from "/src/utils/helpers.js";
import "../pages/index.css";
import "../vendor/normalize.css";
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
const avatarModalSubmitBtn = avatarModal.querySelector(".modal__submit-btn");

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
const deleteCardModalBtn = deleteCardModal.querySelector(".modal__submit-btn");
const deleteCardModalCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardModalForm = deleteCardModal.querySelector(".modal__form"); 

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

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

  likeBtn.addEventListener("click", (evt) => {
    handleLikeBtnToggle(evt, data._id);
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


//handlers
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    };
  };
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
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
  const avatarSubmit = avatarModalSubmitBtn;
  setSaveButtonText(avatarSubmit, true);

  api.editUserAvatar({avatar: avatarModalUrlInput.value})
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setSaveButtonText(avatarSubmit, false);
    });
};

const handleEditModalFormSubmit = (evt) => {
  evt.preventDefault();
  const editSubmit = editModalSubmitBtn;
  setSaveButtonText(editSubmit, true);

  api.editUserInfo({name: editModalNameInput.value, about: editModalDescriptionInput.value})
  .then((data) => {  
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(editModal);
  })
  .catch(console.error)
  .finally(() => {
    setSaveButtonText(editSubmit, false);
  });

};

const handleAddModalFormSubmit = (evt) => {
  evt.preventDefault();
  const addSubmit = addModalSubmitBtn;
  setSaveButtonText(addSubmit, true);

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
    })
    .finally(() => {
      setSaveButtonText(addSubmit, false);
    });
};

const handleDeleteCard = (cardElement, data) => {
  selectedCard = cardElement;
  selectedCardId = data._id; 
  openModal(deleteCardModal);
};

const handleDeleteCardSubmit = () => {
  const deleteSubmit = deleteCardModalBtn;
  setSaveButtonText(deleteSubmit, true, "Delete", "Deleting...");
  
  api.removeCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteCardModal);
  })
  .catch(console.error)
  .finally(() => {
    setSaveButtonText(deleteSubmit, false, "Delete", "Deleting...");
  });  
};

const handleLikeBtnToggle = (evt, cardId) => {  
  const isLiked = evt.target.classList.contains("card__like-btn-liked");
  api.toggleLikeCard(cardId, isLiked)
    .then((updatedCard) => {
      evt.target.classList.toggle("card__like-btn-liked");
    })
    .catch((error) => {
      console.error("Error liking card:", error);
    });
};

//event listeners
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


enableValidation(settings); 