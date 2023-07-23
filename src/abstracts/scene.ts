import GameObject from './game-object';
import Manager from './manager';
import Game from '../game';

abstract class Scene {
  public abstract doesSceneNeedsMousePosition: boolean;
  public abstract isInitialized: boolean;
  /**
   * Contains all game object instances.
   * Either physical or virtual.
   */
  public abstract instances: GameObject[];

  /**
   * Contains all manager instances.
   */
  public abstract managers: Manager[];

  constructor(public game: Game) {}

  public abstract init(): void;

  public abstract loop(): void;

  public abstract destroy(): void;
}

export default Scene;
