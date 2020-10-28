// @ts-ignore
import { ko, obs, obsArr, comp } from 'lib/knockout-util.ts';

import { TYPE_LIST, PokemonTypeName, PokemonType, AttackMultiplier, convertAllTypes, extractAllTypes, convertType } from 'lib/pokemon-types';

function multiplierToClass(multiplier: AttackMultiplier): string {
  switch(multiplier) {
    case 0:
      return 'x0';
    case 0.25:
      return 'x0_25';
    case 0.5:
      return 'x0_5';
    case 2:
      return 'x2';
    case 4:
      return 'x4';
    default:
      return 'x1';
  }
}

const deploymentId = process.env.VERCEL_URL ? process.env.VERCEL_URL.replace(/^.*?-([a-zA-Z0-9]+)\.vercel\.app.*$/, '$1') : 'N/A';

function classNameComp(self: Model, type: PokemonType): ko.PureComputed<string> {
  return comp(self, (self: Model): string => {
    const activeTypes = self.activeTypes();
    if(activeTypes.length <= 0) { return `${type.typeName} x1`; }
    const multiplier: AttackMultiplier = type.attack(activeTypes[0], activeTypes[1] || null);
    return `${type.typeName} ${multiplierToClass(multiplier)}`;
  });
}

const dbgOrder: PokemonType[] = convertAllTypes('grass', 'water', 'fire', 'ice');

class Model {
  readonly activeTypes: ko.ObservableArray<PokemonType>;
  private readonly _showDebug: ko.Observable<boolean>;
  private readonly _iconSize: ko.Observable<number>;
  private readonly _windowWidth: ko.Observable<number>;
  private readonly _windowHeight: ko.Observable<number>;
  private readonly _extraInfo: ko.PureComputed<string>;
  readonly classNames: { [key in PokemonTypeName]: ko.PureComputed<string> };
  private _debugToggleCounter: number = 0;

  constructor() {
    this.activeTypes = obsArr();
    this._showDebug = obs(false);
    this._iconSize = obs(-1);
    this._windowWidth = obs(-1);
    this._windowHeight = obs(-1);
    this._extraInfo = comp(this, (self: Model) => {
      if(!self.showDebug) { return ''; }
      // @ts-ignore
      const standalone: Optional<boolean> = window.navigator.standalone;
      const standaloneDisplay: string = standalone === true ? 'true' : standalone === false ? 'false' : standalone === undefined ? 'undefined' : `'${standalone}' (${typeof standalone})`;
      let iconSize: number = self.iconSize;
      let windowWidth: number = self.windowWidth;
      let windowHeight: number = self.windowHeight;
      return `standalone: ${standaloneDisplay}; deployment id: ${deploymentId}; icon size: ${iconSize <= 0 ? '?' : iconSize}px; window: ${windowWidth < 0 ? '?' : windowWidth}x${windowHeight < 0 ? '?' : windowHeight}px`;
    });
    const classNames: Dictionary<ko.PureComputed<string>> = {};
    TYPE_LIST.forEach((type: PokemonType) => {
      classNames[type.typeName] = classNameComp(this, type);
    });
    this.classNames = classNames as { [key in PokemonTypeName]: ko.PureComputed<string> };
  }

  get showDebug(): boolean { return this._showDebug(); }

  set showDebug(value: boolean) { this._showDebug(value); }

  get iconSize(): number { return this._iconSize(); }

  set iconSize(value: number) { this._iconSize(value); }

  get windowWidth(): number { return this._windowWidth(); }

  set windowWidth(value: number) { this._windowWidth(value); }

  get windowHeight(): number { return this._windowHeight(); }

  set windowHeight(value: number) { this._windowHeight(value); }

  get extraInfo(): string { return this._extraInfo(); }

  loadFromStorage(): void {
    const activeTypes: Optional<string> = window.localStorage.getItem('activeTypes');
    if(activeTypes) {
      this.activeTypes.removeAll();
      const typeNames: PokemonTypeName[] = activeTypes.split(/\|/g) as PokemonTypeName[];
      const types: PokemonType[] = convertAllTypes(...typeNames);
      while(types.length > 2) { types.pop(); }
      this.activeTypes.push(...types);
    }
  }

  saveToStorage(): void {
    const activeTypes: PokemonType[] = this.activeTypes();
    if(activeTypes.length <= 0) {
      window.localStorage.removeItem('activeTypes');
    } else {
      window.localStorage.setItem('activeTypes', extractAllTypes(...activeTypes).join('|'));
    }
  }

  toggleActiveType(typeName: PokemonTypeName): void {
    // if(this._debugToggleLast == typeName) {
    //   this._debugToggleCount++;
    //   if(this._debugToggleCount >= 4) {
    //     this._debugToggleLast = null;
    //     this._debugToggleCount = 0;
    //     this.showDebug = !this.showDebug;
    //   }
    // } else {
    //   this._debugToggleLast = typeName;
    //   this._debugToggleCount = 1;
    // }
    const type: PokemonType = convertType(typeName);
    let dbgInc: boolean = false;
    if(this.activeTypes().includes(type)) {
      this.activeTypes.remove(type);
    } else {
      while(this.activeTypes().length > 1) {
        this.activeTypes.shift();
      }
      this.activeTypes.push(type);
      if(dbgOrder[this._debugToggleCounter] == type) {
        dbgInc = true;
      }
    }
    if(dbgInc) {
      this._debugToggleCounter++;
      if(this._debugToggleCounter >= dbgOrder.length) {
        this._debugToggleCounter = 0;
        this.showDebug = !this.showDebug;
      }
    } else {
      this._debugToggleCounter = 0;
    }
    this.saveToStorage();
  }

  removeActiveType(type: PokemonType): void {
    this.activeTypes.remove(type);
    this.saveToStorage();
  }
}

export {
  Model,
  ko
};