class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 460;
    this.top = 740;
    this.height = 50;
    this.width = 40;
    this.directionX = 0;
    this.directionY = 0;
    this.prevTime = performance.now();

    this.element = document.createElement("img");
    this.element.src = "images/totodile.png";
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

  resetPosition() {
    this.left = 460;
    this.top = 740;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.prevTime) / 1000; // Convert to seconds
    this.prevTime = currentTime;

    this.move();
    requestAnimationFrame(() => this.animate());
  }
}
