import { ko } from 'lib/knockout-util.ts';
import { PokemonType } from 'lib/pokemon-types';
declare class Model {
    readonly activeTypes: ko.ObservableArray<PokemonType>;
    private readonly _hasActiveTypes;
    readonly allTypes: Array<{
        className: ko.PureComputed<string>;
        type: PokemonType;
    }>;
    constructor();
    get hasActiveTypes(): boolean;
    toggleActiveType({ type }: {
        type: PokemonType;
    }): void;
    removeActiveType(type: PokemonType): void;
}
export { Model, ko };
