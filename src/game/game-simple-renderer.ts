import { IGameLogic } from "./game-logic";

export interface ISnakeRenderer {
    readonly gameLogic: IGameLogic;
    render(): void;
}

export function createCanvasRenderer(gameLogic: IGameLogic, canvas: CanvasRenderingContext2D): ISnakeRenderer {
    return new SnakeCanvasRenderer(gameLogic, canvas);
}

class SnakeCanvasRenderer implements ISnakeRenderer {
    constructor(readonly gameLogic: IGameLogic, private canvas: CanvasRenderingContext2D) {}
    
    render(): void {
        this.renderGameArea();
        this.renderMice();
        this.renderSnakeBody();
        this.renderSnakeHead();
    }
    

    private renderGameArea() {
        const areaSize = this.gameLogic.getGameAreaSize();
        this.canvas.fillStyle = "#121212";
        this.canvas.fillRect(0, 0, areaSize.x * 44, areaSize.y * 44);

    }

    private renderMice() {
        const areaSize = this.gameLogic.getGameAreaSize();
        this.canvas.fillStyle = "#F0F000";
        this.gameLogic.getMicePositions().forEach(pos => {
            this.canvas.fillRect(pos.x * 44 + 11, (areaSize.y - pos.y) * 44 + 11, 22, 22);
        });
    }

    private renderSnakeBody() {
        const areaSize = this.gameLogic.getGameAreaSize();
        this.canvas.fillStyle = "#16804f";
        this.gameLogic.snakeBodyPositions.forEach(pos => {
            this.canvas.fillRect(pos.x * 44, (areaSize.y - pos.y) * 44, 44, 44);
        });
    }

    private renderSnakeHead() {
        const areaSize = this.gameLogic.getGameAreaSize();
        this.canvas.fillStyle = "#4fd196";
        const headPos = this.gameLogic.snakeHeadPosition;
        console.log("HeadPos: " + headPos.x * 44 + ", " + headPos.y * 44);
        this.canvas.fillRect(headPos.x * 44, (areaSize.y - headPos.y) * 44, 44, 44);
    }

}