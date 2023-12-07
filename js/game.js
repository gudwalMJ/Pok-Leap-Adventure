class Game {
  constructor() {
    // DOM elements
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end");
    this.gameScreenAudio = document.getElementById("gameScreenAudio");
    this.livesCounter = document.getElementById("lives-counter");
    this.muteButton = document.getElementById("muteButton");

    // Game properties
    this.height = 750;
    this.width = 900;
    this.player = null;
    this.obstacles = [];
    this.laprases = [];
    this.lotads = [];
    this.feraligatr = [];
    this.easterEggs = [];
    this.berry = null;
    this.lastBerryCreationScore = 0;
    this.animateId = null;
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;

    // Audio volume
    this.gameScreenAudio.volume = 0.3;

    // Obstacle constants
    this.obstacleMargins = [0.12, 0.24, 0.18];
    this.obstacleDelay = 1500; // milliseconds

    // Bind methods to the instance
    this.gameLoop = this.gameLoop.bind(this);
    this.toggleGameScreenAudio = this.toggleGameScreenAudio.bind(this);
  }

  // Sound
  playGameScreenAudio() {
    if (this.gameScreenAudio.paused) {
      this.gameScreenAudio.play();
    } else {
      this.gameScreenAudio.pause();
    }
  }

  toggleGameScreenAudio() {
    const gameScreenAudio = document.getElementById("gameScreenAudio");

    if (gameScreenAudio.paused) {
      console.log("Audio is paused, playing now.");
      gameScreenAudio.play();
    } else {
      console.log("Audio is playing, pausing now.");
      gameScreenAudio.pause();
    }
  }

  // START
  start() {
    this.hideScreens();
    this.setGameScreenSize();
    this.createPlayer();
    this.createObstacles(7);
    this.createLapras();
    this.createLotadObstacles(7);
    this.createFeraligatr(1);
    this.createEasterEgg(1);
    this.createBerry();
    this.livesCounter.textContent = `Lives: ${this.lives}`;
    this.muteButton.style.display = "block";
    this.playGameScreenAudio();
    this.muteButton.addEventListener("click", this.toggleGameScreenAudio);

    // Start the game loop after setting up the initial state
    this.gameLoop();
  }

  hideScreens() {
    this.startScreen.style.display = "none";
    this.endScreen.style.display = "none";
    this.gameScreen.style.display = "block";
  }

  setGameScreenSize() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
  }

  // Creation
  createPlayer() {
    this.player = new Player(this.gameScreen, this);
  }

  createBerry() {
    const berryCreationThreshold = 500;
    if (this.score > this.lastBerryCreationScore + berryCreationThreshold) {
      this.berry = new Berry(this.gameScreen, this);
      this.lastBerryCreationScore = this.score;
    }
  }

  createEasterEgg() {
    if (this.score >= 1000 && !this.easterEggAppeared) {
      this.playEasterEggSound();
      const easterEgg = new EasterEgg(this.gameScreen);
      easterEgg.spawn();
      this.easterEggs.push(easterEgg);
      this.easterEggAppeared = true;
    }
  }

  playEasterEggSound() {
    const easterEggSound = document.getElementById("easterEggSound");
    easterEggSound.play();
  }

  createEasterEggObstacle() {
    const easterEgg = new EasterEgg(this.gameScreen);
    easterEgg.spawn();
    this.easterEggs.push(easterEgg);
  }

  createFeraligatr(numFeraligatr) {
    this.feraligatr = [];
    for (let i = 0; i < numFeraligatr; i++) {
      const bottomMargin = 150;
      const feraligatr = new Feraligatr(this.gameScreen, this, bottomMargin);
      this.feraligatr.push(feraligatr);
    }
  }

  createLapras() {
    const bottomMargin = 0.35;
    this.laprases = [];
    for (let i = 0; i < 7; i++) {
      setTimeout(
        () => this.createLaprasObstacle(i, bottomMargin),
        i * this.obstacleDelay
      );
    }
  }

  createLaprasObstacle(index, bottomMargin) {
    const laprasObstacleMargins = [0.31, 0.39, 0.41];
    const shuffledMargins = this.shuffleArray(laprasObstacleMargins);
    const lapras = new ObstacleLapras(
      this.gameScreen,
      shuffledMargins[index % shuffledMargins.length],
      bottomMargin
    );
    this.laprases.push(lapras);
  }

  // Helper function to shuffle an array (Fisher-Yates algorithm)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Create Lotad
  createLotadObstacles(numObstacles) {
    this.lotads = [];
    for (let i = 0; i < numObstacles; i++) {
      setTimeout(() => this.createLotadObstacle(i), i * this.obstacleDelay);
    }
  }

  createLotadObstacle() {
    const lotad = new ObstacleLotad(this.gameScreen);
    this.lotads.push(lotad);
  }

  // Create Falinks
  createObstacles(numObstacles) {
    this.obstacles = [];
    for (let i = 0; i < numObstacles; i++) {
      setTimeout(() => this.createObstacle(i), i * this.obstacleDelay);
    }
  }

  createObstacle(index) {
    const shuffledMargins = this.shuffleArray(this.obstacleMargins);
    const obstacle = new ObstacleFalinks(
      this.gameScreen,
      shuffledMargins[index % shuffledMargins.length]
    );
    this.obstacles.push(obstacle);
  }

  // GameLoop
  gameLoop() {
    if (!this.isGameOver) {
      this.player.move();
      this.moveObstacles();
      this.checkCollisions();
      this.updateScoreDisplay();
      this.createEasterEgg();
      this.createBerry();
      this.checkWin();
      this.animateId = requestAnimationFrame(this.gameLoop);
    }
  }

  moveObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.move());
    this.laprases.forEach((lapras) => lapras.move());
    this.lotads.forEach((lotad) => lotad.move());
  }

  // Method to check for a win
  checkWin() {
    if (this.score >= 4000) {
      this.handleWin();
    }
  }

  // If won
  handleWin() {
    this.isGameOver = true;
    this.displayWinMessage();
    this.displayFinalScore();
    this.hideGameScreen();
    this.showEndScreen();
    this.pauseGameScreenAudio();
  }
  // "You Won!" message
  displayWinMessage() {
    const finalScoreElement = document.getElementById("endGame");
    if (finalScoreElement) {
      finalScoreElement.textContent = "Congratulations You Won!";
    }
  }

  // Score Display
  updateScoreDisplay() {
    const scoreCounter = document.getElementById("score-counter");
    if (scoreCounter) {
      scoreCounter.textContent = `Score: ${this.score}`;
    }
  }

  // Collisions
  checkCollisions() {
    this.checkCollisionGroup(this.obstacles);
    this.checkCollisionGroup(this.laprases);
    this.checkCollisionGroup(this.lotads);
    this.checkCollisionGroup(this.feraligatr);
    this.checkCollisionGroup(this.easterEggs);
    this.checkCollisionGroup([this.berry]);
  }

  checkCollisionGroup(group) {
    if (group && group.length > 0) {
      group.forEach((item) => {
        const playerRect = this.getPlayerHitbox();
        let itemRect;

        if (item instanceof Feraligatr) {
          itemRect = this.getFeraligatrHitbox(item);
        } else if (item instanceof EasterEgg) {
          itemRect = this.getEasterEggHitbox(item);
        } else if (item instanceof Berry) {
          itemRect = this.getBerryHitbox(item);
        } else {
          itemRect = this.getObstacleHitbox(item);
        }

        if (this.isCollision(playerRect, itemRect)) {
          if (item instanceof Feraligatr) {
            this.handleFeraligatrCollision(item);
          } else if (item instanceof EasterEgg) {
            this.handleEasterEggCollision(item);
          } else if (item instanceof Berry) {
            this.handleBerryCollision(item);
          } else {
            this.handleCollision();
          }
        }
      });
    }
  }

  isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  // Feraligatr Collision
  handleFeraligatrCollision() {
    console.log("Feraligatr Collision!");
    this.playFeraligatrCollisionSound();
    this.score += 150;
    console.log("Current Score:", this.score);
    this.updateScoreDisplay();
    this.playerReset();
    this.stopSoundAfterDelay("feraligatrCollisionSound", 2000);
  }

  playFeraligatrCollisionSound() {
    const feraligatrCollisionSound = document.getElementById(
      "feraligatrCollisionSound"
    );
    feraligatrCollisionSound.play();
  }

  // Easter Egg collision
  handleEasterEggCollision(easterEgg) {
    this.stopEasterEggSound();
    this.playFeraligatrCollisionSound();
    this.score += 2000;
    this.updateScoreDisplay();
    this.removeEasterEgg(easterEgg);
    this.stopSoundAfterDelay("feraligatrCollisionSound", 2000);
  }

  stopEasterEggSound() {
    const easterEggSound = document.getElementById("easterEggSound");
    easterEggSound.pause();
    easterEggSound.currentTime = 0;
  }

  removeEasterEgg(easterEgg) {
    const index = this.easterEggs.indexOf(easterEgg);
    if (index !== -1) {
      this.easterEggs.splice(index, 1);
      easterEgg.element.remove();
    }
  }

  // Berry Collision
  handleBerryCollision(berry) {
    this.playBerrySound();
    berry.handleCollision();
  }

  playBerrySound() {
    const berrySound = document.getElementById("berrySound");
    berrySound.play();
  }

  handleCollision() {
    this.playFalinksCrySound();
    this.lives--;
    this.livesCounter.textContent = `Lives: ${this.lives}`;

    if (this.lives <= 0) {
      this.resetGame();
    } else {
      this.playerReset();
    }
  }

  playFalinksCrySound() {
    const falinksCrySound = document.getElementById("falinksCrySound");
    falinksCrySound.play();
  }

  // HitBoxes
  getPlayerHitbox() {
    const playerRect = this.player.element.getBoundingClientRect();
    return this.adjustHitbox(playerRect);
  }

  getObstacleHitbox(obstacle) {
    if (obstacle) {
      const obstacleRect = obstacle.element.getBoundingClientRect();
      return this.adjustHitbox(obstacleRect);
    } else {
      return { left: 0, right: 0, top: 0, bottom: 0 };
    }
  }

  getLaprasHitbox() {
    const laprasRect = this.lapras[0].element.getBoundingClientRect();
    return this.adjustHitbox(laprasRect);
  }

  getFeraligatrHitbox(feraligatr) {
    const feraligatrRect = feraligatr.element.getBoundingClientRect();
    return this.adjustHitbox(feraligatrRect);
  }

  getEasterEggHitbox(easterEgg) {
    const easterEggRect = easterEgg.element.getBoundingClientRect();
    return this.adjustHitbox(easterEggRect);
  }

  getBerryHitbox(berry) {
    const berryRect = berry.element.getBoundingClientRect();
    return this.adjustHitbox(berryRect);
  }

  adjustHitbox(rect) {
    return {
      left: rect.left + 7,
      right: rect.right - 7,
      top: rect.top + 13,
      bottom: rect.bottom - 13,
    };
  }
  stopSoundAfterDelay(soundId, delay) {
    setTimeout(() => {
      const sound = document.getElementById(soundId);
      sound.pause();
      sound.currentTime = 0;
    }, delay);
  }
  // ResetGame
  resetGame() {
    this.isGameOver = true;
    this.pauseGameScreenAudio();
    this.displayFinalScore();
    this.hideGameScreen();
    this.showEndScreen();
  }
  // Display final score
  displayFinalScore() {
    const finalScoreElement = document.getElementById("final-score");
    if (finalScoreElement) {
      finalScoreElement.textContent = `Final Score: ${this.score}`;
    }
  }

  hideGameScreen() {
    this.gameScreen.style.display = "none";
  }

  showEndScreen() {
    this.endScreen.style.display = "block";
    this.resetGameState();
  }

  pauseGameScreenAudio() {
    const gameScreenAudio = document.getElementById("gameScreenAudio");
    if (!gameScreenAudio.paused) {
      gameScreenAudio.pause();
    }
  }

  resetGameState() {
    this.clearObstacles();
    this.playerReset();
    this.lives = 3;
    this.score = 0;
    this.livesCounter.textContent = `Lives: ${this.lives}`;
    this.updateScoreDisplay();
    this.isGameOver = false;
  }

  clearFinalScoreElement() {
    const finalScoreElement = document.getElementById("final-score");
    if (finalScoreElement) {
      finalScoreElement.textContent = `Final Score: ${this.score}`;
    }
  }

  clearObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.obstacles = [];
  }

  playerReset() {
    this.player.resetPosition();
  }
}
