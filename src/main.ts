import Game from './game';
import './style.css';

const canvas = document.getElementById(
  'game-canvas'
) as HTMLCanvasElement | null;

if (!canvas) {
  throw new Error('No canvas element found');
}

const game: Game = new Game(canvas);
game.start();
