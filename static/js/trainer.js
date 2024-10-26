// Controle do Timer
const timerTextControl = document.getElementById("timer-control");
const startButton = document.getElementById("startButton");
const currentRoundText = document.getElementById("current-round");
const totalRoundText = document.getElementById("total-rounds");

const teams = [
  { teamId: "team1", teamName: "Sabores da Natureza", teamScore: 0 },
  { teamId: "team2", teamName: "Energia Verde", teamScore: 0 },
  { teamId: "team3", teamName: "Super Nutritivos", teamScore: 0 },
  { teamId: "team4", teamName: "Vitaminados", teamScore: 0 },
];

const constMaxTotalRounds = 48;
const constMinTotalRounds = 4;
const constStepRoundsTeam = 4;
const constScorePoints = 10;

let indexRounds = 3;
let totalRounds = 0;
let currentRound = 0;
let maximumPointsTeam = 0;

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
  // Inicializa o temporizador
  startNextRound();
  timerTextControl.innerText = "Executando ...!";
  showTimerDialog();
}

function desabilitarIniciar() {
  startButton.disabled = true;
}

function habilitarIniciar() {
  startButton.disabled = false;
}

function reloadPage() {
  location.reload();
}
