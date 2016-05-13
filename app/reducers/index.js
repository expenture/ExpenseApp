/**
 * @providesModule reducers
 */

import { combineReducers } from 'redux';

import expentureAPI from 'ExpentureAPI/reducer';
import pushNotification from 'PushNotification/reducer';
import fbAPI from 'FBAPI/reducer';

export default combineReducers({
  expentureAPI,
  pushNotification,
  fbAPI
});
