/**
 * @providesModule ExpentureAPI/reducer
 */

import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import config from 'config';

export const initialState = {
  backendURL: config.backendURL,
  status: 'not-authorized'
};

export default handleActions({
  [REHYDRATE]: (state, action) => {
    const { expentureAPI: lastState } = action.payload;
    if (!lastState) return state;

    switch (lastState.status) {
    case 'signing-in':
      return {
        ...lastState,
        status: 'not-authorized'
      };

    case 'token-refreshing':
      return {
        ...lastState,
        status: 'ready'
      };

    default:
      return lastState;
    }
  },

  CHANGE_BACKEND_URL: (state, action) => {
    const { backendURL } = action;

    return {
      ...state,
      backendURL
    };
  },

  SIGN_IN_REQUEST: (state) => {
    return {
      ...state,
      status: 'signing-in'
    };
  },

  SIGN_IN_SUCCESS: (state, action) => {
    const {
      accessToken,
      accessTokenCreatedAt,
      accessTokenExpiresIn,
      refreshToken
    } = action;

    return {
      ...state,
      accessToken,
      accessTokenCreatedAt,
      accessTokenExpiresIn,
      refreshToken,
      status: 'ready'
    };
  },

  SIGN_IN_FAILURE: (state, action) => {
    const { error } = action;

    return {
      ...state,
      status: 'not-authorized',
      error
    };
  },

  REFRESH_ACCESS_TOKEN_REQUEST: (state) => {
    if (state.status === 'ready') {
      return {
        ...state,
        status: 'token-refreshing'
      };
    } else {
      return state;
    }
  },

  REFRESH_ACCESS_TOKEN_SUCCESS: (state, action) => {
    const {
      accessToken,
      accessTokenCreatedAt,
      accessTokenExpiresIn,
      refreshToken
    } = action;

    return {
      ...state,
      accessToken,
      accessTokenCreatedAt,
      accessTokenExpiresIn,
      refreshToken,
      status: 'ready'
    };
  },

  REFRESH_ACCESS_TOKEN_INVALID_GRANT: (state) => {
    return {
      ...state,
      accessToken: undefined,
      accessTokenCreatedAt: undefined,
      accessTokenExpiresIn: undefined,
      refreshToken: undefined,
      status: 'not-authorized'
    };
  },

  REFRESH_ACCESS_TOKEN_FAILURE: (state, action) => {
    const { error } = action;

    return {
      ...state,
      status: 'ready',
      error
    };
  },

  SIGN_OUT_SUCCESS: (state) => {
    return {
      ...state,
      accessToken: undefined,
      accessTokenCreatedAt: undefined,
      accessTokenExpiresIn: undefined,
      refreshToken: undefined,
      status: 'not-authorized'
    };
  },

  RECEIVED_401: (state) => {
    return {
      ...state,
      accessToken: undefined,
      accessTokenCreatedAt: undefined,
      accessTokenExpiresIn: undefined,
      refreshToken: undefined,
      status: 'not-authorized'
    };
  }
}, initialState);
