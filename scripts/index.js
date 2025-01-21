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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

const likeBtn = document.querySelector(".card__like-btn");
const deleteBtn = document.querySelector(".card__delete-btn");

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

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
  .querySelector(".card")
  .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
};

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
};



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

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}


function handleAddModalFormSubmit(evt) {

  evt.preventDefault();
  console.log(addModalNameInput);
  console.log(addModalCardInput);
  const inputValues = { name: "", link: "" };
  const addCardElement = getCardElement(inputValues);
  cardsList.append(addCardElement);
  closeModal(addModal);
};

/*
function deleteButton() {

};

function likeButton() {

};*/

/*
Get the button element
const myButton = document.getElementById('myButton');

Define the function to be executed when the button is clicked
function handleClick() { alert('Button was clicked!'); }

Attach the event listener to the button
myButton.addEventListener('click', handleClick);



function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  //Below is where you need to select the card’s interactive elements and set the appropriate event listeners on them.
  select like btn element
  (likeBtn)

  attach event listener to like btn
  likeBtn.addEventListener(("click"), () => {
    change icon to heartLiked.svg
});

  select delete button
  (deleteBtn)

  deleteBtn.addEventListener(("click"), () => {
  });


  return cardElement;
}

Note that for the like and delete icons, as well as for the preview image modal,
you’ll need to set a listener on each individual card.



*/

editModalFormElement.addEventListener("submit", handleEditModalFormSubmit);
addModalFormElement.addEventListener("submit", handleAddModalFormSubmit);


initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
