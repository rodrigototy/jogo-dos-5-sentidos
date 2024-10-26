const timerTextTitle = document.getElementById("timer-title");
const timerTextProgress = document.getElementById("timer-progress");
const resetButton = document.getElementById("resetButton");
const timerDialog = document.getElementById("timer-dialog");

const alarmSound = new Audio("../static/audio/sirene.mp3"); // Arquivo de áudio do alarme
const startTimerSound = new Audio("../static/audio/20-seconds.mp3"); // Arquivo de áudio do alarme
const countdownSound = new Audio("../static/audio/countdown-10.mp3"); // Arquivo de áudio da contagem regressiva

const constTimeStartGame = 26;
const constTimeLeft = 20;

let startGame;
let timeStartGame;
let timeLeft;
let currentTeam;
let currentTeamName = "";

function selectTeamForGame() {
  // Seleciona o time com base na rodada atual
  const indexTeam = (currentRound - 1) % teams.length;
  currentTeam = teams[indexTeam];
  currentTeamName = currentTeam.teamName; // Exibe uma caixa de texto simples com o nome do time
}

function showTimerDialog() {
  let playAlarmSound;

  overlay.style.display = "block";

  clearInterval(startGame);
  timeStartGame = constTimeStartGame;
  timeLeft = constTimeLeft;

  // Chama a função para exibir o time atual
  selectTeamForGame();
  timerTextTitle.innerText = currentTeamName;
  timerTextProgress.innerText = "Preparados?";
  timerDialog.style.display = "block";
  startTimerSound.play();

  // Iniciar contagem regressiva para o início do jogo
  startGame = setInterval(function () {
    timeStartGame--;

    if (timeStartGame <= 23) {
      timerTextProgress.innerText = `${timeLeft}s`;
    }

    if (timeStartGame <= 22) {
      // Iniciar o countdown após timeStartGame acabar
      timeLeft--;
      timerTextProgress.innerText = `${timeLeft}s`;

      if (timeStartGame <= 15) {
        countdownSound.play();
      }

      if (timeStartGame <= 14) {
        startTimerSound.pause();
        startTimerSound.currentTime = 0; // Reiniciar o som
      }

      if (timeStartGame <= 13) {
        timerTextProgress.classList.remove("timer-normal");
        timerTextProgress.classList.add("timer-alert");
        timerDialog.classList.remove("timer-back-normal");
        timerDialog.classList.add("timer-back-alert");
      }

      if (timeStartGame <= 3) {
        countdownSound.pause();
        countdownSound.currentTime = 0; // Reiniciar o som
        // Tocar o som quando o tempo acabar
        playAlarmSound = alarmSound.play();

        timerTextProgress.innerText = "Fale Agora!";
      }

      if (timeStartGame <= 0) {
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
  timerTextControl.innerText = "Pressione Iniciar";
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
