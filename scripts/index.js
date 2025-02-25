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

const profileEditButton = document.querySelector(".profile__edit-btn");

const modalProfile = document.querySelector("#edit-profile-modal");
const modalCloseButton = modalProfile.querySelector(".modal__button-close");

function closeModal() {
  modalProfile.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  modalProfile.classList.add("modal_opened");
});
modalCloseButton.addEventListener("click", closeModal);

const profileFormElement = document.forms["profile-form"];

const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;

  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardContainer = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = document
    .querySelector("#card-template")
    .content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  cardContainer.append(getCardElement(initialCards[i]));
}
