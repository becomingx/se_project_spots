/*Modal UX improvements

Closing the modal by clicking on the overlay
Code a feature that allows the users to close the modal 
by clicking on the overlay, i.e. anywhere outside the modal’s 
borders.

One way to manage this would be to select all the modal’s with 
querySelectorAll and loop for the resulting node list with the 
.forEach() method. In the loop, set a listener that closes 
the modal. You’ll need to check that the event target’s class 
list contains an appropriate class before closing the modal.*/



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
const previewModalImageElement = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__preview-caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn--preview");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");


/*Code a feature that allows the users to close the modal by clicking
 on the overlay, i.e. anywhere outside the modal’s borders.

 One way to manage this would be to select all the modal’s with 
 querySelectorAll and loop for the resulting node list with the 
 .forEach() method. In the loop, set a listener that closes the modal. 
 You’ll need to check that the event target’s class list contains 
 an appropriate class before closing the modal.

 2b. Closing the modal by pressing the Escape key
Code a feature that allows the users to close the modal 
by pressing the Escape key. Keep in mind the following:

Add the event listener when the modal opens and remove it when it closes. 
Not doing so will result in performance issues. Remember that you 
can’t remove an event listener that has an anonymous handler function. 
(Refer back to our lesson on the topic for a refresher: 
https://tripleten.com/trainer/web/lesson/eca742a5-806c-4672-bd9f-650d194eeb21/task/80b8c176-1555-4739-9e34-2aae9c99b059/.)

If you set the listener globally, as opposed to when you open a modal, 
every single keypress a user makes will be checked by the handler. 
Only set it when a modal is open to prevent unnecessary code execution.

If you set the listener when the modal opens but fail to remove it 
when it closes then you’ll wind up accumulating more 
and more listeners in memory. 

//pseudocode: close modal via overlay
modal onclick anywhere in overlay outisde modal borders: close modal
document.querySelectorAll(".modal")
loop resulting node list w/ forEach and set listener that closes modal within loop
make sure evt.target's class list has appropriate class before closing modal

//pseudocode: close modal via esc
add event listener when modal opens, remove when closed
(can't remove evt listener that has an anonymous handler function)

const modalOpenEscHandler = () => {
  set something that enables esc to close the modal
  }
const modalCloseEscHandler = () => {
  remove something that enables esc to close the modal
  }

modalOpenBtn.addEventListener("click", () => {
  modalOpenEscHandler();
  })

modalSubmitBtn.addEventListner("click", () => {
  modalCloseEscHandler();
  })
 */

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
  //document.removeEventListener("keydown", handleEscapeKey);
  //modal.removeEventListener("mousedown", handleClickOverlay);
};
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  //document.removeEventListener("keydown", handleEscapeKey);
  //modal.removeEventListener("mousedown", handleClickOverlay);
};

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  closeModal(editModal);

  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
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
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
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