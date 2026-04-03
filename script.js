/**
 * Editable quiz data.
 * Add more objects to this array to extend the quiz flow.
 */
const quizQuestions = [
  {
    id: "identity",
    question: "What are you?",
    options: ["Girl", "Boy"],
  },
  {
    id: "discord",
    question: "Do you have Discord? Visit my group in my description in the channel",
    options: ["Yes, I have Discord", "No, I don’t have Discord"],
  },
];

const state = {
  currentIndex: 0,
  answers: {},
};

const content = document.getElementById("content");
const stepText = document.getElementById("step-text");
const progressValue = document.getElementById("progress-value");
const progressCircle = document.querySelector(".progress-circle");
const progressIndicator = document.querySelector(".indicator");

const PROGRESS_CIRCLE_LENGTH = 2 * Math.PI * 52;

function updateProgress() {
  const percent = Math.round((Object.keys(state.answers).length / quizQuestions.length) * 100);
  const dashOffset = PROGRESS_CIRCLE_LENGTH * (1 - percent / 100);

  progressIndicator.style.strokeDasharray = `${PROGRESS_CIRCLE_LENGTH}`;
  progressIndicator.style.strokeDashoffset = `${dashOffset}`;
  progressValue.textContent = `${percent}%`;
  progressCircle.setAttribute("aria-valuenow", String(percent));
}

function updateStep() {
  if (state.currentIndex < quizQuestions.length) {
    stepText.textContent = `Step ${state.currentIndex + 1} of ${quizQuestions.length}`;
  } else {
    stepText.textContent = "All steps complete";
  }
}

function renderQuestion() {
  const currentQuestion = quizQuestions[state.currentIndex];

  content.innerHTML = "";
  const panel = document.createElement("article");
  panel.className = "panel";

  const question = document.createElement("h2");
  question.className = "question";
  question.textContent = currentQuestion.question;

  const options = document.createElement("div");
  options.className = "options";

  currentQuestion.options.forEach((optionText) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = optionText;

    button.addEventListener("click", () => {
      state.answers[currentQuestion.id] = optionText;
      button.classList.add("selected");
      updateProgress();

      setTimeout(() => {
        state.currentIndex += 1;
        showCurrentScreen();
      }, 320);
    });

    options.append(button);
  });

  panel.append(question, options);
  content.append(panel);

  requestAnimationFrame(() => panel.classList.add("show"));
}

function renderCompletion() {
  content.innerHTML = "";

  const panel = document.createElement("article");
  panel.className = "panel";

  const title = document.createElement("h2");
  title.className = "completion-title";
  title.textContent = "You’re done";

  const subtext = document.createElement("p");
  subtext.className = "completion-subtext";
  subtext.textContent = "Thanks for answering. Here is a quick summary of your responses.";

  const summary = document.createElement("dl");
  summary.className = "summary";

  quizQuestions.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "summary-item";

    const term = document.createElement("dt");
    term.textContent = item.question;

    const detail = document.createElement("dd");
    detail.textContent = state.answers[item.id] || "No answer";

    wrapper.append(term, detail);
    summary.append(wrapper);
  });

  const restartButton = document.createElement("button");
  restartButton.type = "button";
  restartButton.className = "restart-btn";
  restartButton.textContent = "Start Again";
  restartButton.addEventListener("click", restartQuiz);

  panel.append(title, subtext, summary, restartButton);
  content.append(panel);

  requestAnimationFrame(() => panel.classList.add("show"));
}

function showCurrentScreen() {
  updateStep();

  if (state.currentIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    renderCompletion();
  }
}

function restartQuiz() {
  state.currentIndex = 0;
  state.answers = {};
  updateProgress();
  showCurrentScreen();
}

updateProgress();
showCurrentScreen();
