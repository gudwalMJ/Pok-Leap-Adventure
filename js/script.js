window.addEventListener("load", () => {
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restart");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", startGame);

  restartButton.addEventListener("click", function () {
    location.reload();
  });
});
