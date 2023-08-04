import Dimensions2D from '../dimensions2d';
import Position from '../position';
import { v4 as uuid } from 'uuid';

abstract class GameObject {
  public readonly id: string = uuid();

  public isMouseOver: boolean = false;
  public showCursorWhenMouseIsOver: boolean = false;
  public onClick: () => void = () => {};
  public abstract position: Position;
  public abstract dimensions: Dimensions2D;

  public init(): void {}

  /**
   * The update method is called every frame.
   * It is supposed to update the game object's state.
   *
   * While it *could* modify the global game state,
   * it is not supposed to do so.
   */
  public abstract update(): void;

  public abstract destroy(): void;
}

export default GameObject;
