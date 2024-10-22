// Controle do placar
function incrementScore(teamId) {
    let pointsElement = document.getElementById(teamId);
    let currentPoints = parseInt(pointsElement.innerText);
    pointsElement.innerText = currentPoints + 10;
}

function decrementScore(teamId) {
    let pointsElement = document.getElementById(teamId);
    let currentPoints = parseInt(pointsElement.innerText);
    if (currentPoints > 0) {
        pointsElement.innerText = currentPoints - 10;
    }
}

// Controle do Timer
let countdown;
let timeLeft = 20;

function startTimer() {
    clearInterval(countdown);
    timeLeft = 20;
    document.getElementById('timer').innerText = timeLeft;

    countdown = setInterval(function () {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('timer').innerText = "Fale o nome da Fruta";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 20;
    document.getElementById('timer').innerText = timeLeft;
}
