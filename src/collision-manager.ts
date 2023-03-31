import Game from './game';
import Manager from './manager';
import Player from './player';

class CollisionManager extends Manager {
  constructor(public readonly game: Game) {
    super();
    this.init();
  }

  init() {}

  protected getIsPlayerCollidingWithUpWall(player: Player): boolean {
    return player.position.y <= 0;
  }

  protected getIsPlayerCollidingWithDownWall(player: Player): boolean {
    return player.position.y + player.dimensions.height >= this.game.canvas.height;
  }

  protected managePlayer(player: Player): void {
    player.isCollidedWallUp = this.getIsPlayerCollidingWithUpWall(player);
    player.isCollidedWallDown = this.getIsPlayerCollidingWithDownWall(player);
  }

  run() {
    this.game.instances.forEach((instance) => {
      if (instance instanceof Player) {
        this.managePlayer(instance);
      }
    });
  }
}

export default CollisionManager;
