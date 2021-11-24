import { vec2 } from "./vec2";

export enum Occupator {
    Mouse, Snake
}

type GameAreaField = {
    occupator?: Occupator
}

export interface IGameArea {
    readonly size: vec2;
    isInBounds(position: vec2): boolean;
    occupyField(position: vec2, occupator: Occupator): void;
    freeField(position: vec2): void;
    getFieldOccupator(position: vec2): Occupator | undefined;
    getFieldsOfOccupator(occupator: Occupator): readonly vec2[];
    getNumberOfOccupiedFields(occupator?: Occupator): number;
    wrapPosition(position: vec2): vec2;
    getRandomFreePosition(): vec2 | undefined;
}

export function createGameArea(size: vec2): IGameArea {
    return new GameArea(size);
}

class GameArea implements IGameArea{
    
    private fields: GameAreaField[] = [];
    readonly size: vec2

    constructor(size: vec2) {
        this.size = size;
        for (let i = 0; i < size.x * size.y; i++) {
            this.fields.push({occupator: undefined});
        }
    }

    isInBounds(position: vec2): boolean {
        return position.x >= 0 &&
            position.x < this.size.x &&
            position.y >= 0 &&
            position.y < this.size.y;
    }

    occupyField(position: vec2, occupator: Occupator): void {
        if (!this.isInBounds(position)) return;
        this.fields[position.y * this.size.x + position.x].occupator = occupator;
    }

    freeField(position: vec2): void {
        if (!this.isInBounds(position)) return;
        this.fields[position.y * this.size.x + position.x].occupator = undefined;
    }

    getFieldOccupator(position: vec2): Occupator | undefined {
        if (!this.isInBounds(position)) return undefined;
        return this.fields[position.y * this.size.x + position.x].occupator;
    }

    getFieldsOfOccupator(occupator: Occupator): readonly vec2[] {
        return this.fields
            .filter(field => field.occupator == occupator)
            .map(field => {
                const fieldIndex = this.fields.indexOf(field);
                return new vec2(
                    fieldIndex % this.size.x,
                    Math.floor(fieldIndex / this.size.x)
                );
            });     
    }

    getNumberOfOccupiedFields(occupator?: Occupator): number {
        return this.fields
            .filter(field => field.occupator == occupator).length;
    }

    wrapPosition(position: vec2): vec2 {
        return new vec2(
            (position.x + this.size.x) % this.size.x,
            (position.y + this.size.y) % this.size.y
        );
    }

    getRandomFreePosition(): vec2 | undefined {
        const freeOccupations = this.fields.filter(occ => occ.occupator == undefined);
        if (freeOccupations.length == 0) return undefined;
        const rndIndexInFreeList = Math.floor(Math.random() * (freeOccupations.length - 1));
        const resultIndex = this.fields.indexOf(freeOccupations[rndIndexInFreeList]);
        return new vec2(
            resultIndex % this.size.x,
            Math.floor(resultIndex / this.size.x)
        );
    }
}