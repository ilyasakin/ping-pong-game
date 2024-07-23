import Manager from '../abstracts/manager';
import Scene from '../abstracts/scene';
import Ball from '../ball';
import UInt from '../primitives/uint';

class GameManager extends Manager {
  public player1Score: UInt = new UInt(0);
  public player2Score: UInt = new UInt(0);

  constructor(public readonly scene: Scene) {
    super(scene);
  }

  public init(): void {
    this.player1Score.value = 0;
    this.player2Score.value = 0;
    console.log('Game Manager initialized!');
  }

  public run(): void {
    this.scene.instances.forEach((instance) => {
      if (instance instanceof Ball === false) return;
      const ball = instance as Ball;

      if (ball.position.x <= 0) {
        this.player2Score.value += 1;
        ball.position.x = this.scene.game.canvas.width / 2;
        ball.position.y = this.scene.game.canvas.height / 2;
      }

      if (ball.position.x >= this.scene.game.canvas.width) {
        this.player1Score.value += 1;
        ball.position.x = this.scene.game.canvas.width / 2;
        ball.position.y = this.scene.game.canvas.height / 2;
      }
    });
  }

  public destroy(): void {
    this.player1Score.value = 0;
    this.player2Score.value = 0;
  }
}

export default GameManager;
