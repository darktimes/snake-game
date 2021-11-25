import { GameSpeed } from "./game-speed.enum";

export interface IGameSettings {
  readonly gameSpeed: GameSpeed;
  readonly boundariesLocked: boolean;
}

export class GameSettings implements IGameSettings {
  constructor(public gameSpeed: GameSpeed, public boundariesLocked: boolean) {}
}
