class EasterEgg {
  constructor(gameScreen, game, bottomMargin) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.width = 100;
    this.height = 100;

    // Set the initial position to the middle top part of the game map
    this.left = (gameScreen.offsetWidth - this.width) / 2;
    this.top = 0;

    this.element = document.createElement("img");
    this.element.src = "images/easteregg.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.spawn(bottomMargin);
    this.gameScreen.appendChild(this.element);
  }

  spawn() {
    const minX = 0;
    const maxX = this.gameScreen.offsetWidth - this.width;
    const minY = 0;
    const maxY = this.gameScreen.offsetHeight - this.height;

    const randomLeft = Math.random() * (maxX - minX) + minX;
    const randomTop = Math.random() * (maxY - minY) + minY;

    this.element.style.left = `${randomLeft}px`;
    this.element.style.top = `${randomTop}px`;
  }
}
