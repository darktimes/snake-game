export enum GameSpeed {
    Slow = 0,
    Moderate = 1,
    Fast = 2,
    VeryFast = 3
}

export function gameSpeedAsString(value: GameSpeed): string {
    switch(value) {
        case GameSpeed.Slow: return 'Slow';
        case GameSpeed.Moderate: return 'Moderate';
        case GameSpeed.Fast: return 'Fast';
        case GameSpeed.VeryFast: return 'Very Fast';
      }
}