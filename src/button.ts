import GameObject from './abstracts/game-object';
import Position from './position';
import Dimensions2D from './dimensions2d';
import Game from './game';
import Clickable from './abstracts/clickable';

class Button extends GameObject implements Clickable {
  constructor(
    private readonly game: Game,
    public readonly position: Position,
    public readonly dimensions: Dimensions2D,
    public readonly text: string,
  ) {
    super();
  }

  public onClick() {}

  public _onClick() {
    if (this.isMouseOver) {
      this.onClick();
    }
  }

  private onMouseMove(e: MouseEvent) {
    const rect: DOMRect = this.game.canvas.getBoundingClientRect();
    const mouseX: number = e.clientX - rect.left;
    const mouseY: number = e.clientY - rect.top;

    if (
      mouseX > this.position.x - this.dimensions.width / 2 &&
      mouseX < this.position.x + this.dimensions.width / 2 &&
      mouseY > this.position.y - this.dimensions.height / 2 &&
      mouseY < this.position.y + this.dimensions.height / 2
    ) {
      this.isMouseOver = true;
    } else {
      this.isMouseOver = false;
    }
  }

  public init() {
    this.game.canvas.onmousemove = this.onMouseMove.bind(this);
    this.game.canvas.onclick = this._onClick.bind(this);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const x: number = this.position.x - this.dimensions.width / 2;
    const y: number = this.position.y - this.dimensions.height / 2;

    ctx.font = '20pt Helvetica';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rect(x, y, this.dimensions.width, this.dimensions.height);

    if (!this.isMouseOver) {
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

  public destroy() {
    this.game.canvas.onmousemove = null;
    this.game.canvas.onclick = null;
    this.game.canvas.style.cursor = 'default';
  }
}

export default Button;
