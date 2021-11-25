import { GameSession, IGameSession } from "@/data-models/game-session.data";
import { IGameSettings } from "@/data-models/game-settings.data";
import { v4 as uuid } from 'uuid';

type SessionMap = {
    [key: string]: GameSession
}

export interface IGameSessionsRepo {
    requestNewSession(gameSettings: IGameSettings): GameSession;
    getSession(id: string): IGameSession | undefined;
}

class GameSessionsRepo implements IGameSessionsRepo{
    private readonly sessionsStorageKey = "KEY_SESSIONS";

    sessions: SessionMap = {};

    constructor() {
        const sessionsStr = localStorage.getItem(this.sessionsStorageKey);
        if (typeof sessionsStr !== undefined && sessionsStr) {
            this.sessions = JSON.parse(sessionsStr) as SessionMap ?? {};
        }
    }

    requestNewSession(gameSettings: IGameSettings): GameSession {
        const id = uuid();
        const session = new GameSession(id, gameSettings);
        this.sessions[id] = session;
        localStorage.setItem(this.sessionsStorageKey, JSON.stringify(this.sessions));
        return session;
    }

    getSession(id: string): IGameSession | undefined {
        return this.sessions[id];
    }    
}

export const gameSessionsRepo = new GameSessionsRepo() as IGameSessionsRepo;