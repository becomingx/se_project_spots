
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

];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

const addModal = document.querySelector("#add-card-modal");
const addModalFormElement = addModal.querySelector(".modal__form");
const addModalCloseBtn = addModal.querySelector(".modal__close-btn");
const addModalCardInput = addModal.querySelector("#add-card-link-input");
const addModalNameInput = addModal.querySelector("#add-card-name-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageElement = previewModal.querySelector(".card__image");
const previewModalCaption = previewModal.querySelector(".card__title");
const previewModalCloseBtn = previewModal.querySelector(".preview__modal_close-btn");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");


function getCardElement(data) {
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


function openModal(modal) {
  modal.classList.add("modal_opened");
};
function closeModal(modal) {
  modal.classList.remove("modal_opened");
};




function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
};

function handleAddModalFormSubmit(evt) {

  evt.preventDefault();
  const inputValues = { name: addModalNameInput.value, link: addModalCardInput.value };
  const addCardElement = getCardElement(inputValues);

  cardsList.prepend(addCardElement);
  evt.target.reset();
  closeModal(addModal);
};

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});
profileAddBtn.addEventListener("click", () => {
  openModal(addModal);
});
profileEditBtn.addEventListener("click", () => {
  openModal(editModal);
});

addModalCloseBtn.addEventListener("click", () => {
  closeModal(addModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});



editModalFormElement.addEventListener("submit", handleEditModalFormSubmit);
addModalFormElement.addEventListener("submit", handleAddModalFormSubmit);


initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
