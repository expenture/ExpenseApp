 /**
 * @providesModule FBAPI
 */

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';

import store from 'store';

import {
  fbLoginSuccess,
  fbLogoutSuccess
} from './actions';

const requestPermissions = [
  'email',
  'public_profile',
  'user_friends'
];

const FBAPI = {
  login: () => {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithReadPermissions(requestPermissions).then(
        (result) => {
          if (result.isCancelled) {
            reject('cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then((tokenObj) => {
              store.dispatch(fbLoginSuccess(tokenObj));
              resolve(tokenObj);
            }).catch(e => reject(e));
          }
        },
        (error) => {
          reject(error);
        }
      ).catch(e => reject(e));
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      LoginManager.logOut();
      store.dispatch(fbLogoutSuccess());
      resolve();
    });
  }
};

export default FBAPI;
