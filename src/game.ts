import Scene from './abstracts/scene';
import MenuScene from './scenes/menu-scene';
import Position from './position';

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

  public mousePosition: Position = new Position(0, 0);

  public currentScene: Scene | null = new MenuScene(this);

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
  private init(): void {
    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const canvasRect: DOMRect = this.canvas.getBoundingClientRect();
      this.mousePosition.x = event.clientX - canvasRect.x;
      this.mousePosition.y = event.clientY - canvasRect.y;
    });
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
