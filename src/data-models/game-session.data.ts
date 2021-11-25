import { IGameSettings } from "@/data-models/game-settings.data";

export interface IGameSession {
    readonly id: string;
    readonly score: number;
    readonly gameSettings: IGameSettings;
}

export class GameSession implements IGameSession {
    score = 0;
    
    constructor(
        readonly id: string,
        readonly gameSettings: IGameSettings
    ) {}
}