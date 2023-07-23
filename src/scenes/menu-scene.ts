import Scene from '../abstracts/scene';
import GameObject from '../abstracts/game-object';
import Manager from '../abstracts/manager';
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
