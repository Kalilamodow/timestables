import { betterNumberInput, getInput } from "./extras";

const MENU_HTML = `
<label for="menu_maxNumber">Select Min:</label>
<input type="number" id="menu_minNumber" value="1" min="0">
<br>
<label for="menu_maxNumber">Select Max:</label>
<input type="number" id="menu_maxNumber" value="10" min="0">
<br>
<label for="menu_lockInNum">Lock Number:</label>
<input type="number" id="menu_lockInNum" value="" min="0">
<br>
<button type="button" id="menu_playButton">Play</button>
`;

function loadMenu(appLoad: (min: number, max: number, lock?: number) => any) {
  document.querySelector("main").innerHTML = MENU_HTML;

  betterNumberInput("menu_maxNumber");
  betterNumberInput("menu_minNumber");
  betterNumberInput("menu_lockInNum");

  document
    .getElementById("menu_playButton")
    .addEventListener("click", () => {
      const minInput = getInput("menu_minNumber")
      const maxInput = getInput("menu_maxNumber");
      const lockInput = getInput("menu_lockInNum") || "-1";

      appLoad(parseInt(minInput), parseInt(maxInput), parseInt(lockInput));
    });
}

export default loadMenu;
