import CollisionManager from './collision-manager';
import GameObject from './game-object';
import Manager from './manager';
import Ball from './ball';
import Player from './player';
import Position from './position';
import PlayerControls from './player-controls';

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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
      new Ball(this),
      new Player(this, new PlayerControls('w', 's'), new Position(20, 20)),
      new Player(this, new PlayerControls('ArrowUp', 'ArrowDown'), new Position(760, 20)),
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
