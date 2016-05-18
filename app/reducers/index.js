/**
 * @providesModule reducers
 */

import { combineReducers } from 'redux';

import backendSession from 'BackendSession/reducer';
import expentureAPI from 'ExpentureAPI/reducer';
import pushNotification from 'PushNotification/reducer';
import fbAPI from 'FBAPI/reducer';

export default combineReducers({
  backendSession,
  expentureAPI,
  pushNotification,
  fbAPI
});
