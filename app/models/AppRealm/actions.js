import { createAction } from 'redux-actions';

export const actionTypes = {
  SYNC_PROCESSING: 'realm/SYNC_PROCESSING',
  SYNC_SUCCESS: 'realm/SYNC_SUCCESS',
  SYNC_FAILURE: 'realm/SYNC_FAILURE',
  RESET_SUCCESS: 'realm/RESET_SUCCESS'
};

export const syncProcessing = createAction(actionTypes.SYNC_PROCESSING, (modelName, progress, phase) => {
  return {
    modelName,
    data: {
      progress,
      phase
    }
  };
});

export const syncSuccess = createAction(actionTypes.SYNC_SUCCESS, (modelName, syncedAt) => {
  return {
    modelName,
    syncedAt
  };
});

export const syncFailure = createAction(actionTypes.SYNC_FAILURE, (modelName, error) => {
  return {
    modelName,
    error
  };
});

export const resetRealmSuccess = createAction(actionTypes.RESET_SUCCESS);
