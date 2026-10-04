// Variables
const hasil = document.querySelector("#hasil");
const resultText = document.querySelector("#resultText");

// Functions
function validation() {
  const tMatch = parseFloat(document.querySelector("#tMatch").value);
  const tWr = parseFloat(document.querySelector("#tWr").value);

  if (isNaN(tMatch) || isNaN(tWr)) return display(`Semua kolom harus diisi.`);
  if (tMatch < 0 || tWr < 0) return display(`Field tidak boleh lebih kecil dari 0`);
  if (tMatch % 1 != 0) return display(`Total match harus bilangan bulat`);
  if (tWr > 100) return display(`WR tidak boleh lebih dari 100%`);

  const winNum = win(tMatch, tWr);
  const loseNum = lose(tMatch, winNum);
  display(`Total win: <b>${winNum}</b> match <br> Total lose: <b>${loseNum}</b> match`);
}

function display(text) {
  resultText.innerHTML = text;
}

function win(tMatch, tWr) {
  return Math.round(tMatch * (tWr / 100));
}

// lose = total - win, supaya win + lose selalu sama dengan total match
// (sebelumnya dibulatkan terpisah, bisa jadi total + 1 saat hasilnya x,5)
function lose(tMatch, winNum) {
  return tMatch - winNum;
}

// Main
window.addEventListener("load", init);

function init() {
  load();
  eventListener();
}

function load() {
  checkLS();
  welcomeMsg();
}

function eventListener() {
  hasil.addEventListener("click", res);
}
