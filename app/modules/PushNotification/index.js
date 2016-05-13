 /**
 * @providesModule PushNotification
 */

import RNPushNotification from 'react-native-push-notification';

import config from 'config';
import store from 'store';

import {
  pushNotificationRegistered,
  pushNotificationRecieved,
  pushNotificationErrored
} from './actions';

import requestPermissions from './requestPermissions';

RNPushNotification.configure({
  onRegister: (tokenObj) => {
    store.dispatch(pushNotificationRegistered(tokenObj.token));
  },

  onNotification: (notification) => {
    store.dispatch(pushNotificationRecieved(notification));
  },

  onError: (e) => {
    store.dispatch(pushNotificationErrored(e));
  },

  senderID: config.gcmSenderID,
  requestPermissions: false
});

const PushNotification = {
  requestPermissions
};

export default PushNotification;
