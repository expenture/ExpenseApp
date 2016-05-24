import store from 'store';
import models from 'models';
import ModelsControllor from 'ModelsControllor';
import AppRealm from 'AppRealm';
import BackendSession from 'BackendSession';

import ExpentureAPI from 'ExpentureAPI';
import FBAPI from 'FBAPI';

const modules = {
  store,
  models,
  ...models,
  ModelsControllor,
  AppRealm,
  BackendSession,

  ExpentureAPI,
  FBAPI
};

export default function exposeModules() {
  let glob;

  if (typeof global === 'object') {
    glob = global;
  } else if (typeof window === 'object') {
    glob = window;
  }

  if (glob) {
    for (let key in modules) {
      glob[key] = modules[key];
    }
  }
}
