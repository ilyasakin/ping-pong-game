import Vector2D from "./vector2d";
import Position from "./position";
import Game from "./game";
import PlayerControls from "./player-controls";

class Player extends Vector2D {
  constructor(private readonly game: Game, public readonly controls: PlayerControls, position: Position) {
    super(position.x, position.y);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.x, this.y, 20, 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    this.draw(this.game.ctx);
  }
}

export default Player;