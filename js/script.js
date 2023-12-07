window.addEventListener("load", () => {
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restart");
  const toggleSoundButton = document.getElementById("muteButton");
  const buttonClickSound = document.getElementById("buttonClickSound");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();

    // Play button click sound
    playButtonClickSound();
  }

  function restartGame() {
    location.reload();
    // Play button click sound
    playButtonClickSound();
  }

  function toggleSound() {
    // Play button click sound
    playButtonClickSound();
  }

  function playButtonClickSound() {
    if (buttonClickSound) {
      buttonClickSound.play();
    }
  }

  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
  toggleSoundButton.addEventListener("click", toggleSound);
  buttonClickSound.load();
});
