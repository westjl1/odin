const calculatorDiv = document.querySelector(".calculator");

const inputElement = document.createElement("div");
inputElement.id = "input-element";
const buttonDiv = document.createElement("div");
buttonDiv.classList.add("buttons");
buttonDiv.addEventListener("click", (e) => handleButtonClick(e));

const OPERATORS = ["+", "-", "*", "/"];

let lastTotal = null;

function handleButtonClick(event) {
  //console.log(inputElement.textContent.split(/([*/=+]|(?<=[0-9])[\\-])/)[2]);
  //If element already includes an =
  //and there's a value in last total
  //and the button clicked is a opperator
  if (
    inputElement.textContent.split("").includes("=") &&
    lastTotal != null &&
    OPERATORS.includes(event.target.textContent)
  ) {
    inputElement.textContent = lastTotal += event.target.textContent;
  }
  //if element already includes an =
  //and button clicked is a number
  //reset lastTotal and set input to number entered
  else if (
    inputElement.textContent.split("").includes("=") &&
    !isNaN(event.target.textContent) &&
    lastTotal != null
  ) {
    lastTotal = null;
    inputElement.textContent = event.target.textContent;
  } else if (event.target.textContent == "Cls") {
    lastTotal = null;
    inputElement.textContent = "";
  } else if (event.target.textContent == "=") {
    inputElement.textContent += event.target.textContent;
    doMath();
  } else if (
    //if the button is an operator
    //and the last element in input is NOT a number
    //and the inputElement output already has an operator
    OPERATORS.includes(event.target.textContent) &&
    inputElement.textContent.split(/([*/=+]|(?<=[0-9])[\\-])/)[2] === "" &&
    (inputElement.textContent.split("").includes("+") ||
      inputElement.textContent.split("").includes("-") ||
      inputElement.textContent.split("").includes("*") ||
      inputElement.textContent.split("").includes("/"))
  ) {
    alert("Already have an operator");
  } else if (
    //if the button is an operator
    //and the last element in input IS a number
    //and the inputElement output already has an operator
    OPERATORS.includes(event.target.textContent) &&
    String(inputElement.textContent.split(/([*/=+]|(?<=[0-9])[\\-])/)[2])
      .length > 0 &&
    (inputElement.textContent.split("").includes("+") ||
      inputElement.textContent.split("").includes("-") ||
      inputElement.textContent.split("").includes("*") ||
      inputElement.textContent.split("").includes("/"))
  ) {
    doMath(event.target.textContent);
  } else {
    inputElement.textContent += event.target.textContent;
  }
}

function doMath(opSign = null) {
  calculationArray = inputElement.textContent.split(/([*/=+]|(?<=[0-9])[\\-])/);

  //   console.log(calculationArray);

  if (findExceptions(calculationArray) == false) {
    if (calculationArray[1] == "=") {
      lastTotal = calculationArray[0];
    } else if (calculationArray[1] == "+") {
      lastTotal = +calculationArray[0] + +calculationArray[2];
    } else if (calculationArray[1] == "-") {
      lastTotal = calculationArray[0] - calculationArray[2];
    } else if (calculationArray[1] == "*") {
      lastTotal = calculationArray[0] * calculationArray[2];
    } else if (calculationArray[1] == "/") {
      lastTotal = calculationArray[0] / calculationArray[2];
    }

    inputElement.textContent += lastTotal;
    if (opSign) inputElement.textContent = lastTotal + opSign;
  }
}

function findExceptions(calcArray) {
  if (calcArray[1] == "/" && calcArray[2] <= "0") {
    alert("Nope, there'll be no deviding by zero here!");
    inputElement.textContent = "";
    lastTotal = null;
    return true;
  }
  return false;
}

function createButtons() {
  const oneBtn = document.createElement("button");
  oneBtn.textContent = "1";
  oneBtn.id = "one";
  buttonDiv.appendChild(oneBtn);

  const twoBtn = document.createElement("button");
  twoBtn.textContent = "2";
  twoBtn.id = "two";
  buttonDiv.appendChild(twoBtn);

  const threeBtn = document.createElement("button");
  threeBtn.textContent = "3";
  threeBtn.id = "three";
  buttonDiv.appendChild(threeBtn);

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";
  plusBtn.id = "plus";
  buttonDiv.appendChild(plusBtn);

  const fourBtn = document.createElement("button");
  fourBtn.textContent = "4";
  fourBtn.id = "four";
  buttonDiv.appendChild(fourBtn);

  const fiveBtn = document.createElement("button");
  fiveBtn.textContent = "5";
  fiveBtn.id = "five";
  buttonDiv.appendChild(fiveBtn);

  const sixBtn = document.createElement("button");
  sixBtn.textContent = "6";
  sixBtn.id = "six";
  buttonDiv.appendChild(sixBtn);

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "-";
  minusBtn.id = "minus";
  buttonDiv.appendChild(minusBtn);

  const sevenBtn = document.createElement("button");
  sevenBtn.textContent = "7";
  sevenBtn.id = "seven";
  buttonDiv.appendChild(sevenBtn);

  const eightBtn = document.createElement("button");
  eightBtn.textContent = "8";
  eightBtn.id = "eight";
  buttonDiv.appendChild(eightBtn);

  const nineBtn = document.createElement("button");
  nineBtn.textContent = "9";
  nineBtn.id = "nine";
  buttonDiv.appendChild(nineBtn);

  const multiplyBtn = document.createElement("button");
  multiplyBtn.textContent = "*";
  multiplyBtn.id = "multiply";
  buttonDiv.appendChild(multiplyBtn);

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Cls";
  clearBtn.id = "clear";
  buttonDiv.appendChild(clearBtn);

  const zeroBtn = document.createElement("button");
  zeroBtn.textContent = "0";
  zeroBtn.id = "zero";
  buttonDiv.appendChild(zeroBtn);

  const equalBtn = document.createElement("button");
  equalBtn.textContent = "=";
  equalBtn.id = "equal";
  buttonDiv.appendChild(equalBtn);

  const divideBtn = document.createElement("button");
  divideBtn.textContent = "/";
  divideBtn.id = "divide";
  buttonDiv.appendChild(divideBtn);
}

createButtons();
calculatorDiv.appendChild(inputElement);
calculatorDiv.appendChild(buttonDiv);
