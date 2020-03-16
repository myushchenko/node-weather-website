const API_URL = "http://localhost:3000/weather";

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const msgOne = document.querySelector("#msgOne");
const msgTwo = document.querySelector("#msgTwo");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const address = searchInput.value;

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`${API_URL}?address=${address}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
