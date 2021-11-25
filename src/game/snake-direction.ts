export enum SnakeDirection {
    Up,
    Right,
    Down,
    Left,
  }
  
  export function areDirectionsOpposite(
    dir1: SnakeDirection,
    dir2: SnakeDirection
  ): boolean {
    switch (dir1) {
      case SnakeDirection.Up:
        return dir2 == SnakeDirection.Down;
      case SnakeDirection.Right:
        return dir2 == SnakeDirection.Left;
      case SnakeDirection.Down:
        return dir2 == SnakeDirection.Up;
      case SnakeDirection.Left:
        return dir2 == SnakeDirection.Right;
    }
  }
  