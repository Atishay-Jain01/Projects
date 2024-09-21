const input = document.getElementById("search-input"); //id in class input tag
const description = document.getElementById("description-text"); 
const img = document.getElementById("description-img");
const locBtn = document.getElementById("loc-btn");
const section = document.querySelector("section"); //by container or tag-name
const form = document.querySelector("form");
//DOM=html code to js object convert (document.id), this js obj is DOM, tree like structure
//to provide functionality
//1. getelmentbyid - method of js, fetch any element, assigned using html-id, returns single obj
//2. (by classname-array like obj, returns multiple items)
//3. (by tag-name)
function getData(e) {
  e.preventDefault();

  if (!input.value) {
    alert("Please Enter a city name");
    return;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=ca695dcbc66c5fa3d0cb955033fd918f`
    )
      //promise ke 2 states
      //1.fulfill - (i)then - output of promise (ii)catch - error handle
      //2.reject
      //agar resolve ho gya ho toh json format mey convert kr do
      .then((res) => res.json()) //res(resolve) comes under promise(any thing prarallel execute)
      .then((data) => { //promise ke andar paas hota h callback fn
        //why .then? to resolve promise
        // console.log(data);
        displayWeather(data); //if resolve then display weather(everyhting in background)
        document.getElementById("city").style.display = "block";
      });
  }
}

function getLocationData() {
  if (!navigator.geolocation) {
    alert("geolocation is not supported!");
    return;
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=ca695dcbc66c5fa3d0cb955033fd918f`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          displayWeather(data);
          document.querySelector("header h5").style.display = "none";
          document.getElementById("city").textContent = "current location";
        });
    });
  }
}
//load-method of event listener
//backend activity catch by eventlistener like hover double click, click
addEventListener("load", () => {
  const date = document.getElementById("date");

  const d = new Date();
  let currentDate = d.toString().slice(4, 15);

  date.innerHTML = currentDate; //innerHTML - existing content change krne ka tareeka
});

function displayWeather(data) {
  document.querySelector("header h5").style.display = "block";

  const temp = (data.main.temp - 273.15).toFixed(1);
  console.log(temp);

  document.getElementById("temperature-degree").textContent = temp + "°";
  document.getElementById("city").textContent = input.value;

  document.getElementById("humidity-degree").textContent =
    data.main.humidity + " %";
  document.getElementById("feelslike-degree").textContent =
    (data.main.feels_like - 273.15).toFixed(1) + " °";

  description.textContent = data.weather[0].description;

  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  section.style.display = "block";
  section.classList.add("test");
  document.getElementById("city").style.display = "block";
  locBtn.style.display = "none";

  // console.log(document.getElementById("city"));
}

form.addEventListener("submit", getData);
