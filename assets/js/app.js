const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

let textPrevious = "";
let textCurrent = "0";
let operation = "";
let equalsOrPercentPressed = false;

numberButtons.forEach((btn) => {
  btn.onclick = () => {
    beforeScreen(btn);
    updateScreen();
  };
});

const beforeScreen = (btn) => {
  if (btn.textContent != "0" && btn.textContent != "." && textCurrent == "0") {
    textCurrent = btn.textContent;
    return;
  }

  if (equalsOrPercentPressed) {
    textCurrent = btn.textContent;
    equalsOrPercentPressed = false;
    return;
  }

  if (btn.textContent === "." && textCurrent == "") return;

  if (btn.textContent === "." && textCurrent.includes(".")) return;

  if (btn.textContent === "0" && textCurrent === "0") return;

  textCurrent += btn.textContent;
};

const updateScreen = () => {
  current.textContent = textCurrent;
  if (operation != null) {
    previous.textContent = `${textPrevious} ${operation}`;
  }
  if (textCurrent.toString().length > 9)
    textCurrent = textCurrent.toString().slice(0, 9);
};

operationButtons.forEach((btn) => {
  btn.onclick = () => {
    if (textPrevious && textCurrent == "") {
      operation = btn.textContent;
      updateScreen();
    }
    if (textCurrent === "") return;
    if (textCurrent && textPrevious) calculate();
    operation = btn.textContent;
    textPrevious = textCurrent;
    textCurrent = "";
    updateScreen();
  };
});

equalButton.onclick = () => {
  calculate();
  updateScreen();
  equalsOrPercentPressed = true;
};

const calculate = () => {
  let result;
  switch (operation) {
    case "+":
      result = +textPrevious + +textCurrent;
      break;
    case "−":
      result = textPrevious - textCurrent;
      break;
    case "×":
      result = textPrevious * textCurrent;
      break;
    case "÷":
      result = textPrevious / textCurrent;
      break;
    default:
      break;
  }
  textCurrent = result;
  textPrevious = "";
  operation = "";
};

acButton.onclick = () => {
  textPrevious = "";
  textCurrent = "0";
  operation = "";
  updateScreen();
};

pmButton.onclick = () => {
  if (!textCurrent) return;
  textCurrent *= -1;
  updateScreen();
};

percentButton.onclick = () => {
  if (!textCurrent) return;

  textCurrent /= 100;
  updateScreen();

  equalsOrPercentPressed = true;
};
