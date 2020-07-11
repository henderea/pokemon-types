import * as ko from 'knockout';
declare function obs<T>(data: Dictionary<T> | T, key?: Many<string> | null, def?: any | null): ko.Observable<T>;
declare function obsArr<T>(data?: T[]): ko.ObservableArray<T>;
declare function comp<S, T>(self: S, read: ((self: S) => T), write?: Optional<(self: S, val: T) => void>): ko.PureComputed<T>;
export { ko, obs, obsArr, comp };
