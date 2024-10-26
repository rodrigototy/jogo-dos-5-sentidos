const rankingDialog = document.getElementById("ranking-dialog");
const rankingList = document.getElementById("ranking-list");
const closeRanking = document.getElementById("close-ranking");

function showRankingDialog(teams) {
  return new Promise(() => {
    overlay.style.display = "block";
    rankingDialog.style.display = "block";
    rankingList.textContent = getRanking(teams);

    closeRanking.addEventListener("click", function close() {
      overlay.style.display = "none";
      rankingDialog.style.display = "none";
      closeRanking.removeEventListener("click", close);
    });
  });
}
