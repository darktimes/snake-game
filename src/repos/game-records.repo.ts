import { GameRecord, IGameRecord } from "@/data-models/game-record.data";
import { GameSettings } from "@/data-models/game-settings.data";
import { GameSpeed } from "@/data-models/game-speed.enum";

export interface IGameRecordsRepo {
    readonly records: IGameRecord[];
    beatsRecord(score: number): boolean;
    insertRecord(score: number, name: string, gameSettings: GameSettings): void;
}

class GameRecordsRepo implements IGameRecordsRepo{
    private readonly recordsStorageKey = "KEY_RECORDS_DATA"

    records: GameRecord[];

    constructor() {
        const recordsStr = localStorage.getItem(this.recordsStorageKey);
        if (typeof recordsStr !== undefined && recordsStr) {
            this.records = JSON.parse(recordsStr) as GameRecord[];
        } else {
            this.records = [
                new GameRecord("Hanz" , 3000, GameSpeed.Moderate, true),
                new GameRecord("Wolfgang", 2000, GameSpeed.Moderate, true),
                new GameRecord("Johaness", 1000, GameSpeed.Slow, true)
            ];
        }
    }

    beatsRecord(score: number): boolean {
        return this.records.some(record => record.score < score);
    }
    
    insertRecord(score: number, name: string, gameSettings: GameSettings): void {
        const record = new GameRecord(name, score, gameSettings.gameSpeed, gameSettings.boundariesLocked);
        this.records.push(record);
        this.records.sort((r1, r2) => r2.score - r1.score);
        this.records.splice(5);
        localStorage.setItem(this.recordsStorageKey, JSON.stringify(this.records));
    }
}

export const gameRecordsRepo = new GameRecordsRepo() as IGameRecordsRepo;