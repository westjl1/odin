//Create form, fieldset and inputs
const formElement = document.createElement("form");
const fieldSetElement = document.createElement("fieldset");
const emailInput = document.createElement("input");
const countryInput = document.createElement("input");
const zipCodeInput = document.createElement("input");
const passwordInput = document.createElement("input");
const confirmPasswordInput = document.createElement("input");

//Create and configure labels
const emailLabel = document.createElement("label");
emailLabel.for = "email";
emailLabel.textContent = "Email";
const countryLabel = document.createElement("label");
countryLabel.for = "country";
countryLabel.textContent = "Country";
const zipCodeLabel = document.createElement("label");
zipCodeLabel.for = "zip";
zipCodeLabel.textContent = "Zip";
const passwordLabel = document.createElement("label");
passwordLabel.for = "password";
passwordLabel.textContent = "Password";
const confirmPasswordLabel = document.createElement("label");
confirmPasswordLabel.for = "confirm-password";
confirmPasswordLabel.textContent = "Confirm Password";

//Create error spans
const emailError = document.createElement("span");
emailError.className = "error-span";
const countryError = document.createElement("span");
countryError.className = "error-span";
const zipCodeError = document.createElement("span");
zipCodeError.className = "error-span";
const passwordError = document.createElement("span");
passwordError.className = "error-span";
confirmPasswordError = document.createElement("span");
confirmPasswordError.className = "error-span";

//Create submit and canel buttons
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.type = "submit";
submitButton.value = "submit";

//Create p's for inputs and styling
const emailP = document.createElement("p");
const countryP = document.createElement("p");
const zipCodeP = document.createElement("p");
const passwordP = document.createElement("p");
const confirmPasswordP = document.createElement("p");

//Per form validation assingment in Odin
// formElement.setAttribute("novalidate", true);
formElement.noValidate = true;

//email regexp helpers
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;
const isValidEmail = () => {
  const validity =
    emailInput.value.length !== 0 && emailRegExp.test(emailInput.value);
  return validity;
};

emailInput.id = "email";
emailInput.name = "email";
emailInput.setAttribute("required", true);
emailInput.type = "email";
emailInput.addEventListener("blur", () => {
  if (!isValidEmail()) {
    emailInput.validity = false;
    emailError.textContent = "Please correct e-mail";
    emailError.classList.remove("error-span");
    emailError.classList.add("error-message");
  } else {
    emailInput.validity = true;
    emailError.textContent = "";
    emailError.classList.remove("error-message");
    emailError.classList.add("error-span");
  }
});

//Helper for country input
const isValidCountry = () => {
  const validity = countryInput.value.length !== 2;
  return validity;
};

countryInput.type = "text";
countryInput.id = "country";
countryInput.name = "country";
countryInput.addEventListener("blur", () => {
  if (!isValidCountry()) {
    //do something with classes
    //update a span with error
  } else {
    //update a span with no error
  }
});

zipCodeInput.type = "text";
zipCodeInput.id = "zip";
zipCodeInput.name = "zip";

passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.name = "password";
passwordInput.setAttribute("required", true);

confirmPasswordInput.type = "password";
confirmPasswordInput.id = "confirm-password";
confirmPasswordInput.name = "confirm-password";
confirmPasswordInput.setAttribute("required", true);
confirmPasswordInput.addEventListener("blur", () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Password must match");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isValidCountry()) {
    //Do something here but will probably shift to hanlder soon
  } else {
    //No error, setup for high 5
  }

  if (!isValidEmail()) {
    //do something here but wil be handler
  } else {
    //No error, still get's high 5
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    //Update error span
  } else {
    //update error span, no error get's high 5
  }
});

//Append child inputs/buttons to p's
emailP.appendChild(emailLabel);
emailP.appendChild(emailInput);
emailP.appendChild(emailError);

countryP.appendChild(countryLabel);
countryP.appendChild(countryInput);
countryP.appendChild(countryError);

zipCodeP.appendChild(zipCodeLabel);
zipCodeP.appendChild(zipCodeInput);
zipCodeP.appendChild(zipCodeError);

passwordP.appendChild(passwordLabel);
passwordP.appendChild(passwordInput);
passwordP.appendChild(passwordError);

confirmPasswordP.appendChild(confirmPasswordLabel);
confirmPasswordP.appendChild(confirmPasswordInput);
confirmPasswordP.appendChild(confirmPasswordError);

//append p's to fieldset
fieldSetElement.appendChild(emailP);
fieldSetElement.appendChild(countryP);
fieldSetElement.appendChild(zipCodeP);
fieldSetElement.appendChild(passwordP);
fieldSetElement.appendChild(confirmPasswordP);
fieldSetElement.appendChild(submitButton);

//append fieldset to form
formElement.appendChild(fieldSetElement);

//Form to body
document.body.appendChild(formElement);
