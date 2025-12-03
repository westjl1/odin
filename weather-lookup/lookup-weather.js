const txtLookup = document.getElementById("txtLookup");
const btnLookup = document.getElementById("btnLookup");
btnLookup.addEventListener("click", () => {
  showSpinner();
  handleWeatherLookup();
});

const txtOutputDiv = document.getElementById("txtOutput");
const imgOutputDiv = document.getElementById("imgOutput");

const loadingSpinner = document.getElementById("loading-spinner");

function showSpinner() {
  loadingSpinner.style.display = "flex"; // Or 'block', depending on your CSS
}

function hideSpinner() {
  loadingSpinner.style.display = "none";
}

function handleWeatherLookup() {
  const loc = txtLookup.value;

  lookupWeather(loc).then((weatherData) => {
    writeWeatherData(weatherData);
  });
}

function writeWeatherData(data) {
  console.log(data);

  txtOutputDiv.innerHTML = "";

  const weatherUl = document.createElement("ul");
  const locationLi = document.createElement("li");
  const descriptionLi = document.createElement("li");
  const tempLi = document.createElement("li");
  const feelsLikeLi = document.createElement("li");
  const humidityLi = document.createElement("li");

  locationLi.textContent = `Location: ${data.resolvedAddress}`;
  descriptionLi.textContent = `Description: ${data.description}`;
  tempLi.textContent = `Tempurature: ${data.currentConditions.temp}`;
  feelsLikeLi.textContent = `Feel's Like: ${data.currentConditions.feelslike}`;
  humidityLi.textContent = `Humidity: ${data.currentConditions.humidity}`;

  weatherUl.appendChild(locationLi);
  weatherUl.appendChild(descriptionLi);
  weatherUl.appendChild(tempLi);
  weatherUl.appendChild(feelsLikeLi);
  weatherUl.appendChild(humidityLi);

  txtOutputDiv.appendChild(weatherUl);

  writeWeatherGiphy(data.currentConditions.temp);
}

function writeWeatherGiphy(currentTemp) {
  imgOutputDiv.innerHTML = "";
  const giphyImg = document.createElement("img");
  let lookupText = "";
  if (currentTemp <= 60) {
    lookupText = "cold weather";
  } else if (currentTemp >= 80) {
    lookupText = "hot weather";
  } else {
    lookupText = "perfect weather";
  }

  lookupGiphy(lookupText).then((url) => {
    giphyImg.src = url;
    imgOutputDiv.appendChild(giphyImg);
    hideSpinner();
  });
}

async function lookupWeather(location) {
  const include = "current";
  const elements = "tempmax,tempmin,temp";
  const unit = "us";

  //const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BSUAZX24VMEY5RV7D5EUW6LML&unitGroup=${unit}&include=${include}&elements=${elements}`;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BSUAZX24VMEY5RV7D5EUW6LML`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function lookupGiphy(imgType = "Cats") {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=gIr5EZQhAHQYgbHXln73tQgh7QevcjKf&s=${imgType}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);
    return result.data.images.original.url;
  } catch (error) {
    console.error(error.message);
  }
}
