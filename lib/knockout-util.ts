import * as ko from 'knockout';
// import _first from 'lodash/first';
import _get from 'lodash/get';

function obs<T>(data: Dictionary<T> | T, key: Many<string> | null = null, def: any | null = null): ko.Observable<T> {
  return ko.observable(key ? _get(data, key, def) : data);
}

function obsArr<T>(data: T[] = []): ko.ObservableArray<T> {
  return ko.observableArray(data);
}

function comp<S, T>(self: S, read: ((self: S) => T), write: Optional<(self: S, val: T) => void> = null): ko.PureComputed<T> {
  return ko.pureComputed({
    read() { return read(this); },
    write(val: T) { write && write(this, val); },
    owner: self
  });
}

// function writeValueToProperty(property: any, allBindings: ko.AllBindings, key: string, value: any, checkIfDifferent: boolean) {
//   if(!property || !ko.isObservable(property)) {
//     const propWriters = allBindings.get('_ko_property_writers');
//     if(propWriters && propWriters[key]) {
//       propWriters[key](value);
//     }
//   } else if(ko.isWriteableObservable(property) && (!checkIfDifferent || property.peek() !== value)) {
//     property(value);
//   }
// }
//
// ko.bindingHandlers.file = {
//   init(element: HTMLInputElement, valueAccessor: () => File, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext<any>) {
//     element.addEventListener('change', () => {
//       let file: Optional<File> = _first(element.files);
//       writeValueToProperty(valueAccessor(), allBindings, 'file', file, true);
//     });
//   },
//   update(element: HTMLInputElement, valueAccessor: () => Optional<File | string>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
//     let val: Optional<any> = ko.unwrap(valueAccessor());
//     if(val == null || val == '') {
//       element.value = '';
//     }
//   }
// };
//
// ko.expressionRewriting._twoWayBindings.file = true;
//
// ko.bindingHandlers.element = {
//   init(element: HTMLElement, valueAccessor: () => HTMLElement, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
//     writeValueToProperty(valueAccessor(), allBindings, 'element', element, false);
//   }
// };
//
// ko.expressionRewriting._twoWayBindings.element = true;

export {
  ko,
  obs,
  obsArr,
  comp
};