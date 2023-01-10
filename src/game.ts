import CollisionManager from './collision-manager';
import GameObject from './game-object';
import Manager from './manager';
import Ball from "./ball";

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
  public ctx: CanvasRenderingContext2D;

  /**
   * Contains all game object instances.
   * Either physical or virtual.
   */
  public instances: GameObject[] = [];

  /**
   * Contains all manager instances.
   */
  public managers: Manager[] = [new CollisionManager(this)];

  constructor(public readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  /**
   * The game loop.
   * Runs every frame.
   *
   * Game logic is executed here.
   */
  private loop(): void {
    this.instances.forEach((instance) => instance.update());
    requestAnimationFrame(() => this.loop());
  }

  /**
   * Initializes the game.
   * Instances and managers are created here.
   *
   * Runs once.
   */
  private init(): void {
    this.instances.push(
        new Ball(this)
    );
  }

  /**
   * Entry point of the game.
   */
  public start(): void {
    this.init();
    this.loop();
  }
}

export default Game;
