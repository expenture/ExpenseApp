import fetch from 'utils/fetch';
import { createAction } from 'redux-actions';

import getBackendURL from './utils/getBackendURL';
import ExpentureAPIException from './ExpentureAPIException';

export const changeBackendURL = (backendURL) => {
  return {
    type: 'CHANGE_BACKEND_URL',
    backendURL
  };
};

const signInRequest = createAction('SIGN_IN_REQUEST');

const signInSuccess = (accessTokenObj) => {
  const accessToken = accessTokenObj.accessToken || accessTokenObj.access_token;
  const accessTokenCreatedAt = accessTokenObj.createdAt || accessTokenObj.created_at ||
                               parseInt((new Date()).getTime()/1000, 10);
  const accessTokenExpiresIn = accessTokenObj.expiresIn || accessTokenObj.expires_in;
  const refreshToken = accessTokenObj.refreshToken || accessTokenObj.refresh_token;

  if (!accessToken) throw ExpentureAPIException(
    'actions/signInSuccess',
    'accessToken is missing in the accessTokenObj'
  );
  if (!accessTokenExpiresIn) throw ExpentureAPIException(
    'actions/signInSuccess',
    'expiresIn is missing in the accessTokenObj'
  );
  if (!refreshToken) throw ExpentureAPIException(
    'actions/signInSuccess',
    'refreshToken is missing in the accessTokenObj'
  );

  return {
    type: 'SIGN_IN_SUCCESS',
    accessToken,
    accessTokenCreatedAt,
    accessTokenExpiresIn,
    refreshToken
  };
};

const signInFailure = (error) => {
  return {
    type: 'SIGN_IN_FAILURE',
    error
  };
};

export const signIn = (username, password) => {
  const requestAccessTokenURL = `${getBackendURL()}/oauth/token?grant_type=password`;
  return dispatch => {
    dispatch(signInRequest());
    return fetch(requestAccessTokenURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: username,
        password: password
      })
    }).then(res => res.json())
      .then(json => {
        if (json.error) {
          dispatch(signInFailure(json.error));
        } else {
          dispatch(signInSuccess(json));
        }
      })
      .catch(e => dispatch(signInFailure(e)));
  };
};

const refreshAccessTokenRequest = createAction('REFRESH_ACCESS_TOKEN_REQUEST');

const refreshAccessTokenSuccess = (accessTokenObj) => {
  const accessToken = accessTokenObj.accessToken || accessTokenObj.access_token;
  const accessTokenCreatedAt = accessTokenObj.createdAt || accessTokenObj.created_at ||
                               parseInt((new Date()).getTime()/1000, 10);
  const accessTokenExpiresIn = accessTokenObj.expiresIn || accessTokenObj.expires_in;
  const refreshToken = accessTokenObj.refreshToken || accessTokenObj.refresh_token;

  if (!accessToken) throw ExpentureAPIException(
    'actions/signInSuccess',
    'accessToken is missing in the accessTokenObj'
  );
  if (!accessTokenExpiresIn) throw ExpentureAPIException(
    'actions/signInSuccess',
    'expiresIn is missing in the accessTokenObj'
  );
  if (!refreshToken) throw ExpentureAPIException(
    'actions/signInSuccess',
    'refreshToken is missing in the accessTokenObj'
  );

  return {
    type: 'REFRESH_ACCESS_TOKEN_SUCCESS',
    accessToken,
    accessTokenCreatedAt,
    accessTokenExpiresIn,
    refreshToken
  };
};

const refreshAccessTokenInvalidGrant = createAction('REFRESH_ACCESS_TOKEN_INVALID_GRANT');

const refreshAccessTokenFailure = (error) => {
  return {
    type: 'REFRESH_ACCESS_TOKEN_FAILURE',
    error
  };
};

export const refreshAccessToken = () => {
  const requestAccessTokenURL = `${getBackendURL()}/oauth/token?grant_type=refresh_token`;
  return (dispatch, getState) => {
    const { refreshToken } = getState().expentureAPI || {};

    dispatch(refreshAccessTokenRequest());
    return fetch(requestAccessTokenURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    }).then(res => res.json())
      .then(json => {
        if (json.error) {
          if (json.error === 'invalid_grant') {
            dispatch(refreshAccessTokenInvalidGrant());
          } else {
            dispatch(refreshAccessTokenFailure(json.error));
          }
        } else {
          dispatch(refreshAccessTokenSuccess(json));
        }
      })
      .catch(e => dispatch(refreshAccessTokenFailure(e)));
  };
};

const signOutRequest = createAction('SIGN_OUT_REQUEST');
const signOutSuccess = createAction('SIGN_OUT_SUCCESS');

export const signOut = () => {
  return (dispatch) => {
    dispatch(signOutRequest());
    // TODO: Send request to the server to revoke the access token
    dispatch(signOutSuccess());
  };
};

export const received401 = createAction('RECEIVED_401');
