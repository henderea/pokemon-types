import './index.scss';

import { Model, ko } from 'lib/model';

// @ts-ignore
import registerServiceWorker from '@henderea/static-site-builder/registerServiceWorker';

if(process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

window.addEventListener('load', () => {
  const model = new Model();
  ko.applyBindings(model);
  const updateSizingInfo = () => {
    model.windowWidth = window.innerWidth;
    model.windowHeight = window.innerHeight;
    const icon: HTMLElement | null = document.querySelector('.icon') as HTMLElement | null;
    model.iconSize = icon ? icon.offsetWidth : -1;
  };
  window.addEventListener('resize', updateSizingInfo);
  window.setTimeout(() => {
    model.loadFromStorage();
    updateSizingInfo();
  }, 50);
});
