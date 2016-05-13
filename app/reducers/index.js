/**
 * @providesModule reducers
 */

import { combineReducers } from 'redux';

import expentureAPI from 'expentureAPI/reducer';
import pushNotification from 'PushNotification/reducer';
import fbAPI from 'fbAPI/reducer';

export default combineReducers({
  expentureAPI,
  pushNotification,
  fbAPI
});
