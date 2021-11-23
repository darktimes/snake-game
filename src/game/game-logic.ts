import { assert } from "@vue/compiler-core";
import { createGameArea, IGameArea, Occupator } from "./game-area";
import { vec2 } from "./vec2";

export enum SnakeDirection {
  Up,
  Right,
  Down,
  Left,
}

function areDirectionsOpposite(
  dir1: SnakeDirection,
  dir2: SnakeDirection
): boolean {
  switch (dir1) {
    case SnakeDirection.Up:
      return dir2 != SnakeDirection.Down;
    case SnakeDirection.Right:
      return dir2 != SnakeDirection.Left;
    case SnakeDirection.Down:
      return dir2 != SnakeDirection.Up;
    case SnakeDirection.Left:
      return dir2 != SnakeDirection.Right;
  }
}

export interface IGameLogic {
  readonly score: number;
  readonly snakeDirection: SnakeDirection;
  readonly snakeHeadPosition: vec2;
  readonly isGameOver: boolean;
  readonly snakeBodyPositions: vec2[];
  
  update(): void;
  getGameAreaSize(): vec2;
  setSnakeDirection(direction: SnakeDirection): void;
  getMicePositions(): readonly vec2[];
}

export function createGameLogic(boundariesLocked: boolean = true,
    maxMiceInGame: number = 3,
    micePopulationPeriod = 6,
    gameAreaSize: vec2 = new vec2(9, 16),
    initialSnakeSize: number = 4
): IGameLogic {
    return new GameLogic(
        boundariesLocked, 
        maxMiceInGame, 
        micePopulationPeriod, 
        gameAreaSize, 
        initialSnakeSize
    );
}

class GameLogic implements IGameLogic {
  score: number = 0;
  snakeDirection: SnakeDirection = SnakeDirection.Up;
  snakeHeadPosition: vec2;
  isGameOver: boolean = false;
  snakeBodyPositions: vec2[] = [];
  private micePopulationCounter: number = 0;
  private readonly gameArea: IGameArea;

  constructor(
    private boundariesLocked: boolean,
    private maxMiceInGame: number,
    private micePopulationPeriod: number,
    gameAreaSize: vec2,
    initialSnakeSize: number
  ) {
    assert(gameAreaSize.x > 4 && gameAreaSize.y > 4);
    assert(maxMiceInGame > 1);
    assert(micePopulationPeriod > 1);
    assert(Math.floor(gameAreaSize.y / 2) > initialSnakeSize);
    assert(initialSnakeSize > 2);

    this.gameArea = createGameArea(gameAreaSize);

    this.snakeHeadPosition = new vec2(
        Math.floor(gameAreaSize.x / 2),
        Math.floor(gameAreaSize.y / 2)
    );

    this.gameArea.occupyField(this.snakeHeadPosition, Occupator.Snake);

    for (let i = 1; i < initialSnakeSize - 1; i++) {
      const bodyPosition = new vec2(this.snakeHeadPosition.x, this.snakeHeadPosition.y - i);
      this.snakeBodyPositions.push(bodyPosition);
      this.gameArea.occupyField(bodyPosition, Occupator.Snake);
    }

    this.micePopulationCounter = Math.floor(micePopulationPeriod / 2);
  }

  update(): void {
    if (this.isGameOver) return;

    let nextHeadPos = this.getNextPosition(this.snakeHeadPosition);
    if (!this.gameArea.isInBounds(nextHeadPos)) {
      if (this.boundariesLocked) {
        this.isGameOver = true;
        return;
      }
      nextHeadPos = this.gameArea.wrapPosition(nextHeadPos);
    }

    const lastBodyPosition = this.snakeBodyPositions.pop();
    if (lastBodyPosition != undefined) {
        this.gameArea.freeField(lastBodyPosition);
    }

    const nextFieldOccupator = this.gameArea.getFieldOccupator(nextHeadPos);
        
    this.snakeBodyPositions.unshift(this.snakeHeadPosition);
    this.snakeHeadPosition = nextHeadPos;

    if (nextFieldOccupator == Occupator.Snake) {
        this.isGameOver = true;
        return;
    } else if (nextFieldOccupator == Occupator.Mouse) {
        this.score += 100;
        this.gameArea.occupyField(nextHeadPos, Occupator.Snake);
        return;
    }

    this.micePopulationCounter++;
    if (this.micePopulationCounter % this.micePopulationPeriod == 0) {
        this.micePopulationCounter = 0;
        if (this.gameArea.getNumberOfOccupiedFields(Occupator.Mouse) < this.maxMiceInGame) {
            this.addMouse();
        }
    }
  }

  getGameAreaSize(): vec2 {
      return this.gameArea.size;
  }

  setSnakeDirection(direction: SnakeDirection): void {
    if (!areDirectionsOpposite(this.snakeDirection, direction)) {
      this.snakeDirection = direction;
    }
  }

  getMicePositions(): readonly vec2[] {
    return this.gameArea.getFieldsOfOccupator(Occupator.Mouse);
  }

  private getNextPosition(position: vec2): vec2 {
    switch (this.snakeDirection) {
      case SnakeDirection.Up: {
        return new vec2(position.x, position.y + 1);
      }
      case SnakeDirection.Right: {
        return new vec2(position.x + 1, position.y);
      }
      case SnakeDirection.Down: {
        return new vec2(position.x, position.y - 1);
      }
      case SnakeDirection.Left: {
        return new vec2(position.x - 1, position.y);
      }
    }
  }

  private addMouse(): void {
      const nextMousePosition = this.gameArea.getRandomFreePosition();
      if (nextMousePosition == undefined) {
          this.isGameOver = true;
          return;
      }
      this.gameArea.occupyField(nextMousePosition, Occupator.Mouse);
  }
}
