import GameObject from './game-object';

abstract class Vector2D extends GameObject {
  /**
   * The x coordinate of the vector.
   */
  public x: number;
  /**
   * The y coordinate of the vector.
   */
  public y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

export default Vector2D;
