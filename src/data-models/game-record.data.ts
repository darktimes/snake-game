import { GameSpeed } from "./game-speed.enum";

export interface IGameRecord {
  readonly playerName: string,
  readonly score: number, 
  readonly gameSpeed: GameSpeed,
  readonly boundariesLocked: boolean
}

export class GameRecord implements IGameRecord{
  constructor(
    public playerName: string,
    public score: number,
    public gameSpeed: GameSpeed,
    public boundariesLocked: boolean,
  ) {}
}
