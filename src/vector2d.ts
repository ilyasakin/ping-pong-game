import GameObject from './game-object';

class Vector2D extends GameObject {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

export default Vector2D;
