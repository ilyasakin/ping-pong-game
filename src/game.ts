import CollisionManager from './collision-manager';
import GameObject from './game-object';
import Manager from './manager';
import Ball from './ball';
import Player from './player';
import Position from './position';
import PlayerControls from './player-controls';
import Dimensions2D from './dimensions2d';

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
    const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }

    this.ctx = ctx;
  }

  /**
   * The game loop.
   * Runs every frame.
   *
   * Game logic is executed here.
   */
  private loop(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.instances.forEach((instance: GameObject) => instance.update());
    this.managers.forEach((manager: Manager) => manager.run());
    requestAnimationFrame(() => this.loop());
  }

  /**
   * Initializes the game.
   * Instances and managers are created here.
   *
   * Runs once.
   */
  private init(): void {
    const playerDimensions: Dimensions2D = new Dimensions2D(20, 100);
    const playerCenter: number = this.canvas.height / 2 - playerDimensions.height / 2;

    this.instances.push(
      new Ball(this),
      new Player(
        this,
        new PlayerControls('w', 's'),
        new Position(20, playerCenter),
        playerDimensions,
      ),
      new Player(
        this,
        new PlayerControls('ArrowUp', 'ArrowDown'),
        new Position(760, playerCenter),
        playerDimensions,
      ),
    );

    this.instances.forEach((instance: GameObject) => instance.init());
    this.managers.forEach((manager: Manager) => manager.init());
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
