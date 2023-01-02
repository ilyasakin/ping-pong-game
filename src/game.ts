import CollisionManager from './collision-manager';
import GameObject from './game-object';
import Manager from './manager';

/**
 *  Main game class.
 */
class Game {
  /**
   * Directly quoting the interface:
   *
   * The CanvasRenderingContext2D interface, part of the Canvas API,
   * provides the 2D rendering context for the drawing surface of a element.
   * It is used for drawing shapes, text, images, and other objects.
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * Contains all game object instances.
   * Either physical or virtual.
   */
  private instances: GameObject[] = [];

  /**
   * Contains all manager instances.
   */
  private managers: Manager[] = [new CollisionManager(this)];

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private loop(): void {}

  private init(): void {}

  public start(): void {
    this.init();
    this.loop();
  }
}

export default Game;
