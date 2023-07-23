import Scene from './abstracts/scene';
import GameScene from './scenes/game-scene';

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

  public currentScene: Scene | null = new GameScene(this);

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
    if (!this.currentScene?.isInitialized) {
      this.currentScene?.init();
    }

    this.currentScene?.loop();

    requestAnimationFrame(() => this.loop());
  }

  /**
   * Initializes the game.
   * Instances and managers are created here.
   *
   * Runs once.
   */
  private init(): void {}

  /**
   * Entry point of the game.
   */
  public start(): void {
    this.init();
    this.loop();
  }
}

export default Game;
