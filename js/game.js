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
    this.isGameOver = false;
  }

  start() {
    this.startScreen.style.display = "none";
    this.endScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.player = new Player(this.gameScreen);

    // Create obstacles and add them to the array
    this.createObstacles(5); // You can adjust the number of obstacles

    // Start the game loop
    this.gameLoop();
  }

  createObstacles(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
      const obstacle = new ObstacleFalinks(this.gameScreen);
      this.obstacles.push(obstacle);
    }
  }

  gameLoop() {
    this.player.move();
    this.moveObstacles();
    this.checkCollisions(this.obstacles);

    // Continue the game loop
    this.animateId = requestAnimationFrame(() => this.gameLoop());
  }

  moveObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.move();
    });
  }

  checkCollisions(obstacles) {
    obstacles.forEach((obstacle) => {
      const playerRect = this.player.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        this.handleCollision();
      }
    });
  }
}
