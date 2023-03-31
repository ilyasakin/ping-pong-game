import Vector2D from './vector2d';
import Position from './position';
import Game from './game';
import PlayerControls from './player-controls';
import Dimensions2D from './dimensions2d';

class Player extends Vector2D {
  public isCollidedWallUp: boolean = false;
  public isCollidedWallDown: boolean = false;

  constructor(
    private readonly game: Game,
    public readonly controls: PlayerControls,
    position: Position,
    dimensions: Dimensions2D,
  ) {
    super(position, dimensions);
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
    ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    if (!this.isCollidedWallUp && this.controls.isUpPressed) {
      this.position.y -= 5;
    }

    if (!this.isCollidedWallDown && this.controls.isDownPressed) {
      this.position.y += 5;
    }

    this.draw(this.game.ctx);
  }
}

export default Player;
