import Manager from '../abstracts/manager';
import Scene from '../abstracts/scene';

class EventManager extends Manager {
  constructor(public readonly scene: Scene) {
    super(scene);
  }

  private mouseClickHandler(event: MouseEvent): void {
    const canvasRect: DOMRect = this.scene.game.canvas.getBoundingClientRect();

    this.scene.instances.forEach((instance) => {
      const x = event.clientX - canvasRect.x;
      const y = event.clientY - canvasRect.y;

      const { width, height } = instance.dimensions;
      const posX: number = instance.position.x - width / 2;
      const posY: number = instance.position.y - height / 2;

      const isClickedGameObject: boolean =
        x > posX && x < posX + width && y > posY && y < posY + height;

      if (isClickedGameObject) {
        instance?.onClick();
      }
    });
  }

  private mouseMoveHandler(event: MouseEvent): void {
    const canvasRect: DOMRect = this.scene.game.canvas.getBoundingClientRect();

    this.scene.instances.forEach((instance) => {
      const x = event.clientX - canvasRect.x;
      const y = event.clientY - canvasRect.y;

      const { width, height } = instance.dimensions;
      const posX: number = instance.position.x - width / 2;
      const posY: number = instance.position.y - height / 2;

      instance.isMouseOver = x > posX && x < posX + width && y > posY && y < posY + height;
    });
  }

  public init() {
    this.scene.game.canvas.addEventListener('click', this.mouseClickHandler.bind(this));

    if (this.scene.doesSceneNeedsMousePosition) {
      this.scene.game.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    }
  }

  public run() {}

  public destroy() {
    this.scene.game.canvas.removeEventListener('click', this.mouseClickHandler.bind(this));
    this.scene.game.canvas.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
  }
}

export default EventManager;
