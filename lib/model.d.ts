import { ko } from 'lib/knockout-util.ts';
import { PokemonType } from 'lib/pokemon-types';
declare class Model {
    readonly activeTypes: ko.ObservableArray<PokemonType>;
    private readonly _showDebug;
    private readonly _iconSize;
    private readonly _windowWidth;
    private readonly _windowHeight;
    private readonly _extraInfo;
    readonly allTypes: Array<{
        className: ko.PureComputed<string>;
        type: PokemonType;
    }>;
    private _debugToggleCount;
    private _debugToggleLast;
    constructor();
    get showDebug(): boolean;
    set showDebug(value: boolean);
    get iconSize(): number;
    set iconSize(value: number);
    get windowWidth(): number;
    set windowWidth(value: number);
    get windowHeight(): number;
    set windowHeight(value: number);
    get extraInfo(): string;
    loadFromStorage(): void;
    saveToStorage(): void;
    toggleActiveType({ type }: {
        type: PokemonType;
    }): void;
    removeActiveType(type: PokemonType): void;
}
export { Model, ko };
