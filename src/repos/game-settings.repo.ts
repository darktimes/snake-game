import { GameSettings, IGameSettings } from "@/data-models/game-settings.data";
import { GameSpeed } from "@/data-models/game-speed.enum";

export interface IGameSettingsRepo {
    readonly gameSettings: IGameSettings;
    updateSpeed(value: GameSpeed): void;
    updateBoundariesLocked(value: boolean): void;
}

class GameSettingsRepo implements IGameSettingsRepo{
    readonly gameSettingsStorageKey = "KEY_GAMESETTINGS";
    readonly gameSettings: GameSettings;

    constructor() {
        const gameSettingsStr: string | null = localStorage.getItem(this.gameSettingsStorageKey);
        
        if (typeof gameSettingsStr !== undefined && gameSettingsStr) {
            this.gameSettings = JSON.parse(gameSettingsStr) as GameSettings;
        } else {
            this.gameSettings = new GameSettings(GameSpeed.Moderate, true);
            this.saveGameSettings();
        }
    }

    updateSpeed(value: GameSpeed) {
        this.gameSettings.gameSpeed = value;
        this.saveGameSettings()
    }

    updateBoundariesLocked(value: boolean) {
        this.gameSettings.boundariesLocked = value;
        this.saveGameSettings()
    }

    private saveGameSettings() {
        localStorage.setItem(this.gameSettingsStorageKey, JSON.stringify(this.gameSettings));
    }
}

export const gameSettingsRepo = new GameSettingsRepo() as IGameSettingsRepo;
