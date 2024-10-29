const timerTextTitle = document.getElementById("timer-title");
const timerTextProgress = document.getElementById("timer-progress");
const resetButton = document.getElementById("resetButton");
const playButton = document.getElementById("playButton");
const timerDialog = document.getElementById("timer-dialog");

const team1Checkbox = document.getElementById("team1-checkbox");
const team2Checkbox = document.getElementById("team2-checkbox");
const team3Checkbox = document.getElementById("team3-checkbox");
const team4Checkbox = document.getElementById("team4-checkbox");

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva

const constTimeStartGame = 28;
const constTimeReturnPlay = constTimeStartGame - 1;
const constTimeLeft = 20;

let startGame;
let timeStartGame;
let timeLeft;
let currentTeam;
let currentTeamName = "";
let waitingForPlay = false; // Variável de controle para evitar múltiplas execuções

// Função para retornar a lista de equipes ativas com base nos checkboxes
function getActiveTeams() {
  const activeTeams = [];

  if (team1Checkbox.checked)
    activeTeams.push(teams.find((team) => team.teamId === "team1"));
  if (team2Checkbox.checked)
    activeTeams.push(teams.find((team) => team.teamId === "team2"));
  if (team3Checkbox.checked)
    activeTeams.push(teams.find((team) => team.teamId === "team3"));
  if (team4Checkbox.checked)
    activeTeams.push(teams.find((team) => team.teamId === "team4"));

  return activeTeams;
}

// Função para selecionar a equipe para o jogo, considerando apenas as equipes ativas
function selectTeamForGame() {
  const activeTeams = getActiveTeams(); // Filtra as equipes ativas

  if (activeTeams.length > 0) {
    // Seleciona o time com base na rodada atual entre as equipes ativas
    const indexTeam = (currentRound - 1) % activeTeams.length;
    currentTeam = activeTeams[indexTeam];
    currentTeamName = currentTeam.teamName; // Exibe o nome do time atual
    return true;
  } else {
    return false;
  }
}

function showTimerDialog() {
  let playAlarmSound;

  // Chama a função para selecionar o time atual
  if (selectTeamForGame()) {
    overlay.style.display = "block";

    clearInterval(startGame);
    timeStartGame = constTimeStartGame;
    timeLeft = constTimeLeft;

    timerTextTitle.innerText = currentTeamName;
    timerTextProgress.innerText = "Preparados?";
    timerDialog.style.display = "block";
    startTimerSound.play();

    // Iniciar contagem regressiva para o início do jogo
    startGame = setInterval(async function () {
      timeStartGame--;

      // Verifique se devemos aguardar o clique do botão e evite múltiplas execuções
      if (timeStartGame == constTimeReturnPlay) {
        startTimerSound.pause();
        timeStartGame = 1000;
        timeStartGame = await waitForPlayButton();
      }

      if (timeStartGame == 26) {
        startTimerSound.play();
      }
      if (timeStartGame == 25) {
        timerTextProgress.innerText = `${timeLeft}s`;
      }

      if (timeStartGame <= 24) {
        // Iniciar o countdown após timeStartGame acabar
        timeLeft--;
        timerTextProgress.innerText = `${timeLeft}s`;

        if (timeStartGame == 17) {
          countdownSound.play();
        }

        if (timeStartGame == 15) {
          startTimerSound.pause();
          startTimerSound.currentTime = 0; // Reiniciar o som
          timerTextProgress.classList.remove("timer-normal");
          timerTextProgress.classList.add("timer-alert");
          timerDialog.classList.remove("timer-back-normal");
          timerDialog.classList.add("timer-back-alert");
        }

        if (timeStartGame == 5) {
          countdownSound.pause();
          countdownSound.currentTime = 0; // Reiniciar o som
          // Tocar o som quando o tempo acabar
          playAlarmSound = alarmSound.play();
        }

        if (timeStartGame == 4) {
          timerTextProgress.innerText = "Fale Agora!";
        }

        if (timeStartGame == 3) {
          timerDialog.style.display = "none";
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
            if (totalRounds == currentRound) {
              // Uso da função showRankingDialog:
              showRankingDialog(teams);
              desabilitarIniciar();
            }
          });
          restartGame();
        }
      }
    }, 1000);
  } else {
    alert("Nenhuma equipe foi selecionada para participar do jogo.");
    timerTextControl.innerText = "Pressione Iniciar";
  }
}

// Função que aguarda o clique no playButton
function waitForPlayButton() {
  return new Promise((resolve) => {
    playButton.addEventListener("click", function onPlayClick() {
      playButton.removeEventListener("click", onPlayClick); // Remove o listener para evitar múltiplas chamadas
      resolve(constTimeReturnPlay - 1); // Resolve a Promise, continuando a execução no setInterval
    });
  });
}

function restartGame() {
  // Resetar o jogo
  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  timerDialog.classList.remove("timer-back-alert");
  timerDialog.classList.add("timer-back-normal");
  timerTextProgress.classList.remove("timer-alert");
  timerTextProgress.classList.add("timer-message");
  // Parar o som se estiver tocando
  alarmSound.pause();
  alarmSound.currentTime = 0; // Reiniciar o som
  countdownSound.pause();
  countdownSound.currentTime = 0; // Reiniciar o som
  startTimerSound.pause();
  startTimerSound.currentTime = 0; // Reiniciar o som

  timerDialog.style.display = "none";
}

function resetTimer() {
  restartGame();
  overlay.style.display = "none";
}
