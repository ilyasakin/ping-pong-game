import Vector2D from './vector2d';
import Game from './game';
import Dimensions2D from './dimensions2d';
import Position from './position';

class Ball extends Vector2D {
  private game: Game;

  constructor(game: Game) {
    const centerX: number = game.canvas.width / 2;
    const centerY: number = game.canvas.height / 2;
    super(new Position(centerX, centerY), new Dimensions2D(20, 20));
    this.game = game;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    this.draw(this.game.ctx);
  }
}

export default Ball;
