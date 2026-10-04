// Variables
const hasil = document.querySelector("#hasil");
const resultText = document.querySelector("#resultText");
const EPS = 1e-9;
const fmt = (n) => n.toLocaleString("id-ID");

function validation() {
  const tMatch = parseFloat(document.querySelector("#tMatch").value);
  const tWr = parseFloat(document.querySelector("#tWr").value);
  const wrReq = parseFloat(document.querySelector("#wrReq").value);

  if (isNaN(tMatch) || isNaN(tWr) || isNaN(wrReq)) return display(`Semua kolom harus diisi.`);
  if (tMatch < 0 || tWr < 0 || wrReq < 0) return display(`Field tidak boleh lebih kecil dari 0`);
  if (tMatch % 1 != 0) return display(`Total match harus bilangan bulat`);
  if (tMatch < 1) return display(`Total match minimal 1`);
  if (wrReq > 100 || tWr > 100) return display(`WR tidak boleh lebih dari 100%`);
  if (wrReq === 0) return display(`Target WR harus lebih dari 0%`);

  // WR dari game dibulatkan, jadi jumlah win dibulatkan ke bilangan bulat
  const win = rumusWin(tMatch, tWr);
  const cur = (win / tMatch) * 100;

  if (cur > wrReq + EPS) {
    return display(`Kamu perlu <b>${fmt(rumusLose(tMatch, win, wrReq))}</b> lose tanpa win untuk mendapatkan win rate <b>${wrReq}%</b>`);
  }
  if (Math.abs(cur - wrReq) <= EPS) {
    return display(`WR kamu sudah tepat di <b>${wrReq}%</b>. Tidak perlu tambahan match.`);
  }
  if (wrReq === 100) return display(`yo ndak bisa, yang bisa cuman Monton`);

  const need = rumus(tMatch, win, wrReq);
  if (need >= 100000) {
    return display(`Kamu perlu lebih dari <b>100.000</b> win tanpa lose untuk mendapatkan win rate <b>${wrReq}%</b>`);
  }
  display(`Kamu perlu <b>${fmt(need)}</b> win tanpa lose untuk mendapatkan win rate <b>${wrReq}%</b>`);
}

function display(text) {
  resultText.innerHTML = text;
}

function rumusWin(tMatch, tWr) {
  return Math.round((tMatch * tWr) / 100);
}

// Win minimal x agar (win + x) / (tMatch + x) >= wrReq. Dibulatkan KE ATAS
// (sebelumnya Math.round, sehingga hasilnya bisa belum mencapai target).
function rumus(tMatch, win, wrReq) {
  return Math.max(1, Math.ceil((wrReq * tMatch - 100 * win) / (100 - wrReq) - EPS));
}

// Lose minimal y agar win / (tMatch + y) <= wrReq, dibulatkan ke atas.
function rumusLose(tMatch, win, wrReq) {
  return Math.max(1, Math.ceil((win * 100) / wrReq - tMatch - EPS));
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
