import { IGameSettings } from "@/data-models/game-settings.data";

export interface IGameSession {
    readonly id: string;
    readonly score: number;
    readonly gameSettings: IGameSettings;
    readonly recordAlreadyHandled: boolean;
}

export class GameSession implements IGameSession {
    score = 0;
    recordAlreadyHandled = false;
    
    constructor(
        readonly id: string,
        readonly gameSettings: IGameSettings
    ) {}
}