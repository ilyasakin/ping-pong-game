class Game {
  private ctx: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private loop(): void {}

  private init(): void {}

  public start(): void {
    this.init();
    this.loop();
  }
}

export default Game;
