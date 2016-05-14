/**
 * @providesModule FBAPI/reducer
 */

import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

export const initialState = {
  status: 'not-connected'
};

export default handleActions({
  [REHYDRATE]: (state, action) => {
    const { fbAPI: lastState } = action.payload;

    return lastState;
  },

  FB_LOGIN_SUCCESS: (state, action) => {
    const {
      accessToken,
      applicationID,
      permissions,
      userID,
      accessTokenExpirationTime
    } = action;

    return {
      accessToken,
      applicationID,
      permissions,
      userID,
      accessTokenExpirationTime,
      status: 'connected'
    };
  },

  FB_LOGOUT_SUCCESS: () => {
    return {
      status: 'not-connected'
    };
  }
}, initialState);
