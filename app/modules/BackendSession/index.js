/**
 * @providesModule BackendSession
 */

import store from 'store';
import AppRealm from 'AppRealm';
import ExpentureAPI from 'ExpentureAPI';
import PushNotification from 'PushNotification';
import FBAPI from 'FBAPI';

import Alert from 'utils/Alert';

import {
  fbLoginProcessing,
  signInProcessing,
  firstUserDataUpdateProcessing,
  firstDataSyncProcessing,
  signInSuccess,
  signInFailure,
  userDataUpdated
} from './actions';

const signIn = (username, password) => {
  store.dispatch(signInProcessing());
  ExpentureAPI.signIn(username, password).then(() => {
    PushNotification.requestPermissionsIfNotRegistered();
    return uploadPushNotificationDeviceTokenToServer();
  }).then(() => {
    store.dispatch(firstUserDataUpdateProcessing());
    return updateUserData();
  }).then(() => {
    store.dispatch(firstDataSyncProcessing());
    AppRealm.reset({ force: true });
    return AppRealm.sync();
  }).then(() => {
    store.dispatch(signInSuccess());
  }).catch(e => {
    store.dispatch(signInFailure(e && e.toString && e.toString() || e));
    let failureMessage = '請檢查您的網路連線後，再試一次。';
    if (e === 'invalid_resource_owner') failureMessage = '您的帳號或密碼無效或已被鎖定，請再檢查一次。';
    if (e === 'invalid_client') failureMessage = 'App 錯誤。請重新安裝 app 後再嘗試登入。';
    Alert.alert('登入失敗', failureMessage);
  });
};

const fbSignIn = () => {
  store.dispatch(fbLoginProcessing());
  FBAPI.login().then((tokenObj) => {
    signIn('facebook:access_token', tokenObj.accessToken);
  }).catch(e => {
    store.dispatch(signInFailure(e && e.toString && e.toString() || e));
    let failureMessage = '請檢查您的網路連線後，再試一次。';
    if (e === 'cancelled') failureMessage = '您已取消登入，請再試一次。';
    Alert.alert('登入失敗', failureMessage);
  });
};

const signOut = ({ force = false } = {}) => {
  ExpentureAPI.signOut({ force }).then(() => {
    AppRealm.reset({ force });
    FBAPI.logout();
    // TODO: abandom PN
    // The BackendSession reducer will handle sign out actions fired from the
    // ExpentureAPI module, so no action is dispatched here.
  }).catch(() => {
    Alert.alert(
      '登出失敗',
      '請檢查您的網路連線後，再試一次。',
      [
        { text: '好', onPress: () => {} },
        { text: '強制登出', onPress: () => signOut({ force: true }), style: 'destructive' }
      ]
    );
  });
};

const updateUserData = (newData) => {
  return ExpentureAPI.fetch('/me', {
    method: newData ? 'PATCH' : 'GET',
    body: newData && JSON.stringify({
      user: newData
    })
  }).then(response => {
    if (response.status !== 200) {
      throw response.status;
    }

    return response.json();
  }).then(json => {
    if (!json.user) throw 'invalid user data: ' + JSON.stringify(json);
    store.dispatch(userDataUpdated(json.user));
  });
};

const apiFetch = (uri, options = {}) => {
  return ExpentureAPI.fetch(uri, options).then((response) => {
    if (response.status === 504) {
      Alert.alert('請求超時', '抱歉，我們的服務出了一點狀況，請稍候再試一次。');
      throw response.status;
    }
    if (response.status === 500) {
      Alert.alert('伺服器錯誤', '抱歉，我們的服務出了一點狀況，請稍候再試一次。');
      throw response.status;
    }
    if (response.status === 404) {
      Alert.alert('要求錯誤', '抱歉，您想查看的內容可能不存在或已被移除。');
      throw response.status;
    }
    if (response.status === 405) {
      Alert.alert('要求錯誤', '抱歉，您送出的要求可能有誤。');
      throw response.status;
    }
    if (response.status === 400) {
      Alert.alert('要求錯誤', '抱歉，您想查看的內容可能有誤。');
      throw response.status;
    }
    if (response.status === 403) {
      Alert.alert('權限不足', '抱歉，您的權限不足，無法執行此操作。');
      throw response.status;
    }
    return response;
  }).catch((e) => {
    if (typeof e !== 'number') Alert.alert('網路錯誤', '請檢查您的網路連線。');
    throw e;
  });
};

const getPushNotificationDeviceTokenFromState = (state) => {
  return state &&
         state.pushNotification &&
         state.pushNotification.deviceToken;
};

const uploadPushNotificationDeviceTokenToServer = () => {
  const deviceToken = getPushNotificationDeviceTokenFromState(store.getState());
  if (deviceToken) {
    return ExpentureAPI.fetch('/current_oauth_application', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oauth_application: {
          contact_code: deviceToken
        }
      })
    });
  } else {
    return Promise.resolve();
  }
};

const BackendSession = {
  signIn,
  fbSignIn,
  signOut,
  updateUserData,
  fetch: apiFetch,
  uploadPushNotificationDeviceTokenToServer
};

export default BackendSession;

let previousPushNotificationDeviceToken = getPushNotificationDeviceTokenFromState(store.getState());

store.subscribe(() => {
  let pushNotificationDeviceToken = getPushNotificationDeviceTokenFromState(store.getState());

  if (pushNotificationDeviceToken !== previousPushNotificationDeviceToken) {
    uploadPushNotificationDeviceTokenToServer();
  }

  previousPushNotificationDeviceToken = pushNotificationDeviceToken;
});
