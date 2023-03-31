import Game from './game';
import Manager from './manager';
import Player from './player';

class CollisionManager extends Manager {
  constructor(public readonly game: Game) {
    super();
    this.init();
  }

  init() {}

  protected getIsPlayerCollidingWithWall(player: Player): boolean {
    return (
      player.position.y < 0 ||
      player.position.y + player.dimensions.height > this.game.canvas.height
    );
  }

  protected managePlayer(player: Player): void {
    if (this.getIsPlayerCollidingWithWall(player)) {
      player.controls.isUpPressed = false;
      player.controls.isDownPressed = false;
    }
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
