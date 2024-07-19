const pChoice = document.querySelector(".p-choice");
const pImg = pChoice.previousElementSibling;

const cChoice = document.querySelector(".c-choice");
const cImg = cChoice.previousElementSibling;

const weapons = document.querySelectorAll(".img");
const result = document.querySelector(".result");
const score = document.querySelector(".score");

let wins = localStorage.getItem("wins") || 0;
let losses = localStorage.getItem("losses") || 0;
let totalGames = localStorage.getItem("totalGames") || 0;

score.innerHTML = `Wins: ${wins} Losses: ${losses} Total Games: ${totalGames}`;

function randomNumber() {
  return Math.floor(Math.random() * 3);
}

function computer() {
  const choices = ["paper", "rock", "scissors"];
  const ele = choices[randomNumber()];
  cImg.src = `images/${ele}.png`;
  cImg.id = ele;
  cChoice.innerHTML = ele;
}

weapons.forEach((weapon) => {
  weapon.addEventListener("click", () => {
    const item = weapon.childNodes[1];
    pImg.src = item.src;
    pImg.id = weapon.id;
    pChoice.innerHTML = weapon.id;

    computer();
    check(cImg.id, pImg.id);
  });
});

function check(a, b) {
  let msg;
  
  if (a == b) {
    msg = "DRAW";
  }
  else if ((a == "rock" && b == "paper") || (a == "paper" && b == "scissors") || (a == "scissors" && b == "rock")) {
    wins++;
    msg = "You Win!";
  } else {
    losses++;
    msg = "You Lose!";
  }

  totalGames++;
  score.innerHTML = `Wins: ${wins} Losses: ${losses} Total Games: ${totalGames}`;

  // Display the result
  result.innerHTML = msg;
  document.body.style.pointerEvents = "none";

  setInterval(() => {
    result.innerHTML += ".";
  }, 700);

  // Store the updated score in localStorage
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
  localStorage.setItem("totalGames", totalGames);

  setTimeout(() => {
    location.reload();
  }, 2200);
}