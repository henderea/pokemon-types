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

// @ts-ignore
const deploymentId = process.env.VERCEL_URL ? process.env.VERCEL_URL.replace(/^.*?-([a-zA-Z0-9]+)\.vercel\.app.*$/, '$1') : 'N/A';

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
  private readonly _showDebug: ko.Observable<boolean>;
  private readonly _iconSize: ko.Observable<number>;
  private readonly _windowWidth: ko.Observable<number>;
  private readonly _windowHeight: ko.Observable<number>;
  private readonly _hasActiveTypes: ko.PureComputed<boolean>;
  private readonly _extraInfo: ko.PureComputed<string>;
  readonly allTypes: Array<{ className: ko.PureComputed<string>, type: PokemonType }>;
  private _debugToggleCount: number = 0;
  private _debugToggleLast: PokemonType | null = null;

  constructor() {
    this.activeTypes = obsArr();
    this._showDebug = obs(false);
    this._iconSize = obs(-1);
    this._windowWidth = obs(-1);
    this._windowHeight = obs(-1);
    this._extraInfo = comp(this, (self: Model) => {
      // @ts-ignore
      const standalone: Optional<boolean> = window.navigator.standalone;
      return `standalone: ${standalone === true ? 'true' : standalone === false ? 'false' : standalone === undefined ? 'undefined' : `'${standalone}' (${typeof standalone})`}; deployment id: ${deploymentId}; icon size: ${self.iconSize <= 0 ? '?' : self.iconSize}px; window: ${self.windowWidth}x${self.windowHeight}px`;
    });
    this.allTypes = TYPE_LIST.map((type: PokemonType) => ({
      className: classNameComp(this, type),
      type
    }));
    this._hasActiveTypes = comp(this, (self: Model) => self.activeTypes().length > 0);
  }

  get hasActiveTypes(): boolean { return this._hasActiveTypes(); }

  get showDebug(): boolean { return this._showDebug(); }

  set showDebug(value: boolean) { this._showDebug(value); }

  get iconSize(): number { return this._iconSize(); }

  set iconSize(value: number) { this._iconSize(value); }

  get windowWidth(): number { return this._windowWidth(); }

  set windowWidth(value: number) { this._windowWidth(value); }

  get windowHeight(): number { return this._windowHeight(); }

  set windowHeight(value: number) { this._windowHeight(value); }

  get extraInfo(): string { return this._extraInfo(); }

  toggleActiveType({ type }: { type: PokemonType }): void {
    if(this._debugToggleLast == type) {
      this._debugToggleCount++;
      if(this._debugToggleCount >= 4) {
        this._debugToggleLast = null;
        this._debugToggleCount = 0;
        this.showDebug = !this.showDebug;
      }
    } else {
      this._debugToggleLast = type;
      this._debugToggleCount = 1;
    }
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