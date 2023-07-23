import GameObject from './abstracts/game-object';
import Position from './position';
import Dimensions2D from './dimensions2d';
import Game from './game';

class Button extends GameObject {
  constructor(
    private readonly game: Game,
    private readonly position: Position,
    private readonly dimensions: Dimensions2D,
    public readonly text: string,
  ) {
    super();
  }

  public init() {}

  public get isHovered(): boolean {
    const { x, y } = this.game.mousePosition;
    const { width, height } = this.dimensions;

    const posX: number = this.position.x - width / 2;
    const posY: number = this.position.y - height / 2;

    return x > posX && x < posX + width && y > posY && y < posY + height;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const x: number = this.position.x - this.dimensions.width / 2;
    const y: number = this.position.y - this.dimensions.height / 2;

    ctx.font = '20pt Helvetica';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rect(x, y, this.dimensions.width, this.dimensions.height);

    if (!this.isHovered) {
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.text, x + this.dimensions.width / 2, y + this.dimensions.height / 2);
      this.game.canvas.style.cursor = 'default';
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = '#000000';
      ctx.fillText(this.text, x + this.dimensions.width / 2, y + this.dimensions.height / 2);
      this.game.canvas.style.cursor = 'pointer';
    }

    ctx.closePath();
  }

  public update() {
    this.draw(this.game.ctx);
  }
}

export default Button;
