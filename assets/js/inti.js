function checkLS() {
  if (localStorage.getItem("cookies") === null) {
    localStorage.setItem("cookies", 0);
  }
}

// Dulu dipanggil di setiap halaman tapi tidak pernah didefinisikan,
// sehingga init() berhenti dengan ReferenceError dan tombol tidak pernah aktif.
function welcomeMsg() {
  const el = document.querySelector("#welcomeMsg p");
  if (el && el.dataset.msg) el.textContent = el.dataset.msg;
}

function res() {
  validation();
}

// Tekan Enter di kolom mana pun = klik tombol hitung
window.addEventListener("load", () => {
  document.querySelectorAll("input").forEach((i) =>
    i.addEventListener("keydown", (e) => {
      if (e.key === "Enter") res();
    })
  );
});
