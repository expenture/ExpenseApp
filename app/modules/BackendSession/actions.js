import { createAction } from 'redux-actions';

export const actionTypes = {
  FB_LOGIN_PROCESSING: 'backendSession/FB_LOGIN',
  SIGN_IN_PROCESSING: 'backendSession/SIGN_IN',
  FIRST_USER_DATA_UPDATE_PROCESSING: 'backendSession/FIRST_USER_DATA_UPDATE_PROCESSING',
  FIRST_DATA_SYNC_PROCESSING: 'backendSession/FIRST_DATA_SYNC',
  SIGN_IN_SUCCESS: 'backendSession/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'backendSession/SIGN_IN_FAILURE',
  USER_DATA_UPDATED: 'backendSession/USER_DATA_UPDATED'
};

export const fbLoginProcessing = createAction(actionTypes.FB_LOGIN_PROCESSING);
export const signInProcessing = createAction(actionTypes.SIGN_IN_PROCESSING);
export const firstUserDataUpdateProcessing = createAction(actionTypes.FIRST_USER_DATA_UPDATE_PROCESSING);
export const firstDataSyncProcessing = createAction(actionTypes.FIRST_DATA_SYNC_PROCESSING);
export const signInSuccess = createAction(actionTypes.SIGN_IN_SUCCESS);
export const signInFailure = createAction(actionTypes.SIGN_IN_FAILURE, (error) => {
  return { error };
});
export const userDataUpdated = createAction(actionTypes.USER_DATA_UPDATED, (data) => {
  return { data };
});
