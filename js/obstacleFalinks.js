class ObstacleFalinks {
  constructor(gameScreen, bottomMargin, speed = 1) {
    this.gameScreen = gameScreen;
    this.width = 80;
    this.height = 80;
    this.speed = speed;

    this.element = document.createElement("img");
    this.element.src = "images/falinks.png";
    this.element.classList.add("obstacle");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.spawn(bottomMargin);
    this.gameScreen.appendChild(this.element);
  }

  spawn(bottomMargin) {
    const initialLeft = -this.width;
    const initialTop =
      this.gameScreen.offsetHeight -
      bottomMargin * this.gameScreen.offsetHeight -
      this.height;

    this.element.style.left = `${initialLeft}px`;
    this.element.style.top = `${initialTop}px`;
  }

  move() {
    const currentLeft = parseFloat(this.element.style.left);
    this.element.style.left = `${currentLeft + this.speed}px`;

    if (currentLeft > this.gameScreen.offsetWidth) {
      this.spawn();
    }
  }
}
