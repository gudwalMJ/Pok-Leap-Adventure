class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end");
    this.height = 750;
    this.width = 900;
    this.player = null;
    this.obstacles = [];
    this.animateId = null;
    this.score = 0;
    this.lives = 3;
    this.livesCounter = document.getElementById("lives-counter");
    this.livesCounter.textContent = `Lives: ${this.lives}`;
    this.isGameOver = false;

    // Constants
    this.obstacleMargins = [0.12, 0.24, 0.18];
    this.obstacleDelay = 2000; // milliseconds
  }

  start() {
    this.hideScreens();
    this.setGameScreenSize();
    this.createPlayer();
    this.createObstacles(3);
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
    this.player = new Player(this.gameScreen);
  }

  createObstacles(numObstacles) {
    this.obstacles = []; // Reset obstacles array

    for (let i = 0; i < numObstacles; i++) {
      setTimeout(() => this.createObstacle(i), i * this.obstacleDelay);
    }
  }

  createObstacle(index) {
    const obstacle = new ObstacleFalinks(
      this.gameScreen,
      this.obstacleMargins[index]
    );
    this.obstacles.push(obstacle);
  }

  gameLoop() {
    this.player.move();
    this.moveObstacles();
    this.checkCollisions();

    this.animateId = requestAnimationFrame(() => this.gameLoop());
  }

  moveObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.move());
  }

  checkCollisions() {
    this.obstacles.forEach((obstacle) => {
      const playerRect = this.getPlayerHitbox();
      const obstacleRect = this.getObstacleHitbox(obstacle);

      if (this.isCollision(playerRect, obstacleRect)) {
        this.handleCollision();
      }
    });
  }

  isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  getPlayerHitbox() {
    const playerRect = this.player.element.getBoundingClientRect();
    return this.adjustHitbox(playerRect);
  }

  getObstacleHitbox(obstacle) {
    const obstacleRect = obstacle.element.getBoundingClientRect();
    return this.adjustHitbox(obstacleRect);
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
