window.onload = function () {
  let endTime =
    new Date(document.getElementById("examStartTime").textContent).getTime() +
    60 * 60 * 1000;
  function updateTimer() {
    let now = new Date().getTime();
    let remaining = endTime - now;
    if (remaining <= 0) {
      document.getElementById("quizForm").submit();
    } else {
      document.getElementById("timer").innerText =
        Math.floor(remaining / 60000) +
        "m " +
        Math.floor((remaining % 60000) / 1000) +
        "s";
      setTimeout(updateTimer, 1000);
    }
  }
  updateTimer();
};
