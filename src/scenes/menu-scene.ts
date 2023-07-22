import Scene from '../scene';
import GameObject from '../game-object';
import Manager from '../manager';
import Game from '../game';

class MenuScene extends Scene {
  public isInitialized: boolean = false;
  public instances: GameObject[] = [];
  public managers: Manager[] = [];

  constructor(public readonly game: Game) {
    super(game);
  }

  public init(): void {}

  public loop(): void {}

  public destroy(): void {}
}

export default MenuScene;
