// Controle do Timer
const timerText = document.getElementById("timer-message");
const timerCard = document.getElementById("timer-card");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva
const constTimeStartGame = 30;
const constTimeLeft = 20;
const constMessageReady = "Você está Preparado?";
let startGame;
let timeStartGame;
let timeLeft;

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

function startTimer() {
  let playAlarmSound;

  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  // Desabilitar o botão Iniciar e habilitar o botão Resetar
  startButton.disabled = true;
  resetButton.disabled = false;
  //Inicializa o tempotizador
  timerText.innerText = constMessageReady;
  startTimerSound.play();

  // Iniciar contagem regressiva para o início do jogo
  startGame = setInterval(function () {
    timeStartGame--;

    if (timeStartGame <= 27) {
        timerText.innerText = `${timeLeft}s`;
        timerText.classList.remove("timer-final");
        timerText.classList.remove("timer-message");
        timerText.classList.remove("timer-alert");
        timerText.classList.add("timer-start");
    }

    if (timeStartGame <= 26) {
      // Iniciar o countdown após timeStartGame acabar
      timeLeft--;
      timerText.innerText = `${timeLeft}s`;

      if (timeStartGame <= 19) {
        countdownSound.play();
      }

      if (timeStartGame <= 18) {
        startTimerSound.pause();
        startTimerSound.currentTime = 0; // Reiniciar o som
      }

      if (timeStartGame <= 17) {
        timerText.classList.remove("timer-start");
        timerText.classList.add("timer-final");
        timerCard.classList.add("timer-back-alert")
      }

      if (timeStartGame <= 7) {
        countdownSound.pause();
        countdownSound.currentTime = 0; // Reiniciar o som
        // Tocar o som quando o tempo acabar
        playAlarmSound = alarmSound.play();

        timerText.classList.remove("timer-final");
        timerText.classList.add("timer-alert");
        timerText.innerText = "Fale Agora!";
      }

      if (timeStartGame <= 4) {
        if (playAlarmSound !== undefined) {
          playAlarmSound
            .then((_) => {
              // Parar o som se estiver tocando
              alarmSound.pause();
              alarmSound.currentTime = 0; // Reiniciar o som
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
            });
        }
      }

      if (timeStartGame <= 0) {
        resetTimer();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  timerCard.classList.remove("timer-back-alert");
  timerText.classList.remove("timer-final");
  timerText.classList.remove("timer-start");
  timerText.classList.remove("timer-alert");
  timerText.classList.add("timer-message");
  timerText.innerText = "Pressione Iniciar";
  // Parar o som se estiver tocando
  alarmSound.pause();
  alarmSound.currentTime = 0; // Reiniciar o som
  countdownSound.pause();
  countdownSound.currentTime = 0; // Reiniciar o som
  startTimerSound.pause();
  startTimerSound.currentTime = 0; // Reiniciar o som
  // Habilitar o botão Iniciar e desabilitar o botão Resetar
  startButton.disabled = false;
  resetButton.disabled = true;
}
