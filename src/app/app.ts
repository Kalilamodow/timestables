import { betterNumberInput } from "./extras";

const APP_HTML = `
<header id="app_currentProblem"><span>x</span> &times; <span>y</span></header>
<input type="text" id="app_answerInput" />
<br>
<button type="button" id="app_answerSubmit">Submit</button>
<br>
<div id="app_isCorrect" correct=""></div>
<div id="app_avgTime">Average time: <span>0</span>s</div>
<footer id="app_score">0/0</footer>
`;

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const score = [0, 0];
const currQuestion = [0, 0];
let lastDate = Date.now();
const times: number[] = [1];

function reloadUI() {
  const headerEle = document.getElementById("app_currentProblem");
  headerEle.querySelector("span:first-child").textContent =
    currQuestion[0].toString();
  headerEle.querySelector("span:last-child").textContent =
    currQuestion[1].toString();

  document.getElementById(
    "app_score",
  ).innerText = `${score[0]}/${score[1]}`;

  const average = times.reduce((a, b) => a + b) / times.length;
  document.querySelector("#app_avgTime>span").textContent = (
    Math.round(average * 100) / 100
  ).toString();

  const inputEle = document.getElementById(
    "app_answerInput",
  ) as HTMLInputElement;

  inputEle.value = "";
  inputEle.focus();
}

function submitAnswer(min: number, max: number, lock: number) {
  const userAnswer = (
    document.getElementById("app_answerInput") as HTMLInputElement
  ).value.trim();

  if (!userAnswer) return;

  const correctAnswer = currQuestion[0] * currQuestion[1];

  score[1]++;
  if (userAnswer == correctAnswer.toString()) {
    score[0]++;
    document
      .getElementById("app_isCorrect")
      .setAttribute("correct", "yes");
    document.getElementById("app_isCorrect").innerHTML = "Correct!";
  } else {
    document.getElementById("app_isCorrect").setAttribute("correct", "no");
    document.getElementById(
      "app_isCorrect",
    ).innerText = `Incorrect (${correctAnswer})`;
  }

  const time = Date.now() - lastDate;
  lastDate = Date.now();
  times.push(time / 1000);

  currQuestion[0] = lock != -1 ? lock : random(min, max);
  currQuestion[1] = random(min, max);

  reloadUI();
}

function loadApp(minimum: number, maximum: number, lock = -1) {
  document.querySelector("main").innerHTML = APP_HTML;
  betterNumberInput("app_answerInput");

  document
    .getElementById("app_answerSubmit")
    .addEventListener("click", () => submitAnswer(minimum, maximum, lock));

  document
    .getElementById("app_answerInput")
    .addEventListener("keydown", event => {
      if (event.key == "Enter") submitAnswer(minimum, maximum, lock);
    });

  currQuestion[0] = random(1, maximum);
  currQuestion[1] = random(1, maximum);

  reloadUI();
}

export default loadApp;
