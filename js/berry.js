class Berry {
  constructor(gameScreen, game) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.element = document.createElement("img");
    this.element.src = "../images/berry.png";
    this.element.className = "berry";
    this.size = 50; // Adjust the size as needed
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.spawn();
    this.gameScreen.appendChild(this.element);
    this.element.style.position = "absolute";
  }

  spawn() {
    // Randomly position the berry on the game map
    const maxX = this.game.width - this.size;
    const maxY = this.game.height - this.size;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    // Add the berry element back to the game screen
    this.game.gameScreen.appendChild(this.element);
  }

  handleCollision() {
    // Increase the player's lives by 1
    this.game.lives += 1;

    // Update the lives display
    this.game.livesCounter.textContent = `Lives: ${this.game.lives}`;

    this.collected = true;

    // Remove the berry from the game
    this.element.remove();
    console.log("Berry collected. Lives:", this.game.lives);
  }
}
