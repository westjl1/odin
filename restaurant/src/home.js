function loadHome() {
  const main = document.querySelector("#content");

  main.innerHTML = "";

  const content = `
    <h1>Welcome to Odin's Restaurant</h1>
    <p>Experience the finest dining with us!</p>
  `;

  main.innerHTML = content;
}

export default loadHome;
