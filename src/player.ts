import Vector2D from './vector2d';
import Position from './position';
import Game from './game';
import PlayerControls from './player-controls';

class Player extends Vector2D {
  constructor(
    private readonly game: Game,
    public readonly controls: PlayerControls,
    position: Position,
  ) {
    super(position.x, position.y);
    this.init();
  }

  private keydownHandler(e: KeyboardEvent): void {
    if (e.key === this.controls.up) {
      this.controls.isUpPressed = true;
    }

    if (e.key === this.controls.down) {
      this.controls.isDownPressed = true;
    }
  }

  private keyupHandler(e: KeyboardEvent): void {
    if (e.key === this.controls.up) {
      this.controls.isUpPressed = false;
    }

    if (e.key === this.controls.down) {
      this.controls.isDownPressed = false;
    }
  }

  private init(): void {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.x, this.y, 20, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    if (this.controls.isUpPressed) {
      this.y -= 5;
    }

    if (this.controls.isDownPressed) {
      this.y += 5;
    }

    this.draw(this.game.ctx);
  }
}

export default Player;
