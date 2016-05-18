/**
 * ExpentureAPI
 *
 * A module that is in charge to authenticate and send requests to the backend
 * server. It store and updates its state in the redux store, so that other
 * module or components can access the current API state (e.g. signed in or
 * not).
 *
 * @providesModule ExpentureAPI
 */

import store from 'store';
import getBackendURL from './utils/getBackendURL';
import asyncGetAccessToken from './utils/asyncGetAccessToken';
import apiFetch from './utils/apiFetch';

import {
  changeBackendURL,
  signIn,
  signOut
} from './actions';

const ExpentureAPI = {
  signIn: (username, password) => store.dispatch(signIn(username, password)),
  signOut: (options) => store.dispatch(signOut(options)),
  setBackendURL: (newURL) => {
    store.dispatch(changeBackendURL(newURL));
  },
  getBackendURL,
  asyncGetAccessToken,
  fetch: apiFetch
};

export default ExpentureAPI;
