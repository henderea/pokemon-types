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
export declare function extractType(type: PokemonType | PokemonTypeName): PokemonTypeName;
export declare function extractAllTypes(...types: Array<PokemonType | PokemonTypeName>): PokemonTypeName[];
export declare function convertType(type: PokemonType | PokemonTypeName): PokemonType;
export declare function convertAllTypes(...types: Array<PokemonType | PokemonTypeName>): Array<PokemonType>;
export interface PokemonType {
    readonly typeDisplay: string;
    readonly typeName: PokemonTypeName;
    readonly weakTypes: PokemonTypeName[];
    readonly strongTypes: PokemonTypeName[];
    readonly immuneTypes: PokemonTypeName[];
    weakTo(type: PokemonType | PokemonTypeName): boolean;
    strongTo(type: PokemonType | PokemonTypeName): boolean;
    immuneTo(type: PokemonType | PokemonTypeName): boolean;
    defense(type: PokemonType | PokemonTypeName): SingleTypeAttackMultiplier;
    attack(type1: PokemonType | PokemonTypeName, type2?: PokemonType | PokemonTypeName): AttackMultiplier;
}
export declare class PokemonTypeImpl implements PokemonType {
    readonly typeName: PokemonTypeName;
    readonly weakTypes: PokemonTypeName[];
    readonly strongTypes: PokemonTypeName[];
    readonly immuneTypes: PokemonTypeName[];
    readonly typeDisplay: string;
    constructor(typeName: PokemonTypeName, weakTypes: PokemonTypeName[], strongTypes: PokemonTypeName[], immuneTypes?: PokemonTypeName[]);
    weakTo(type: PokemonType | PokemonTypeName): boolean;
    strongTo(type: PokemonType | PokemonTypeName): boolean;
    immuneTo(type: PokemonType | PokemonTypeName): boolean;
    defense(type: PokemonType | PokemonTypeName): SingleTypeAttackMultiplier;
    attack(type1: PokemonType | PokemonTypeName, type2?: Optional<PokemonType | PokemonTypeName>): AttackMultiplier;
}
export declare const TYPES: {
    readonly [key in PokemonTypeKeys]: PokemonType;
};
export declare const TYPE_LIST: PokemonType[];
export {};
