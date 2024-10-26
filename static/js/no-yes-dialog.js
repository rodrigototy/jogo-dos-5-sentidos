const noYesDialog = document.getElementById("no-yes-dialog");
const overlay = document.getElementById("overlay");
const buttonYes = document.getElementById("button-yes");
const buttonNo = document.getElementById("button-no");

function checkAnswer() {
  return new Promise((resolve) => {
    overlay.style.display = "block";
    noYesDialog.style.display = "block";

    buttonYes.addEventListener("click", function onYesClick() {
      resolve(true); // Resolve a promise com 'true' para indicar resposta positiva
      closeDialog();
    });

    buttonNo.addEventListener("click", function onNoClick() {
      resolve(false); // Resolve a promise com 'false' para indicar resposta negativa
      closeDialog();
    });

    function closeDialog() {
      overlay.style.display = "none";
      noYesDialog.style.display = "none";
    }

    function cleanup() {
      buttonYes.removeEventListener("click", onYesClick);
      buttonNo.removeEventListener("click", onNoClick);
    }
  });
}
