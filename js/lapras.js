class lapras {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 80;
    this.height = 80;
    this.speed = 1;

    this.element = document.createElement("img");
    this.element.src = "/images/lapras.png";
    this.element.classList.add("platform");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.spawn(bottomMargin);
    this.gameScreen.appendChild(this.element);
  }
}
