let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let highestScore = 0;

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const btns = ["yellow", "green", "blue", "red"];

document.addEventListener("keypress", function () {
  if (!start) {
    start = true;
    console.log("Game has started");
    levelUp();
  }
});

function btnFlash(flashbtn) {
  flashbtn.classList.add("Flash");
  setTimeout(() => {
    flashbtn.classList.remove("Flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  const randIndex = Math.floor(Math.random() * btns.length);
  const randColor = btns[randIndex];
  gameSeq.push(randColor);

  const btnSelect = document.querySelector(`.${randColor}`);
  btnFlash(btnSelect);
}

function checkAns(index) {
  if (gameSeq[index] === userSeq[index]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
    if (level > highestScore) {
      highestScore = level;
      h3.innerText = `Your highest score is ${highestScore}`;
    }
  } else {
    h2.innerHTML = `Game Over, <b>Your Score was: ${level}</b> <br> Press Any Key to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function btnPress() {
  const btn = this;
  btnFlash(btn);

  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

function reset() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
