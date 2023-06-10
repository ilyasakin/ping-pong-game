import Ball from './ball';
import Dimensions2D from './dimensions2d';
import Game from './game';
import Manager from './manager';
import Player from './player';
import Position from './position';

class CollisionManager extends Manager {
  private ball: Ball | null = null;

  constructor(public readonly game: Game) {
    super();
  }

  init() {
    this.ball = this.game.instances.find((instance) => instance instanceof Ball) as Ball;
  }

  private getIsObjectCollidingWithUpWall(dimensions: Dimensions2D, position: Position): boolean {
    return position.y <= 0 + dimensions.height;
  }

  private getIsObjectCollidingWithDownWall(dimensions: Dimensions2D, position: Position): boolean {
    return position.y + dimensions.height >= this.game.canvas.height;
  }

  private getIsPlayerCollidingWithBall(player: Player): boolean {
    if (!this.ball) {
      return false;
    }

    // Not working properly
    return (
      player.position.x <= this.ball.position.x + this.ball.dimensions.width &&
      player.position.x + player.dimensions.width >= this.ball.position.x &&
      player.position.y <= this.ball.position.y + this.ball.dimensions.height &&
      player.position.y + player.dimensions.height >= this.ball.position.y
    );
  }

  protected managePlayer(player: Player): void {
    player.isCollidedWallUp = player.position.y <= 0;
    player.isCollidedWallDown = this.getIsObjectCollidingWithDownWall(
      player.dimensions,
      player.position,
    );

    if (!this.ball) {
      return;
    }

    if (this.getIsPlayerCollidingWithBall(player)) {
      this.ball.direction.value = 180 - this.ball.direction.value;
    }
  }

  protected manageBall(ball: Ball) {
    if (this.getIsObjectCollidingWithUpWall(ball.dimensions, ball.position)) {
      ball.direction.value = 360 - ball.direction.value;
    }

    if (this.getIsObjectCollidingWithDownWall(ball.dimensions, ball.position)) {
      ball.direction.value = 360 - ball.direction.value;
    }
  }

  run() {
    this.game.instances.forEach((instance) => {
      if (instance instanceof Player) {
        this.managePlayer(instance);
      }

      if (instance instanceof Ball) {
        this.manageBall(instance);
      }
    });
  }
}

export default CollisionManager;
