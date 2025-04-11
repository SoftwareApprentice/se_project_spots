const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//edit-profile
const profileEditButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__add-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//card elements
const cardContainer = document.querySelector(".cards__list");

//form elements
const modalProfile = document.querySelector("#edit-profile-modal");
const profileCloseButton = modalProfile.querySelector(".modal__button-close");
const profileFormElement = document.forms["profile-form"];
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");
const profileSubmitButton =
  profileFormElement.querySelector(".form__button-save");

const modalPost = document.querySelector("#add-card-modal");
const postCloseButton = modalPost.querySelector(".modal__button-close");
const postFormElement = document.forms["add-card-form"];
const imageInput = postFormElement.querySelector("#add-card-link-input");
const captionInput = postFormElement.querySelector("#add-card-name-input");
const postSubmitButton = postFormElement.querySelector(".form__button-save");

//preview elements
const modalPreview = document.querySelector(".modal_type_preview");
const previewImage = modalPreview.querySelector(".modal__image");
const previewCaption = modalPreview.querySelector(".modal__caption");
const previewCloseButton = modalPreview.querySelector(".modal__button-close");

function escapeModal(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function clickOutModal(evt) {
  const modal = document.querySelector(".modal_opened");
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeModal);
  document.addEventListener("click", clickOutModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeModal);
  document.removeEventListener("click", clickOutModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(modalProfile);
  disableButton(profileSubmitButton, settings);
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const post = {
    name: captionInput.value,
    link: imageInput.value,
  };
  renderCard(post, "prepend");
  evt.target.reset();
  closeModal(modalPost);
  disableButton(postSubmitButton, settings);
}

function getCardElement(data) {
  const cardElement = document
    .querySelector("#card-template")
    .content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  //open modal on image
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(modalPreview);
  });

  cardLikeButton.addEventListener("click", () =>
    cardLikeButton.classList.toggle("card__like-btn_liked")
  );

  cardDeleteButton.addEventListener("click", () =>
    cardDeleteButton.closest(".card").remove()
  );

  return cardElement;
}

function renderCard(cardData, method = "prepend") {
  const card = getCardElement(cardData);
  cardContainer[method](card);
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
  openModal(modalProfile);
});

const closeButtons = document.querySelectorAll(".modal__button-close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", () => openModal(modalPost));

postFormElement.addEventListener("submit", handlePostFormSubmit);

initialCards.forEach((card) => renderCard(card, "append"));
