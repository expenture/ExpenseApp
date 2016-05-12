import { createAction } from 'redux-actions';

export const fbLoginSuccess = (accessTokenObj) => {
  const {
    accessToken,
    applicationID,
    permissions,
    userID
  } = accessTokenObj;
  const accessTokenExpirationTime = parseInt(accessTokenObj.expirationTime / 1000, 10);

  if (!accessToken) throw 'accessToken is missing';

  return {
    type: 'FB_LOGIN_SUCCESS',
    accessToken,
    applicationID,
    permissions,
    userID,
    accessTokenExpirationTime
  };
};

export const fbLogoutSuccess = createAction('FB_LOGOUT_SUCCESS');
