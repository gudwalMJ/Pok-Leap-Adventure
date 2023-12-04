class obstacleFalinks {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 30;
    this.height = 30;
    this.speed = 2;

    this.element = document.createElement("img");
    this.element.src = "../images/falinks.png";
    this.element.classList.add("obstacle");
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.spawn();
    this.gameScreen.appendChild(this.element);
  }

  spawn() {
    // Set initial position off-screen
    this.element.style.left = `${this.gameScreen.offsetWidth}px`;
    this.element.style.top = `${
      Math.random() * (this.gameScreen.offsetHeight - this.height)
    }px`;
  }

  move() {
    // Update obstacle position
    const currentLeft = parseFloat(this.element.style.left);
    this.element.style.left = `${currentLeft - this.speed}px`;

    // Check if obstacle is out of bounds, respawn if necessary
    if (currentLeft + this.width < 0) {
      this.spawn();
    }
  }
}
