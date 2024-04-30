const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store cards data
const cardsData = [
  {
    question: "What must a variable begin with?",
    answer: "A letter, $ or _",
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data",
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable",
  },
];

// Create all cards
const createCards = () => {
  cardsData.forEach((cardData, i) => createCard(cardData, i));
};

// Create a single card
const createCard = (cardData, i) => {
  const card = document.createElement("div");
  card.classList.add("card");

  if (i === 0) {
    card.classList.add("active");
  }

  const innerCard = document.createElement("div");
  innerCard.classList.add("inner-card");

  const innerCardFront = document.createElement("div");
  innerCardFront.classList.add("inner-card-front");

  const innerCardBack = document.createElement("div");
  innerCardBack.classList.add("inner-card-back");

  const questionParagraph = document.createElement("p");
  questionParagraph.textContent = cardData.question;

  const answerParagraph = document.createElement("p");
  answerParagraph.textContent = cardData.answer;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  innerCardBack.appendChild(answerParagraph);
  innerCardFront.appendChild(questionParagraph);

  innerCard.append(innerCardFront, innerCardBack);

  card.appendChild(innerCard);

  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
};

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

createCards();
