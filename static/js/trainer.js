// Controle do Timer
const timerText = document.getElementById("timer-message");
const timerCard = document.getElementById("timer-card");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const currentRoundText = document.getElementById("current-round");
const totalRoundText = document.getElementById("total-rounds");

const teams = ["Sabores da Natureza", "Energia Verde", "Super Nutritivos", "Vitaminados"];

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva

const constTimeStartGame = 30;
const constTimeLeft = 20;
const constMessageReady = "Preparado?";
const constMaxTotalRounds = 48;
const constMinTotalRounds = 4;
const constStepRoundsTeam = 4;
const constScorePoints = 10;

let startGame;
let timeStartGame;
let timeLeft;
let indexRounds = 3;
let totalRounds = 0;
let currentRound = 0;
let maximumPointsTeam = 0;

// Variáveis para armazenar a pontuação das equipes
let team1Score = 0;
let team2Score = 0;
let team3Score = 0;
let team4Score = 0;

function selectTeamForGame() {
  const currentTeam = teams[(currentRound - 1) % teams.length]; // Seleciona o time com base na rodada atual
  alert(`Olá ${currentTeam}, vamos jogar?`); // Exibe uma caixa de texto simples com o nome do time
}

function incrementRounds() {
  if (totalRounds < constMaxTotalRounds) {
    indexRounds++;
    updateRoundsDisplay();
  }
}

function decrementRounds() {
  if (totalRounds > constMinTotalRounds) {
    indexRounds--;
    updateRoundsDisplay();
  }
}

function updateRoundsDisplay() {
  totalRounds = indexRounds * constStepRoundsTeam;
  totalRoundText.innerText = "Total: " + totalRounds;
  maximumPointsTeam = totalRounds * constScorePoints;
}

function startNextRound() {
  if (currentRound < totalRounds) {
    currentRound++;
    currentRoundText.innerText = "Partida: " + currentRound;
  }
}

window.onload = function () {
  updateRoundsDisplay();
  currentRoundText.innerText = "Partida: " + currentRound;
  maximumPointsTeam = totalRounds * constScorePoints;
};

// Controle do placar
function incrementScore(teamId) {
  switch (teamId) {
    case "team1":
      if (team1Score < maximumPointsTeam) {
        team1Score += constScorePoints;
        updateScoreDisplay("team1", team1Score);
      }
      break;
    case "team2":
      if (team2Score < maximumPointsTeam) {
        team2Score += constScorePoints;
        updateScoreDisplay("team2", team2Score);
      }
      break;
    case "team3":
      if (team3Score < maximumPointsTeam) {
        team3Score += constScorePoints;
        updateScoreDisplay("team3", team3Score);
      }
      break;
    case "team4":
      if (team4Score < maximumPointsTeam) {
        team4Score += constScorePoints;
        updateScoreDisplay("team4", team4Score);
      }
      break;
  }
}

function decrementScore(teamId) {
  switch (teamId) {
    case "team1":
      if (team1Score > 0) {
        team1Score -= constScorePoints;
        updateScoreDisplay("team1", team1Score);
      }
      break;
    case "team2":
      if (team2Score > 0) {
        team2Score -= constScorePoints;
        updateScoreDisplay("team2", team2Score);
      }
      break;
    case "team3":
      if (team3Score > 0) {
        team3Score -= constScorePoints;
        updateScoreDisplay("team3", team3Score);
      }
      break;
    case "team4":
      if (team4Score > 0) {
        team4Score -= constScorePoints;
        updateScoreDisplay("team4", team4Score);
      }
      break;
  }
}

function updateScoreDisplay(teamId, score) {
  let pointsElement = document.getElementById(teamId + "-points");
  pointsElement.innerText = score + " pontos";
}

// Timer e outras funções permanecem iguais
function startTimer() {
  let playAlarmSound;

  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  // Desabilitar o botão Iniciar e habilitar o botão Resetar
  startButton.disabled = true;
  resetButton.disabled = false;
  // Inicializa o temporizador
  timerText.innerText = constMessageReady;
  startNextRound();
   // Chama a função para exibir o time atual
  selectTeamForGame();
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
        timerCard.classList.add("timer-back-alert");
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
