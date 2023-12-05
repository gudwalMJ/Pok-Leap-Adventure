class Player {
  constructor(gameScreen, game) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.left = 460;
    this.top = 740;
    this.height = 50;
    this.width = 40;
    this.directionX = 0;
    this.directionY = 0;
    this.prevTime = performance.now();
    this.onLapras = false;

    this.element = document.createElement("img");
    this.element.src = "../images/totodile.png";
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);

    // Bind event handlers
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // Add event listeners
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    // Start the animation loop
    this.animate();
  }

  getPlayerHitbox() {
    const playerRect = this.element.getBoundingClientRect();
    return this.adjustHitbox(playerRect);
  }

  adjustHitbox(rect) {
    return {
      left: rect.left + 7,
      right: rect.right - 7,
      top: rect.top + 13,
      bottom: rect.bottom - 13,
    };
  }

  isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        this.directionY = -1;
        break;
      case "ArrowDown":
        this.directionY = 1;
        break;
      case "ArrowLeft":
        if (!this.onLapras) {
          this.directionX = -1;
        }
        break;
      case "ArrowRight":
        if (!this.onLapras) {
          this.directionX = 1;
        }
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
        this.directionY = 0;
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.directionX = 0;
        break;
    }
  }

  move() {
    const newLeft = this.left + this.directionX * 1.5;
    const newTop = this.top + this.directionY * 1.5;

    // Define the bounds of the game screen
    const minX = 0;
    const maxX = this.gameScreen.offsetWidth - this.width;
    const minY = 0;
    const maxY = this.gameScreen.offsetHeight - this.height;

    // Clamp the new positions within the bounds
    this.left = Math.min(Math.max(newLeft, minX), maxX);
    this.top = Math.min(Math.max(newTop, minY), maxY);

    // Update the player's position on the screen
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  checkLaprasCollision(laprasRect) {
    const playerRect = this.getPlayerHitbox();
    this.onLapras = this.isCollision(playerRect, laprasRect);
  }

  resetPosition() {
    this.left = 460;
    this.top = 740;
    this.onLapras = false;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.prevTime) / 1000; // Convert to seconds
    this.prevTime = currentTime;

    if (!this.game.isGameOver) {
      this.move();
      requestAnimationFrame(() => this.animate());
    }
  }
}
