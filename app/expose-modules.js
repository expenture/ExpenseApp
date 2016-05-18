import store from 'store';
import BackendSession from 'BackendSession';
import ExpentureAPI from 'ExpentureAPI';
import FBAPI from 'FBAPI';

const modules = {
  store,
  BackendSession,
  ExpentureAPI,
  FBAPI
};

export default function exposeModules() {
  let glob;

  if (typeof window === 'object') {
    glob = window;
  }

  if (glob) {
    for (let key in modules) {
      glob[key] = modules[key];
    }
  }
}
