import Scene from '../abstracts/scene';
import GameObject from '../abstracts/game-object';
import Manager from '../abstracts/manager';
import Game from '../game';
import Dimensions2D from '../dimensions2d';
import Ball from '../ball';
import Player from '../player';
import PlayerControls from '../player-controls';
import Position from '../position';
import CollisionManager from '../managers/collision-manager';

class GameScene extends Scene {
  public isInitialized: boolean = false;
  public doesSceneNeedsMousePosition: boolean = false;
  public instances: GameObject[] = [];
  public managers: Manager[] = [];

  constructor(public readonly game: Game) {
    super(game);
  }

  public init(): void {
    this.managers.push(new CollisionManager(this));

    const playerDimensions: Dimensions2D = new Dimensions2D(20, 100);
    const playerCenter: number = this.game.canvas.height / 2 - playerDimensions.height / 2;

    this.instances.push(
      new Ball(this),
      new Player(
        this.game,
        new PlayerControls('w', 's'),
        new Position(20, playerCenter),
        playerDimensions,
      ),
      new Player(
        this.game,
        new PlayerControls('ArrowUp', 'ArrowDown'),
        new Position(760, playerCenter),
        playerDimensions,
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

  public destroy(): void {
    this.instances.forEach((instance: GameObject) => instance.destroy());
    this.managers.forEach((manager: Manager) => manager.destroy());
  }
}

export default GameScene;
