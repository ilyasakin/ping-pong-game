import GameObject from './game-object';

/**
 * A class representing a 2D vector.
 */
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

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}

export default Vector2D;
