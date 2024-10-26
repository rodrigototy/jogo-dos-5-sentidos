const dialog = document.getElementById("dialog");
const overlay = document.getElementById("overlay");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", function () {
  overlay.style.display = "none";
  dialog.style.display = "none";
  checkAnswerResult = 1;
});

noBtn.addEventListener("click", function () {
  overlay.style.display = "none";
  dialog.style.display = "none";
});

function checkAnswer() {
  overlay.style.display = "block";
  dialog.style.display = "block";
}
