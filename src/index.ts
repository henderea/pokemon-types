import './index.scss';
// const $ = require('jquery');
// require('jquery-ui');
// const _ = require('lodash');
// const rand = require('lodash/random');

import { Model, ko } from 'lib/model';

// @ts-ignore
import registerServiceWorker from '@henderea/static-site-builder/registerServiceWorker';

if(process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

window.addEventListener('load', () => {
  let model = new Model();
  ko.applyBindings(model);
  let updateSizingInfo = () => window.setTimeout(() => {
    let icon: HTMLElement | null = document.querySelector('.icon') as HTMLElement | null;
    model.iconSize = icon ? icon.offsetWidth : -1;
    model.windowWidth = window.innerWidth;
    model.windowHeight = window.innerHeight;
  }, 250);
  window.addEventListener('resize', updateSizingInfo);
  updateSizingInfo();
});