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
const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva
const constTimeStartGame = 30;
const constTimeLeft = 20;
const constMessageReady = "Você está Preparado?";
let startGame;
let timeStartGame;
let timeLeft;

function startTimer() {
  let playAlarmSound;

  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  // Desabilitar o botão Iniciar e habilitar o botão Resetar
  document.getElementById("startButton").disabled = true;
  document.getElementById("resetButton").disabled = false;

  startTimerSound.play();
  document.getElementById("timer").innerText = constMessageReady;

  // Iniciar contagem regressiva para o início do jogo
  startGame = setInterval(function () {
    timeStartGame--;

    if (timeStartGame <= 27) {
      document.getElementById("timer").innerText = `${timeLeft}s`;
      document.getElementById("timer").classList.remove("timer-final");
      document.getElementById("timer").classList.remove("timer-message");
      document.getElementById("timer").classList.remove("timer-alert");
      document.getElementById("timer").classList.add("timer-start");
    }

    if (timeStartGame <= 26) {
      // Iniciar o countdown após timeStartGame acabar
      timeLeft--;
      document.getElementById("timer").innerText = `${timeLeft}s`;

      if (timeStartGame <= 19) {
        countdownSound.play();
      }

      if (timeStartGame <= 18) {
        startTimerSound.pause();
        startTimerSound.currentTime = 0; // Reiniciar o som
      }

      if (timeStartGame <= 17) {
        document.getElementById("timer").classList.remove("timer-start");
        document.getElementById("timer").classList.add("timer-final");
      }

      if (timeStartGame <= 7) {
        countdownSound.pause();
        countdownSound.currentTime = 0; // Reiniciar o som
        // Tocar o som quando o tempo acabar
        playAlarmSound = alarmSound.play();

        document.getElementById("timer").classList.remove("timer-final");
        document.getElementById("timer").classList.add("timer-alert");
        document.getElementById("timer").innerText = "Fale Agora!";
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
