function loadMenu() {
  const main = document.querySelector("#content");

  main.innerHTML = "";

  const content = `
    <h1>Welcome to Odin Restaurant</h1>
    <p>Please experience our fine menu!</p>
  `;

  main.innerHTML = content;
}

export default loadMenu;
