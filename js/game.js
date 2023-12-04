class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end");
    this.height = 600;
    this.width = 500;
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
    console.dir(this.gameScreen);
    this.player = new Player(this.gameScreen);
    this.gameLoop();
  }

  gameLoop() {
    this.player.move();
  }
}
