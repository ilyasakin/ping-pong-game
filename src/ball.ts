import Vector2D from './vector2d';
import Game from './game';
import Dimensions2D from './dimensions2d';
import Position from './position';
import Direction from './direction';
import Scene from "./scene";

class Ball extends Vector2D {
  private game: Game;
  public direction: Direction = new Direction(0);

  constructor(scene: Scene) {
    const centerX: number = scene.game.canvas.width / 2;
    const centerY: number = scene.game.canvas.height / 2;
    super(new Position(centerX, centerY), new Dimensions2D(20, 20));
    this.game = scene.game;
  }

  public init(): void {
    const randomDirection: number = Math.floor(Math.random() * 360);
    this.direction.value = randomDirection;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    this.position.x += Math.cos((this.direction.value * Math.PI) / 180) * 5;
    this.position.y += Math.sin((this.direction.value * Math.PI) / 180) * 5;
    this.draw(this.game.ctx);
  }
}

export default Ball;
