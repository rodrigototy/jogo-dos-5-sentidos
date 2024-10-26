const rankingDialog = document.getElementById("ranking-dialog");
const closeRanking = document.getElementById("close-ranking");

const resultItem = [];
resultItem[0] = document.getElementById("result-item1");
resultItem[1] = document.getElementById("result-item2");
resultItem[2] = document.getElementById("result-item3");
resultItem[3] = document.getElementById("result-item4");

function showRankingDialog(teams) {
  overlay.style.display = "block";  // Certifique-se de definir `overlay` no código
  rankingDialog.style.display = "block";
  getRanking(teams);

  closeRanking.addEventListener("click", function close() {
    overlay.style.display = "none";
    rankingDialog.style.display = "none";
    closeRanking.removeEventListener("click", close);
  });
}

function getRanking(teams) {
  // Ordena o array em ordem decrescente com base na pontuação
  const sortedTeams = teams.sort((a, b) => b.teamScore - a.teamScore);

  // Cria a string de classificação
  sortedTeams.forEach((team, index) => {
    if (index < resultItem.length) {  // Verifica se o índice está dentro do limite
      resultItem[index].innerText = `${index + 1}º Lugar: ${team.teamName} - ${team.teamScore} pontos`;
    }
  });
}
