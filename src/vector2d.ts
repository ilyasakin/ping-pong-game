import Dimensions2D from './dimensions2d';
import GameObject from './game-object';
import Position from './position';

/**
 * A class representing a 2D vector.
 */
abstract class Vector2D extends GameObject {
  constructor(public position: Position, public dimensions: Dimensions2D) {
    super();
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}

export default Vector2D;
