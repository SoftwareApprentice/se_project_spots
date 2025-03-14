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
const profileFormElement = modalProfile.querySelector(".modal__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

const modalPost = document.querySelector("#add-card-modal");
const postCloseButton = modalPost.querySelector(".modal__button-close");
const postFormElement = modalPost.querySelector(".modal__form");
const imageInput = postFormElement.querySelector("#add-card-link-input");
const captionInput = postFormElement.querySelector("#add-card-name-input");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const post = {
    name: captionInput.value,
    link: imageInput.value,
  };
  cardContainer.prepend(getCardElement(post));
  captionInput.value = "";
  imageInput.value = "";
  closeModal(modalPost);
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
  cardLikeButton.addEventListener("click", () =>
    cardLikeButton.classList.toggle("card__like-btn_liked")
  );

  cardDeleteButton.addEventListener("click", () =>
    cardDeleteButton.closest(".card").remove()
  );

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(modalProfile);
});

profileCloseButton.addEventListener("click", () => closeModal(modalProfile));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", () => openModal(modalPost));

postCloseButton.addEventListener("click", () => closeModal(modalPost));

postFormElement.addEventListener("submit", handlePostFormSubmit);

initialCards.forEach((card) => cardContainer.append(getCardElement(card)));
