/**
 * @providesModule BackendSession/reducer
 */

import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import DeviceInfo from 'utils/DeviceInfo';

import { actionTypes } from './actions';
const {
  FB_LOGIN_PROCESSING,
  SIGN_IN_PROCESSING,
  FIRST_USER_DATA_UPDATE_PROCESSING,
  FIRST_DATA_SYNC_PROCESSING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_DATA_UPDATED
} = actionTypes;

export const getInitialState = () => {
  return {
    status: 'inactivated',
    activity: null,
    locale: DeviceInfo.getDeviceLocale()
  };
};

export default handleActions({
  [REHYDRATE]: (state, action) => {
    const { backendSession: lastState } = action.payload;
    if (!lastState) return state;

    return {
      ...lastState,
      activity: null,
      error: undefined
    };
  },

  [FB_LOGIN_PROCESSING]: (state) => {
    return {
      ...state,
      activity: 'fb-login-processing'
    };
  },

  [SIGN_IN_PROCESSING]: (state) => {
    return {
      ...state,
      activity: 'sign-in-processing'
    };
  },

  [FIRST_USER_DATA_UPDATE_PROCESSING]: (state) => {
    return {
      ...state,
      activity: 'first-user-data-update-processing'
    };
  },

  [FIRST_DATA_SYNC_PROCESSING]: (state) => {
    return {
      ...state,
      activity: 'first-data-sync-processing'
    };
  },

  [SIGN_IN_SUCCESS]: (state) => {
    return {
      ...state,
      status: 'activated',
      activity: null,
      error: undefined
    };
  },

  [SIGN_IN_FAILURE]: (state, action) => {
    const { error } = action.payload || {};
    return {
      ...state,
      activity: null,
      error: error
    };
  },

  [USER_DATA_UPDATED]: (state, action) => {
    const { data: user } = action.payload || {};
    return {
      ...state,
      user
    };
  },

  // Action from ExpentureAPI

  SIGN_OUT_SUCCESS: (state) => {
    return {
      ...state,
      status: 'inactivated',
      activity: null,
      user: undefined
    };
  },

  RECEIVED_401: (state) => {
    return {
      ...state,
      status: 'inactivated',
      activity: null,
      user: undefined
    };
  }
}, getInitialState());
