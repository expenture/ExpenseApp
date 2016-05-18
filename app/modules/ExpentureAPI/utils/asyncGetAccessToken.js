import store from 'store';
import getCurrentUnixTime from 'utils/getCurrentUnixTime';

import { refreshAccessToken } from '../actions';

export default function asyncGetAccessToken() {
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
}
