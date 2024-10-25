// Controle do placar
function incrementScore(teamId) {
  let pointsElement = document.getElementById(teamId);
  let currentPoints = parseInt(pointsElement.innerText);
  if (currentPoints < 500) {
    pointsElement.innerText = currentPoints + 10 + " pontos";
  }
}

function decrementScore(teamId) {
  let pointsElement = document.getElementById(teamId);
  let currentPoints = parseInt(pointsElement.innerText);
  if (currentPoints > 0) {
    pointsElement.innerText = currentPoints - 10 + " pontos";
  }
}

// Controle do Timer
let startGame;
let countdown;
let timeStartGame = 3;
let timeLeft = 20;
let totalTime = 30;

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva

function startTimer() {
  clearInterval(countdown);
  clearInterval(startGame);
  timeLeft = 20;
  timeStartGame = 3;

  // Desabilitar o botão Iniciar e habilitar o botão Resetar
  document.getElementById("startButton").disabled = true;
  document.getElementById("resetButton").disabled = false;

  startTimerSound.play();
  document.getElementById("timer").innerText = "Preparados?";

  // Iniciar contagem regressiva para o início do jogo
  startGame = setInterval(function () {
    timeStartGame--;

    if (timeStartGame <= 1) {
      document.getElementById("timer").innerText = `${timeLeft}s`;
      document.getElementById("timer").classList.remove("timer-final");
      document.getElementById("timer").classList.remove("timer-message");
      document.getElementById("timer").classList.remove("timer-alert");
      document.getElementById("timer").classList.add("timer-start");
    }

    if (timeStartGame <= 0) {
      clearInterval(startGame);

      // Iniciar o countdown após timeStartGame acabar
      countdown = setInterval(function () {
        timeLeft--;
        totalTime--;
        document.getElementById("timer").innerText = `${timeLeft}s`;

        if (timeLeft <= 12) {
          countdownSound.play();
        }

        if (timeLeft <= 11) {
          startTimerSound.pause();
          startTimerSound.currentTime = 0; // Reiniciar o som
        }

        if (timeLeft <= 10) {
          document.getElementById("timer").classList.remove("timer-start");
          document.getElementById("timer").classList.add("timer-final");
        }

        if (timeLeft <= 0) {
          countdownSound.pause();
          countdownSound.currentTime = 0; // Reiniciar o som
          // Tocar o som quando o tempo acabar
          alarmSound.play();

          document.getElementById("timer").classList.remove("timer-final");
          document.getElementById("timer").classList.add("timer-alert");
          document.getElementById("timer").innerText = "Fale Agora!";
        }

        if (totalTime <= 7) {
          // Parar o som se estiver tocando
          alarmSound.pause();
          alarmSound.currentTime = 0; // Reiniciar o som
        }

        if (totalTime <= 0) {
          resetTimer();
        }
      }, 1000);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  clearInterval(startGame);
  timeLeft = 20;
  timeStartGame = 3;

  document.getElementById("timer").classList.remove("timer-final");
  document.getElementById("timer").classList.remove("timer-start");
  document.getElementById("timer").classList.remove("timer-alert");
  document.getElementById("timer").classList.add("timer-message");
  document.getElementById("timer").innerText = "Pressione Iniciar";
  // Parar o som se estiver tocando
  alarmSound.pause();
  alarmSound.currentTime = 0; // Reiniciar o som
  countdownSound.pause();
  countdownSound.currentTime = 0; // Reiniciar o som
  startTimerSound.pause();
  startTimerSound.currentTime = 0; // Reiniciar o som
  // Habilitar o botão Iniciar e desabilitar o botão Resetar
  document.getElementById("startButton").disabled = false;
  document.getElementById("resetButton").disabled = true;
}
