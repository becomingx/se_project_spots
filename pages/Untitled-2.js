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
];
const profileAddBtn = document.querySelector(".profile__add-btn")
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editModalFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

const addModal = document.querySelector("#add-card-modal");
const addModalFormElement = addModal.querySelector(".add-card-form");
const addModalCloseBtn = addModal.querySelector(".modal__close-btn");
const addModalCardInput = addModal.querySelector("#add-card-link-input");
const addModalDescriptionInput = addModal.querySelector("#add-card-description-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content;
  .querySelector(".card");
  .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

/*function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");

}*/

/*
function openModal() {
    // openModal now accepts a modal as an argument.
    // This argument should be the appropriate HTML element.
    // Open the modal that was passed as an argument.
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    editModal.classList.add("modal_opened");

    addModal.classList.add("modal_opened");

  };

  profileAddBtn.addEventListener("click", () => {
    // Use an arrow function and call the openModal method inside it.
    // Pass it the appropriate modal as an argument.
    openModal(addModal);
  });

  profileEditBtn.addEventListener("click", () => {
    // Use an arrow function and call the openModal method inside it.
    // Pass it the appropriate modal as an argument.
    openModal(editModal);
  });


  function closeModal() {
    editModal.classList.remove("modal_opened");
    addModal.classList.remove("modal_opened");
  }

  function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal();
  }

  profileAddBtn.addEventListener("click", openModal);
  profileEditBtn.addEventListener("click", openModal);
  addModalCloseBtn.addEventListener("click", closeModal);
  editModalCloseBtn.addEventListener("click", closeModal);
  editModalFormElement.addEventListener("submit", handleEditFormSubmit);


  /*for (let i = 0; i < initialCards.length; i++) {
    const cardElement = getCardElement(initialCards[i]);
    cardsList.prepend(cardElement);
    }*/

    /*initialCards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    */