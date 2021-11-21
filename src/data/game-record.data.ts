import { GameSpeed } from "./game-speed.enum";

export interface IGameRecordData {
  gameSpeed: GameSpeed;
  boundariesLocked: boolean;
  score: number;
  playerName: string;
}

export class GameRecordData implements IGameRecordData {
  constructor(
    public gameSpeed: GameSpeed,
    public boundariesLocked: boolean,
    public score: number,
    public playerName: string
  ) {}
}
