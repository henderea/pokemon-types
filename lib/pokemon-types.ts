import { upperCase } from 'lib/util';

export const TYPE_NAMES = {
  normal: 'normal',
  fire: 'fire',
  water: 'water',
  grass: 'grass',
  electric: 'electric',
  ice: 'ice',
  fighting: 'fighting',
  poison: 'poison',
  ground: 'ground',
  flying: 'flying',
  psychic: 'psychic',
  bug: 'bug',
  rock: 'rock',
  ghost: 'ghost',
  dragon: 'dragon',
  dark: 'dark',
  steel: 'steel',
  fairy: 'fairy'
} as const;

type PokemonTypeKeys = keyof typeof TYPE_NAMES;
export type PokemonTypeName = typeof TYPE_NAMES[PokemonTypeKeys];

function t(...types: PokemonTypeName[]): PokemonTypeName[] {
  return types;
}

export const TYPE_NAME_LIST: PokemonTypeName[] = t('normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy');

export type SingleTypeAttackMultiplier = 2 | 1 | 0.5 | 0;
export type AttackMultiplier = 4 | 2 | 1 | 0.5 | 0.25 | 0;

const makeInstance = Symbol('makeInstance');

export class PokemonType {
  readonly typeDisplay: string;

  private constructor(readonly typeName: PokemonTypeName, readonly weakTypes: PokemonTypeName[], readonly strongTypes: PokemonTypeName[], readonly immuneTypes: PokemonTypeName[] = []) {
    this.typeDisplay = upperCase(typeName);
  }

  static [makeInstance](typeName: PokemonTypeName, weakTypes: PokemonTypeName[], strongTypes: PokemonTypeName[], immuneTypes: PokemonTypeName[] = []): PokemonType {
    return new PokemonType(typeName, weakTypes, strongTypes, immuneTypes);
  }

  weakTo(type: PokemonType | PokemonTypeName): boolean {
    return this.weakTypes.includes(PokemonType.extract(type));
  }

  strongTo(type: PokemonType | PokemonTypeName): boolean {
    return this.strongTypes.includes(PokemonType.extract(type));
  }

  immuneTo(type: PokemonType | PokemonTypeName): boolean {
    return this.immuneTypes.includes(PokemonType.extract(type));
  }

  static extract(type: PokemonType | PokemonTypeName): PokemonTypeName {
    return type instanceof PokemonType ? type.typeName : type;
  }

  static extractAll(...types: Array<PokemonType | PokemonTypeName>): PokemonTypeName[] {
    return types.map(PokemonType.extract);
  }

  static convert(type: PokemonType | PokemonTypeName): PokemonType {
    return type instanceof PokemonType ? type : TYPES[type];
  }

  static convertAll(...types: Array<PokemonType | PokemonTypeName>): Array<PokemonType> {
    return types.map(PokemonType.convert);
  }

  defense(type: PokemonType | PokemonTypeName): SingleTypeAttackMultiplier {
    if(this.immuneTo(type)) { return 0; }
    if(this.weakTo(type)) { return 2; }
    if(this.strongTo(type)) { return 0.5; }
    return 1;
  }

  attack(type1: PokemonType | PokemonTypeName, type2: Optional<PokemonType | PokemonTypeName> = null): AttackMultiplier {
    type1 = PokemonType.convert(type1);
    type2 = type2 && PokemonType.convert(type2);
    let multiplier: number = type1.defense(this);
    if(type2) {
      multiplier = multiplier * type2.defense(this);
    }
    return multiplier as AttackMultiplier;
  }
}

function p(typeName: PokemonTypeName, weakTypes: PokemonTypeName[], strongTypes: PokemonTypeName[], immuneTypes: PokemonTypeName[] = []): PokemonType {
  return PokemonType[makeInstance](typeName, weakTypes, strongTypes, immuneTypes);
}

export const TYPES: { readonly [key in PokemonTypeKeys]: PokemonType } = {
  normal: p('normal', t('fighting'), t(), t('ghost')),
  fire: p('fire', t('water', 'ground', 'rock'), t('fire', 'grass', 'ice', 'bug', 'steel', 'fairy')),
  water: p('water', t('grass', 'electric'), t('fire', 'water', 'ice', 'steel')),
  grass: p('grass', t('fire', 'ice', 'poison', 'flying', 'bug'), t('water', 'grass', 'electric', 'ground')),
  electric: p('electric', t('ground'), t('electric', 'flying', 'steel')),
  ice: p('ice', t('fire', 'fighting', 'rock', 'steel'), t('ice')),
  fighting: p('fighting', t('flying', 'psychic', 'fairy'), t('bug', 'rock', 'dark')),
  poison: p('poison', t('ground', 'psychic'), t('grass', 'fighting', 'poison', 'bug', 'fairy')),
  ground: p('ground', t('water', 'grass', 'ice'), t('poison', 'rock'), t('electric')),
  flying: p('flying', t('electric', 'ice', 'rock'), t('grass', 'fighting', 'bug'), t('ground')),
  psychic: p('psychic', t('bug', 'ghost', 'dark'), t('fighting', 'psychic')),
  bug: p('bug', t('fire', 'flying', 'rock'), t('grass', 'fighting', 'ground')),
  rock: p('rock', t('water', 'grass', 'fighting', 'ground', 'steel'), t('normal', 'fire', 'poison', 'flying')),
  ghost: p('ghost', t('ghost', 'dark'), t('poison', 'bug'), t('normal', 'fighting')),
  dragon: p('dragon', t('ice', 'dragon', 'fairy'), t('fire', 'water', 'grass', 'electric')),
  dark: p('dark', t('fighting', 'bug', 'fairy'), t('ghost', 'dark'), t('psychic')),
  steel: p('steel', t('fire', 'fighting', 'ground'), t('normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'), t('poison')),
  fairy: p('fairy', t('poison', 'steel'), t('fighting', 'bug', 'dark'), t('dragon'))
};