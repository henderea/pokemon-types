// @ts-ignore
import { ko, obs, obsArr, comp } from 'lib/knockout-util.ts';

import { TYPE_NAME_LIST, TYPES, TYPE_NAMES, PokemonType, PokemonTypeName, AttackMultiplier } from 'lib/pokemon-types';

const TYPE_LIST: Array<PokemonType> = PokemonType.convertAll(...TYPE_NAME_LIST);

function multiplierToClass(multiplier: AttackMultiplier): string {
  if(multiplier == 0) { return 'x0'; }
  if(multiplier == 0.25) { return 'x0_25'; }
  if(multiplier == 0.5) { return 'x0_5'; }
  if(multiplier == 2) { return 'x2'; }
  if(multiplier == 4) { return 'x4'; }
  return 'x1';
}

function classNameComp(self: Model, type: PokemonType): ko.PureComputed<string> {
  return comp(self, (self: Model): string => {
    const activeTypes = self.activeTypes();
    if(activeTypes.length <= 0) { return `${type.typeName} x1`; }
    const multiplier: AttackMultiplier = type.attack(activeTypes[0], activeTypes[1] || null);
    return `${type.typeName} ${multiplierToClass(multiplier)}`;
  });
}

class Model {
  readonly activeTypes: ko.ObservableArray<PokemonType>;
  private readonly _hasActiveTypes: ko.PureComputed<boolean>;
  readonly allTypes: Array<{ className: ko.PureComputed<string>, type: PokemonType }>;

  constructor() {
    this.activeTypes = obsArr();
    this.allTypes = TYPE_LIST.map((type: PokemonType) => ({
      className: classNameComp(this, type),
      type
    }));
    this._hasActiveTypes = comp(this, (self: Model) => self.activeTypes().length > 0);
  }

  get hasActiveTypes(): boolean { return this._hasActiveTypes(); }

  toggleActiveType({ type }: { type: PokemonType }): void {
    if(this.activeTypes().includes(type)) {
      this.activeTypes.remove(type);
    } else {
      while(this.activeTypes().length > 1) {
        this.activeTypes.shift();
      }
      this.activeTypes.push(type);
    }
  }

  removeActiveType(type: PokemonType): void {
    this.activeTypes.remove(type);
  }
}

export {
  Model,
  ko
};