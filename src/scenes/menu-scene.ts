import Scene from '../abstracts/scene';
import GameObject from '../abstracts/game-object';
import Manager from '../abstracts/manager';
import Game from '../game';
import Button from '../button';
import Dimensions2D from '../dimensions2d';
import Position from '../position';

class MenuScene extends Scene {
  public isInitialized: boolean = false;
  public doesSceneNeedsMousePosition: boolean = true;
  public instances: GameObject[] = [];
  public managers: Manager[] = [];

  constructor(public readonly game: Game) {
    super(game);
  }

  public init(): void {
    this.instances.push(
      new Button(
        this.game,
        new Position(this.game.canvas.width / 2, this.game.canvas.height / 2),
        new Dimensions2D(180, 60),
        'Start',
      ),
    );

    this.instances.forEach((instance: GameObject) => instance.init());
    this.managers.forEach((manager: Manager) => manager.init());

    this.isInitialized = true;
  }

  public loop(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.instances.forEach((instance: GameObject) => instance.update());
    this.managers.forEach((manager: Manager) => manager.run());
  }

  public destroy(): void {}
}

export default MenuScene;
