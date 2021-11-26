import { GameSession, IGameSession } from "@/data-models/game-session.data";
import { IGameSettings } from "@/data-models/game-settings.data";
import { v4 as uuid } from 'uuid';

type SessionMap = {
    [key: string]: GameSession
}

export interface IGameSessionsRepo {
    requestNewSession(gameSettings: IGameSettings): GameSession;
    getSession(id: string): IGameSession | undefined;
    updateSession(id: string, score?: number, recordAlreadyHandled?: boolean): void;
}

class GameSessionsRepo implements IGameSessionsRepo{
    private readonly sessionsStorageKey = "KEY_SESSIONS";

    sessions: SessionMap = {};

    constructor() {
        const sessionsStr = localStorage.getItem(this.sessionsStorageKey);
        if (typeof sessionsStr !== undefined && sessionsStr) {
            this.sessions = JSON.parse(sessionsStr);
        }
    }

    requestNewSession(gameSettings: IGameSettings): GameSession {
        const id = uuid();
        const session = new GameSession(id, gameSettings);
        this.sessions[id] = session;
        this.saveSessions();
        return session;
    }

    getSession(id: string): IGameSession | undefined {
        return this.sessions[id];
    }

    updateSession(id: string, score?: number, recordAlreadyHandled?: boolean) : void{
        const session = this.sessions[id];
        if (session === undefined) return;
        session.score = score?? session.score;
        session.recordAlreadyHandled = recordAlreadyHandled ?? session.recordAlreadyHandled;
        this.saveSessions();
    }

    private saveSessions(): void {
        localStorage.setItem(this.sessionsStorageKey, JSON.stringify(this.sessions));
    }
}

export const gameSessionsRepo = new GameSessionsRepo() as IGameSessionsRepo;