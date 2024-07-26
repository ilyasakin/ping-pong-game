import Manager from '../abstracts/manager';
import Scene from '../abstracts/scene';
import Ball from '../ball';
import Position from '../position';
import Dimensions2D from '../dimensions2d';
import Button from '../button';
import UInt from '../primitives/uint';
import MenuScene from '../scenes/menu-scene';

class GameManager extends Manager {
  public static readonly WINNING_SCORE: number = 3;

  public player1Score: UInt = new UInt(0);
  public player2Score: UInt = new UInt(0);

  private player1Won: boolean = false;
  private player2Won: boolean = false;
  private playerWon: string | null = null;

  constructor(public readonly scene: Scene) {
    super(scene);
  }

  private drawScore(): void {
    this.scene.game.ctx.font = '48px Arial';
    this.scene.game.ctx.fillStyle = 'white';

    if (this.playerWon) {
      this.scene.game.ctx.fillText(
        `${this.player1Score.value} - ${this.player2Score.value}`,
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2,
      );
    } else {
      this.scene.game.ctx.fillText(
        `${this.player1Score.value} - ${this.player2Score.value}`,
        this.scene.game.canvas.width / 2,
        50,
      );
    }
  }

  private removeGameObjects(): void {
    this.scene.instances = [];
  }

  private drawEndGameMessage(playerWon: string): void {
    this.scene.game.ctx.font = '48px Arial';
    this.scene.game.ctx.fillStyle = 'white';
    this.scene.game.ctx.fillText(
      `${playerWon} won!`,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2 - 100,
    );
  }

  private drawBackToMenuButton(): void {
    if (this.scene.instances.some((instance) => instance instanceof Button)) {
      return;
    }

    const backToMenuButtonInstance: Button = new Button(
      this.scene.game,
      new Position(this.scene.game.canvas.width / 2, this.scene.game.canvas.height / 2 + 120),
      new Dimensions2D(180, 60),
      'Back to menu',
    );

    backToMenuButtonInstance.onClick = () => {
      this.scene.game.changeScene(new MenuScene(this.scene.game));
    };

    backToMenuButtonInstance.init();

    this.scene.instances.push(backToMenuButtonInstance);
  }

  private checkEndGame(): void {
    this.player1Won = this.player1Score.value >= GameManager.WINNING_SCORE;
    this.player2Won = this.player2Score.value >= GameManager.WINNING_SCORE;

    if (!this.player1Won && !this.player2Won) {
      return;
    }

    if (this.player1Won) {
      this.playerWon = 'Player 1';
    }

    if (this.player2Won) {
      this.playerWon = 'Player 2';
    }
  }

  public init(): void {
    this.player1Score.value = 0;
    this.player2Score.value = 0;
    console.log('Game Manager initialized!');
  }

  public run(): void {
    if (this.playerWon) {
      this.drawEndGameMessage(this.playerWon);
      this.drawScore();
      return;
    }

    this.drawScore();
    this.checkEndGame();

    if (this.playerWon) {
      this.removeGameObjects();
      this.drawEndGameMessage(this.playerWon);
      this.drawBackToMenuButton();
      return;
    }

    this.scene.instances.forEach((instance) => {
      if (instance instanceof Ball === false) {
        return;
      }

      const ball: Ball = instance as Ball;

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
