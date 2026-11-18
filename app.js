const pumpkin = document.getElementById("pumpkin");
const candy = document.getElementById("candy");
const spell = document.getElementById("spell");
const spellBtn = document.getElementById("spellBtn");
const bag = document.getElementById("bag");
const bin = document.getElementById("bin");
const countdown = document.getElementById("countdown");

const spells = window.APP_DATA.spells;
const treats = window.APP_DATA.treats;

let count = 0;
let dragged = null;

pumpkin.addEventListener("click", function () {
  count = count + 1;
  candy.textContent = "Candy: " + count;
  pumpkin.classList.toggle("lit");
});

spellBtn.addEventListener("click", function () {
  const index = Math.floor(Math.random() * spells.length);
  spell.textContent = spells[index];
});

candy.addEventListener("click", function () {
  const index = Math.floor(Math.random() * treats.length);
  const item = document.createElement("li");
  item.textContent = treats[index];
  item.draggable = true;
  bag.appendChild(item);
});

bag.addEventListener("dragstart", function (event) {
  dragged = event.target.closest("li");
  if (!dragged) {
    return;
  }
  dragged.classList.add("dragging");
  event.dataTransfer.setData("text/plain", dragged.textContent);
  event.dataTransfer.effectAllowed = "move";
});

bag.addEventListener("dragend", function () {
  if (dragged) {
    dragged.classList.remove("dragging");
  }
  bin.classList.remove("over");
  dragged = null;
});

bin.addEventListener("dragover", function (event) {
  event.preventDefault();
  bin.classList.add("over");
});

bin.addEventListener("dragleave", function () {
  bin.classList.remove("over");
});

bin.addEventListener("drop", function (event) {
  event.preventDefault();
  bin.classList.remove("over");
  if (dragged) {
    dragged.remove();
  }
});

// Days until Halloween
function updateCountdown() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextHalloween = new Date(now.getFullYear(), 9, 31); // October 31

  if (today > nextHalloween) {
    nextHalloween = new Date(now.getFullYear() + 1, 9, 31);
  }

  const days = Math.round((nextHalloween - today) / (1000 * 60 * 60 * 24));

  if (days === 0) {
    countdown.textContent = "🎃 Happy Halloween! 🎃";
  } else if (days === 1) {
    countdown.textContent = "🎃 Only 1 day until Halloween!";
  } else {
    countdown.textContent = "🎃 Only " + days + " days until Halloween!";
  }
}

updateCountdown();
