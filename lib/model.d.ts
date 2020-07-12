import { ko } from 'lib/knockout-util.ts';
import { PokemonType } from 'lib/pokemon-types';
declare class Model {
    readonly activeTypes: ko.ObservableArray<PokemonType>;
    private readonly _showDebug;
    private readonly _hasActiveTypes;
    readonly allTypes: Array<{
        className: ko.PureComputed<string>;
        type: PokemonType;
    }>;
    private _debugToggleCount;
    private _debugToggleLast;
    constructor();
    get hasActiveTypes(): boolean;
    get showDebug(): boolean;
    set showDebug(value: boolean);
    get extraInfo(): string;
    toggleActiveType({ type }: {
        type: PokemonType;
    }): void;
    removeActiveType(type: PokemonType): void;
}
export { Model, ko };
