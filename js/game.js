class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end");
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
    this.livesCounter = document.getElementById("lives-counter");
    this.isGameOver = false;

    // Constants
    this.obstacleMargins = [0.12, 0.24, 0.18];
    this.obstacleDelay = 1500; // milliseconds

    // Bind methods to the instance
    this.gameLoop = this.gameLoop.bind(this);
  }

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

  createPlayer() {
    this.player = new Player(this.gameScreen, this);
  }

  createBerry() {
    if (this.score > 0 && this.score % 300 === 0 && !this.berry) {
      console.log("Creating Berry. Score:", this.score);
      this.berry = new Berry(this.gameScreen, this);
    }
  }

  createEasterEgg() {
    // Check if the score is greater than or equal to 1000 to spawn Easter Egg
    if (this.score >= 1000 && !this.easterEggAppeared) {
      const easterEgg = new EasterEgg(this.gameScreen);
      easterEgg.spawn();
      this.easterEggs.push(easterEgg);

      // Set the flag to true so that the Easter Egg won't appear again
      this.easterEggAppeared = true;
    }
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
    const bottomMargin = 0.35; // Set the value as needed
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

    // Shuffle the laprasObstacleMargins array randomly
    const shuffledMargins = this.shuffleArray(laprasObstacleMargins);

    // Use the shuffled margin for the current Lapras obstacle
    const lapras = new ObstacleLapras(
      this.gameScreen,
      shuffledMargins[index % shuffledMargins.length], // Use modulo to cycle through shuffled margins
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

  createObstacles(numObstacles) {
    this.obstacles = [];

    for (let i = 0; i < numObstacles; i++) {
      setTimeout(() => this.createObstacle(i), i * this.obstacleDelay);
    }
  }

  createObstacle(index) {
    const shuffledMargins = this.shuffleArray(this.obstacleMargins);

    // Use the shuffled margin for the current obstacle
    const obstacle = new ObstacleFalinks(
      this.gameScreen,
      shuffledMargins[index % shuffledMargins.length] // Use modulo to cycle through shuffled margins
    );
    this.obstacles.push(obstacle);
  }

  // Helper function to shuffle an array (Fisher-Yates algorithm)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  gameLoop() {
    if (!this.isGameOver) {
      this.player.move();
      this.moveObstacles();
      this.checkCollisions();
      this.updateScoreDisplay();
      this.createEasterEgg(); // Check for Easter Egg creation
      this.createBerry(); // Check for Berry creation

      this.animateId = requestAnimationFrame(this.gameLoop);
    }
  }

  moveObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.move());
    this.laprases.forEach((lapras) => lapras.move());
    this.lotads.forEach((lotad) => lotad.move());
  }

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

  updateScoreDisplay() {
    // Update the score display element (assuming you have an element with id 'score-counter')
    const scoreCounter = document.getElementById("score-counter");
    if (scoreCounter) {
      scoreCounter.textContent = `Score: ${this.score}`;
    }
  }

  handleFeraligatrCollision() {
    // Increase the score
    this.score += 150; // You can adjust the score increment as needed

    // Update the score display
    this.updateScoreDisplay();

    this.playerReset();
  }

  handleEasterEggCollision(easterEgg) {
    // Increase the score by 1000
    this.score += 1500;

    // Update the score display
    this.updateScoreDisplay();

    // Remove the Easter Egg from the game
    const index = this.easterEggs.indexOf(easterEgg);
    if (index !== -1) {
      this.easterEggs.splice(index, 1);
      easterEgg.element.remove();
    }
  }

  handleBerryCollision(berry) {
    // Handle collision logic for Berry
    berry.handleCollision();
  }

  getPlayerHitbox() {
    const playerRect = this.player.element.getBoundingClientRect();
    return this.adjustHitbox(playerRect);
  }

  getObstacleHitbox(obstacle) {
    if (obstacle) {
      const obstacleRect = obstacle.element.getBoundingClientRect();
      return this.adjustHitbox(obstacleRect);
    } else {
      // Handle the case where obstacle is null (or not defined)
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

  handleCollision() {
    this.lives--;

    console.log("Lives:", this.lives);
    this.livesCounter.textContent = `Lives: ${this.lives}`;

    if (this.lives <= 0) {
      this.resetGame();
    } else {
      this.playerReset();
    }
  }

  resetGame() {
    this.isGameOver = true;
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "block";
    // Additional actions as needed
  }

  playerReset() {
    this.player.resetPosition();
  }

  endGame() {
    this.isGameOver = true;
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "block";
    this.isGameOver = true;
    this.lives = 3; // Reset the number of lives
    this.score = 0; // Reset the score
    this.livesCounter.textContent = `Lives: ${this.lives}`;
    this.updateScoreDisplay();
    this.clearObstacles();
    this.createObstacles(7);
    this.createLapras();
    this.createLotadObstacles(7);
    this.createFeraligatr(1);
    this.isGameOver = false;
    this.gameLoop();
    // Reset game state
    this.resetGameState();

    console.log("Game Over");
  }

  resetGameState() {
    this.player.resetPosition();
    this.lives = 3;
    this.clearObstacles();
    this.isGameOver = false;
  }

  clearObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.obstacles = [];
  }
}
