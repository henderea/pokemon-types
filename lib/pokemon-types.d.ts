export declare const TYPE_NAMES: {
    readonly normal: "normal";
    readonly fire: "fire";
    readonly water: "water";
    readonly grass: "grass";
    readonly electric: "electric";
    readonly ice: "ice";
    readonly fighting: "fighting";
    readonly poison: "poison";
    readonly ground: "ground";
    readonly flying: "flying";
    readonly psychic: "psychic";
    readonly bug: "bug";
    readonly rock: "rock";
    readonly ghost: "ghost";
    readonly dragon: "dragon";
    readonly dark: "dark";
    readonly steel: "steel";
    readonly fairy: "fairy";
};
declare type PokemonTypeKeys = keyof typeof TYPE_NAMES;
export declare type PokemonTypeName = typeof TYPE_NAMES[PokemonTypeKeys];
export declare const TYPE_NAME_LIST: PokemonTypeName[];
export declare type SingleTypeAttackMultiplier = 2 | 1 | 0.5 | 0;
export declare type AttackMultiplier = 4 | 2 | 1 | 0.5 | 0.25 | 0;
declare const makeInstance: unique symbol;
export declare class PokemonType {
    readonly typeName: PokemonTypeName;
    readonly weakTypes: PokemonTypeName[];
    readonly strongTypes: PokemonTypeName[];
    readonly immuneTypes: PokemonTypeName[];
    readonly typeDisplay: string;
    private constructor();
    static [makeInstance](typeName: PokemonTypeName, weakTypes: PokemonTypeName[], strongTypes: PokemonTypeName[], immuneTypes?: PokemonTypeName[]): PokemonType;
    weakTo(type: PokemonType | PokemonTypeName): boolean;
    strongTo(type: PokemonType | PokemonTypeName): boolean;
    immuneTo(type: PokemonType | PokemonTypeName): boolean;
    static extract(type: PokemonType | PokemonTypeName): PokemonTypeName;
    static extractAll(...types: Array<PokemonType | PokemonTypeName>): PokemonTypeName[];
    static convert(type: PokemonType | PokemonTypeName): PokemonType;
    static convertAll(...types: Array<PokemonType | PokemonTypeName>): Array<PokemonType>;
    defense(type: PokemonType | PokemonTypeName): SingleTypeAttackMultiplier;
    attack(type1: PokemonType | PokemonTypeName, type2?: Optional<PokemonType | PokemonTypeName>): AttackMultiplier;
}
export declare const TYPES: {
    readonly [key in PokemonTypeKeys]: PokemonType;
};
export {};
