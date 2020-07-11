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
  ko.applyBindings(new Model());
});