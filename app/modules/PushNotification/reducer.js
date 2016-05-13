/**
 * @providesModule PushNotification/reducer
 */

import { handleActions } from 'redux-actions';

import Platform from 'utils/Platform';
import generateUUID from 'utils/generateUUID';

export const getInitialState = () => {
  return {
    status: 'not-registered',
    deviceType: Platform.OS,
    deviceID: generateUUID()
  };
};

export default handleActions({

  PUSH_NOTIFICATION_REGISTERED: (state, action) => {
    const { deviceToken } = action;

    return {
      status: 'registered',
      deviceToken
    };
  },

  PUSH_NOTIFICATION_RECEIVED: (state, action) => {
    const { payload } = action;

    return {
      ...state,
      receivedNotificationPayload: payload
    };
  }
}, getInitialState());
