import Game from './game';
import Manager from './manager';

class CollisionManager extends Manager {
  constructor(public readonly game: Game) {
    super();
    this.init();
  }

  init() {}
}

export default CollisionManager;
