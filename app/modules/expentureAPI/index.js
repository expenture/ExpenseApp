/**
 * expentureAPI
 *
 * A module that is in charge to authenticate and send requests to the backend
 * server. It store and updates its state in the redux store, so that other
 * module or components can access the current API state (e.g. signed in or
 * not).
 *
 * @providesModule expentureAPI
 */

import fetch from 'utils/fetch';
import store from 'store';
import getCurrentUnixTime from 'utils/getCurrentUnixTime';
import getBackendURL from './utils/getBackendURL';

import {
  changeBackendURL,
  signIn,
  signOut,
  refreshAccessToken,
  received401
} from './actions';

const expentureAPI = {
  signIn: (username, password) => store.dispatch(signIn(username, password)),
  signOut: () => store.dispatch(signOut()),

  asyncGetAccessToken: () => {
    /**
     * An original solution is: https://git.io/vrTMb,
     * this is better while less rely on setTimeout.
     */
    return new Promise((resolve, reject) => {
      const currentState = store.getState().expentureAPI;

      const waitForRefreshingDoneThenResolve = () => {
        const unsubscribe = store.subscribe(() => {
          const state = store.getState().expentureAPI;
          if (state.status === 'ready') {
            clearTimeout(waitForRefreshingTimeout);
            resolve(state.accessToken);
          } else if (state.status === 'not-authorized') {
            clearTimeout(waitForRefreshingTimeout);
            resolve();
          }
        });

        const waitForRefreshingTimeout = setTimeout(() => {
          unsubscribe();
          reject('asyncGetAccessToken waitForRefreshingTimeout');
        }, 10000);

        // Check the state again to prevent token refreshing is done before the store.subscribe
        const state = store.getState().expentureAPI;
        if (state.status === 'ready') {
          unsubscribe();
          clearTimeout(waitForRefreshingTimeout);
          resolve(state.accessToken);
        }
      };

      if (currentState.status === 'ready') {
        const currentUnixTime = getCurrentUnixTime();
        const accessTokenExpireTime =
          currentState.accessTokenCreatedAt + currentState.accessTokenExpiresIn;

        // If the token is ablout to expire, refresh it
        if (accessTokenExpireTime - currentUnixTime < 60 * 5) {
          store.dispatch(refreshAccessToken());
          waitForRefreshingDoneThenResolve();
        } else {
          resolve(currentState.accessToken);
        }
      } else if (currentState.status === 'token-refreshing') {
        waitForRefreshingDoneThenResolve();
      } else {
        resolve();
      }
    });
  },

  fetch: async (uri, options = {}) => {
    if (!uri.match(/^http/)) {
      uri = `${getBackendURL()}${uri}`;
    }

    const accessToken = await expentureAPI.asyncGetAccessToken();
    options = {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...(options.headers || {})
      }
    };

    return fetch(uri, options).then((response) => {
      if (response.status === 401) {
        const currentState = store.getState().expentureAPI;
        if (currentState.status === 'ready') {
          store.dispatch(received401());
        }
      }
      return response;
    });
  },

  setBackendURL: (newURL) => {
    store.dispatch(changeBackendURL(newURL));
  },

  getBackendURL
};

export default expentureAPI;
