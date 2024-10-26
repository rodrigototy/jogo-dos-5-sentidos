// Controle do Timer
const timerText = document.getElementById("timer-message");
const timerCard = document.getElementById("timer-card");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const currentRoundText = document.getElementById("current-round");
const totalRoundText = document.getElementById("total-rounds");

const teams = [
  { teamId: "team1", teamName: "Sabores da Natureza", teamScore: 0 },
  { teamId: "team2", teamName: "Energia Verde", teamScore: 0 },
  { teamId: "team3", teamName: "Super Nutritivos", teamScore: 0 },
  { teamId: "team4", teamName: "Vitaminados", teamScore: 0 },
];

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva

const constTimeStartGame = 26;
const constTimeLeft = 20;
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
let currentTeam;
let currentTeamMessage = "";
let listRankingTeams = "";

function selectTeamForGame() {
  // Seleciona o time com base na rodada atual
  const indexTeam = (currentRound - 1) % teams.length;
  currentTeam = teams[indexTeam];
  console.log(currentTeam);
  currentTeamMessage = `${currentTeam.teamName}, pronto?`; // Exibe uma caixa de texto simples com o nome do time
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
  const team = teams.find((t) => t.teamId === teamId);
  if (team && team.teamScore < maximumPointsTeam) {
    team.teamScore += constScorePoints;
    updateScoreDisplay(teamId, team.teamScore);
  }
}

function decrementScore(teamId) {
  const team = teams.find((t) => t.teamId === teamId);
  if (team && team.teamScore > 0) {
    team.teamScore -= constScorePoints;
    updateScoreDisplay(teamId, team.teamScore);
  }
}

function updateScoreDisplay(teamId, score) {
  let pointsElement = document.getElementById(teamId + "-points");
  pointsElement.innerText = score + " pontos";
}

// Timer e outras funções permanecem iguais
function startTimer() {
  let playAlarmSound;
  let respostaTeam;

  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  // Desabilitar o botão Iniciar e habilitar o botão Resetar
  startButton.disabled = true;
  resetButton.disabled = false;
  // Inicializa o temporizador
  startNextRound();
  // Chama a função para exibir o time atual
  selectTeamForGame();
  timerText.innerText = currentTeamMessage;
  startTimerSound.play();

  // Iniciar contagem regressiva para o início do jogo
  startGame = setInterval(function () {
    timeStartGame--;

    if (timeStartGame <= 23) {
      timerText.innerText = `${timeLeft}s`;
      timerText.classList.remove("timer-final");
      timerText.classList.remove("timer-message");
      timerText.classList.remove("timer-alert");
      timerText.classList.add("timer-start");
    }

    if (timeStartGame <= 22) {
      // Iniciar o countdown após timeStartGame acabar
      timeLeft--;
      timerText.innerText = `${timeLeft}s`;

      if (timeStartGame <= 15) {
        countdownSound.play();
      }

      if (timeStartGame <= 14) {
        startTimerSound.pause();
        startTimerSound.currentTime = 0; // Reiniciar o som
      }

      if (timeStartGame <= 13) {
        timerText.classList.remove("timer-start");
        timerText.classList.add("timer-final");
        timerCard.classList.add("timer-back-alert");
      }

      if (timeStartGame <= 3) {
        countdownSound.pause();
        countdownSound.currentTime = 0; // Reiniciar o som
        // Tocar o som quando o tempo acabar
        playAlarmSound = alarmSound.play();

        timerText.classList.remove("timer-final");
        timerText.classList.add("timer-alert");
        timerText.innerText = "Fale Agora!";
      }

      if (timeStartGame <= 0) {
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

        // Uso da função checkAnswer:
        checkAnswer().then((resolve) => {
          if (resolve) {
            incrementScore(currentTeam.teamId);
          }
        });

        if (totalRounds == currentRound) {
          listRankingTeams = getRanking(teams);
          console.log(listRankingTeams);
        }
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

function getRanking(teams) {
  // Ordena o array em ordem decrescente com base na pontuação
  const sortedTeams = teams.sort((a, b) => b.teamScore - a.teamScore);

  // Cria a string de classificação
  let rankingList = "";
  let indexRanking = 0;
  sortedTeams.forEach((team, index) => {
    indexRanking++;
    rankingList += `${indexRanking}º ${index + 1} - ${team.teamName} - ${
      team.teamScore
    }\n`;
  });

  return rankingList.trim(); // Remove a última nova linha
}
