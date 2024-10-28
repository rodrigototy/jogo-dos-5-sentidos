const timerTextTitle = document.getElementById("timer-title");
const timerTextProgress = document.getElementById("timer-progress");
const resetButton = document.getElementById("resetButton");
const playButton = document.getElementById("playButton");
const timerDialog = document.getElementById("timer-dialog");

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

      if (timeStartGame == 16) {
        startTimerSound.pause();
        startTimerSound.currentTime = 0; // Reiniciar o som
      }

      if (timeStartGame == 15) {
        timerTextProgress.classList.remove("timer-normal");
        timerTextProgress.classList.add("timer-alert");
        timerDialog.classList.remove("timer-back-normal");
        timerDialog.classList.add("timer-back-alert");
      }

      if (timeStartGame == 4) {
        countdownSound.pause();
        countdownSound.currentTime = 0; // Reiniciar o som
        // Tocar o som quando o tempo acabar
        playAlarmSound = alarmSound.play();
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
}

// Função que aguarda o clique no playButton
function waitForPlayButton() {
  return new Promise((resolve) => {
    playButton.addEventListener("click", function onPlayClick() {
      playButton.removeEventListener("click", onPlayClick); // Remove o listener para evitar múltiplas chamadas
      resolve(constTimeReturnPlay); // Resolve a Promise, continuando a execução no setInterval
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
