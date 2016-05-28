import getGlobal from 'utils/getGlobal';

import store from 'store';
import models from 'models';
import ModelsController from 'ModelsController';
import AppRealm from 'AppRealm';
import BackendSession from 'BackendSession';

import ExpentureAPI from 'ExpentureAPI';
import FBAPI from 'FBAPI';

import moment from 'utils/moment';

const modules = {
  getGlobal,

  store,
  models,
  ...models,
  ModelsController,
  AppRealm,
  BackendSession,

  ExpentureAPI,
  FBAPI,

  moment
};

export default function exposeModules() {
  let glob = getGlobal();

  if (glob) {
    for (let key in modules) {
      glob[key] = modules[key];
    }
  }
}

exposeModules();
