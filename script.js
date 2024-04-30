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

// Get cards from local storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
};

// Add card to local storage
const setCardsData = (cardsData) => {
  localStorage.setItem("cards", JSON.stringify(cardsData));
  window.location.reload();
};

// Store cards data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

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

// Event Listeners
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cards");
  cardsContainer.innerHTML = "";
  window.location.reload();
});
