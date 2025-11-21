import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadAbout from "./about.js";
import "./styles.css";

import odinImage from "./odin.jpeg";

const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", () => {
  loadHome();
});

const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", () => {
  loadMenu();
});

const aboutButton = document.getElementById("about-button");
aboutButton.addEventListener("click", () => {
  loadAbout();
});

const imgOdin = document.createElement("img");
imgOdin.src = odinImage;
// document.body.appendChild(imgOdin);

loadHome();
