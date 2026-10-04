// Variables
const hasil = document.querySelector("#hasil");
const resultText = document.querySelector("#resultText");

// Functions
function validation() {
  const tMatch = parseFloat(document.querySelector("#tMatch").value);
  const tWr = parseFloat(document.querySelector("#tWr").value);
  const lsReq = parseFloat(document.querySelector("#lsReq").value);

  if (isNaN(tMatch) || isNaN(tWr) || isNaN(lsReq)) return display(`Semua kolom harus diisi.`);
  if (lsReq % 1 != 0 || tMatch % 1 != 0) return display(`Field harus bilangan bulat`);
  if (tMatch < 0 || tWr < 0 || lsReq < 0) return display(`Field tidak boleh lebih kecil dari 0`);
  if (tWr > 100) return display(`WR tidak boleh lebih dari 100%`);
  if (tMatch + lsReq === 0) return display(`Total match atau lose streak harus lebih dari 0`);

  const totalNum = total(tMatch, tWr, lsReq);
  display(`Jika kamu lose streak sebanyak <b>${lsReq}</b> kali, maka winrate kamu menjadi <b>${totalNum}%</b>`);
}

function display(text) {
  resultText.innerHTML = text;
}

// Sebelumnya ada cabang "totalNum < 0" yang tidak pernah terpenuhi
// (nilai berupa string toFixed dan WR tidak mungkin negatif); dihapus.
function total(tMatch, tWr, lsReq) {
  const win = Math.round((tMatch * tWr) / 100);
  return ((win / (tMatch + lsReq)) * 100).toFixed(1);
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
