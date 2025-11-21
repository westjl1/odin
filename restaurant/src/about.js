function loadAbout() {
  const main = document.querySelector("#content");

  main.innerHTML = "";

  const content = `
    <h1>Welcome to Odin's Restaurant About Page</h1>
    <p>Experience the finest dining with us!</p>
  `;

  main.innerHTML = content;
}

export default loadAbout;
