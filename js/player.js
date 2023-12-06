class Player {
  constructor(gameScreen, game) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.MOVE_SPEED = 1.5;
    this.START_LEFT = 460;
    this.START_TOP = 740;
    this.height = 50;
    this.width = 40;
    this.directionX = 0;
    this.directionY = 0;
    this.prevTime = performance.now();
    this.resetCounter = 0;

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

    this.resetPosition();
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
        this.directionX = -1;
        break;
      case "ArrowRight":
        this.directionX = 1;
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
    const newLeft = this.left + this.directionX * this.MOVE_SPEED;
    const newTop = this.top + this.directionY * this.MOVE_SPEED;

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

  resetPosition() {
    this.left = this.START_LEFT;
    this.top = this.START_TOP;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.resetCounter++;
    this.updateSprite();
  }

  updateSprite() {
    if (this.resetCounter >= 6 && this.resetCounter < 12) {
      // Change sprite to the second evolution (Croconaw)
      this.element.src = "images/croconaw.png";
      this.element.style.width = "50px";
      this.element.style.height = "60px";
      this.MOVE_SPEED = 1.6;
    } else if (this.resetCounter >= 12) {
      // Change sprite to the final evolution (Feraligatr)
      this.element.src = "images/feraligatr2.png";
      this.element.style.width = "70px";
      this.element.style.height = "80px";
      this.MOVE_SPEED = 1.7;
    } else {
      // Default sprite (Totodile)
      this.element.src = "images/totodile.png";
      this.element.style.width = "40px";
      this.element.style.height = "50px";
      this.MOVE_SPEED = 1.5;
    }
  }

  animate() {
    if (!this.game.isGameOver) {
      this.move();
      requestAnimationFrame(() => this.animate());
    }
  }
}
