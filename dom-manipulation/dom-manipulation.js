const container = document.querySelector("#container");

const content = document.createElement("div");
const paragraph = document.createElement("p");
const headerThree = document.createElement("h3");
const divOne = document.createElement("div");
const subHeaderOne = document.createElement("h1");
const subParagraph = document.createElement("p");

divOne.appendChild(subHeaderOne);
divOne.appendChild(subParagraph);

content.classList.add("content");
content.textContent = "This is the glorious text-content!";

paragraph.style.color = "red";
paragraph.textContent = "Hey I'm red";

headerThree.style.color = "blue";
headerThree.textContent = "I'm a blue h3!";

divOne.style.cssText = "border: solid black; background: pink;";

subHeaderOne.textContent = "I'm in a div";
subParagraph.textContent = "ME TOO";

content.appendChild(paragraph);
content.appendChild(headerThree);
content.appendChild(divOne);

container.appendChild(content);

const btn = document.querySelector("#btn");
btn.onclick = () => alert("Hello World");

const btnTwo = document.querySelector("#btnTwo");
btnTwo.addEventListener("click", (e) => {
  console.log(e);
  alert("Hello World");
});

function alertFunction() {
  alert("YAY! YOU DID IT!");
}

const buttons = document.querySelectorAll("#containerTwo > button");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});
