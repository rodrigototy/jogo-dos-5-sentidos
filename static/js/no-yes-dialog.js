const dialog = document.getElementById("dialog");
const overlay = document.getElementById("overlay");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function checkAnswer() {
  return new Promise((resolve) => {
    overlay.style.display = "block";
    dialog.style.display = "block";

    yesBtn.addEventListener("click", function onYesClick() {
      resolve(true); // Resolve a promise com 'true' para indicar resposta positiva
      closeDialog();
    });

    noBtn.addEventListener("click", function onNoClick() {
      resolve(false); // Resolve a promise com 'false' para indicar resposta negativa
      closeDialog();
    });

    function closeDialog() {
      overlay.style.display = "none";
      dialog.style.display = "none";
    }

    function cleanup() {
      yesBtn.removeEventListener("click", onYesClick);
      noBtn.removeEventListener("click", onNoClick);
    }
  });
}
