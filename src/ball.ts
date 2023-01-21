import Vector2D from "./vector2d";
import Game from "./game";

class Ball extends Vector2D {
    private game: Game;

    constructor(game: Game) {
        const centerX: number = game.canvas.width / 2;
        const centerY: number = game.canvas.height / 2;
        super(centerX, centerY);
        this.game = game;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    public update(): void {
        this.draw(this.game.ctx);
    }
}

export default Ball;
