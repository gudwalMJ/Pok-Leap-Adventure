class ObstacleLapras {
  constructor(gameScreen, bottomMargin) {
    this.gameScreen = gameScreen;
    this.width = 80;
    this.height = 80;
    this.speed = 1.3;

    this.element = document.createElement("img");
    this.element.src = "images/lapras.png";
    this.element.classList.add("obstacle");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.spawn(bottomMargin);
    this.gameScreen.appendChild(this.element);
  }

  spawn(bottomMargin) {
    const initialLeft = -this.width;
    const initialTop = this.calculateInitialTop(bottomMargin);

    this.element.style.left = `${initialLeft}px`;
    this.element.style.top = `${initialTop}px`;

    // Store bottomMargin as a property of the class instance
    this.bottomMargin = bottomMargin;
  }

  calculateInitialTop() {
    const topLimit = 100; // Top limit in pixels
    const bottomLimit = this.gameScreen.offsetHeight - 335; // Bottom limit in pixels

    const availableHeight = bottomLimit - topLimit;

    const randomTop = Math.random() * availableHeight;
    return topLimit + randomTop;
  }

  move() {
    const currentLeft = parseFloat(this.element.style.left);
    this.element.style.left = `${currentLeft + this.speed}px`;

    if (currentLeft > this.gameScreen.offsetWidth) {
      this.spawn(this.bottomMargin); // Fix: Access bottomMargin as a property of the class instance
    }
  }
}
