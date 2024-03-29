import Ball from '../ball';
import Dimensions2D from '../dimensions2d';
import Manager from '../abstracts/manager';
import Player from '../player';
import Position from '../position';
import Scene from '../abstracts/scene';

class CollisionManager extends Manager {
  private ball: Ball | null = null;

  constructor(public readonly scene: Scene) {
    super(scene);
  }

  init() {
    this.ball = this.scene.instances.find((instance) => instance instanceof Ball) as Ball;
  }

  private getIsObjectCollidingWithUpWall(dimensions: Dimensions2D, position: Position): boolean {
    return position.y <= 0 + dimensions.height;
  }

  private getIsObjectCollidingWithDownWall(dimensions: Dimensions2D, position: Position): boolean {
    return position.y + dimensions.height >= this.scene.game.canvas.height;
  }

  private getIsPlayerCollidingWithBall(player: Player): boolean {
    if (!this.ball) {
      return false;
    }

    // There is two cases:
    // - The player is on the left side of the screen
    // - The player is on the right side of the screen
    //
    // Consider ball's dimensions as a circle

    const isOnLeftSide = player.position.x <= this.scene.game.canvas.width / 2;
    const isOnRightSide = player.position.x > this.scene.game.canvas.width / 2;

    if (isOnLeftSide) {
      return (
        player.position.x + player.dimensions.width + 1 >=
          this.ball.position.x - this.ball.dimensions.width &&
        player.position.y + player.dimensions.height + 1 >=
          this.ball.position.y - this.ball.dimensions.height &&
        player.position.y <= this.ball.position.y + this.ball.dimensions.height
      );
    }

    if (isOnRightSide) {
      return (
        player.position.x - 1 <= this.ball.position.x + this.ball.dimensions.width &&
        player.position.y + player.dimensions.height + 1 >=
          this.ball.position.y - this.ball.dimensions.height &&
        player.position.y <= this.ball.position.y + this.ball.dimensions.height
      );
    }

    throw new Error('Unexpected code path');
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
      let newDirection: number = 180 - this.ball.direction.value;

      if (newDirection < 0) {
        newDirection = 360 + newDirection;
      }

      this.ball.direction.value = newDirection;
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
    this.scene.instances.forEach((instance) => {
      if (instance instanceof Player) {
        this.managePlayer(instance);
      }

      if (instance instanceof Ball) {
        this.manageBall(instance);
      }
    });
  }

  public destroy() {}
}

export default CollisionManager;
