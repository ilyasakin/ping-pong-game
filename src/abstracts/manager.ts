import Scene from './scene';

abstract class Manager {
  constructor(public readonly scene: Scene) {}

  public abstract init(): void;
  public abstract run(): void;
  public abstract destroy(): void;
}

export default Manager;
