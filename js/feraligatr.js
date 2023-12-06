class Feraligatr {
  constructor(gameScreen, game, bottomMargin) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.width = 80;
    this.height = 80;

    // Set the initial position to the middle top part of the game map
    this.left = (gameScreen.offsetWidth - this.width) / 2;
    this.top = 0;

    this.element = document.createElement("img");
    this.element.src = "images/feraligatr.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.spawn(bottomMargin);
    this.gameScreen.appendChild(this.element);
  }

  spawn(bottomMargin) {
    const initialLeft = (this.gameScreen.offsetWidth - this.width) / 2;
    const initialTop =
      this.gameScreen.offsetHeight - this.height - bottomMargin - 560; // change number for location!

    this.element.style.left = `${initialLeft}px`;
    this.element.style.top = `${initialTop}px`;
  }
}
