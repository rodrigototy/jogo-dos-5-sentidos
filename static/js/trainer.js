// Controle do placar
function incrementScore(teamId) {
  let pointsElement = document.getElementById(teamId);
  let currentPoints = parseInt(pointsElement.innerText);
  pointsElement.innerText = currentPoints + 10 + " pontos";
}

function decrementScore(teamId) {
  let pointsElement = document.getElementById(teamId);
  let currentPoints = parseInt(pointsElement.innerText);
  if (currentPoints > 0) {
    pointsElement.innerText = currentPoints - 10 + " pontos";
  }
}

// Controle do Timer
let countdown;
let timeLeft = 20;

function startTimer() {
  clearInterval(countdown);
  timeLeft = 20;
  document.getElementById("timer").innerText = `${timeLeft}s`;
  document.getElementById("timer").classList.remove("timer-final");
  document.getElementById("timer").classList.remove("timer-message");
  document.getElementById("timer").classList.add("timer-start");

  countdown = setInterval(function () {
    timeLeft--;
    document.getElementById("timer").innerText = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").innerText = "Fale o nome da Fruta";
      document.getElementById("timer").classList.remove("timer-final");
      document.getElementById("timer").classList.add("timer-message");
    }

    if (timeLeft <= 10) {
      document.getElementById("timer").classList.remove("timer-start");
      document.getElementById("timer").classList.add("timer-final");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  timeLeft = 20;
  document.getElementById("timer").innerText = `${timeLeft}s`;
  document.getElementById("timer").classList.remove("timer-final");
  document.getElementById("timer").classList.remove("timer-message");
  document.getElementById("timer").classList.add("timer-start");
}
