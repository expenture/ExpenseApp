import store from 'store';
import ModelsControllor from 'ModelsControllor';
import AppRealm from 'AppRealm';
import BackendSession from 'BackendSession';

import ExpentureAPI from 'ExpentureAPI';
import FBAPI from 'FBAPI';

import Account from 'models/Account';
import Transaction from 'models/Transaction';

const modules = {
  store,
  ModelsControllor,
  AppRealm,
  BackendSession,

  ExpentureAPI,
  FBAPI,

  Account,
  Transaction
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
