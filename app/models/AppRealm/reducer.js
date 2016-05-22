/**
 * @providesModule AppRealm/reducer
 */

import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import parseError from 'utils/parseError';
import generateUUID from 'utils/generateUUID';

import { actionTypes } from './actions';
const {
  SYNC_PROCESSING,
  SYNC_SUCCESS,
  SYNC_FAILURE,
  RESET_SUCCESS
} = actionTypes;

export const getInitialState = () => {
  return {
    id: generateUUID(),
    syncedAt: {},
    syncStatus: {},
    syncError: {}
  };
};

export default handleActions({
  [REHYDRATE]: (state, action) => {
    const { realm: lastState } = action.payload;
    if (!lastState) return state;

    return {
      ...lastState,
      syncStatus: {},
      syncError: {}
    };
  },

  [SYNC_PROCESSING]: (state, action) => {
    const { syncStatus } = state;
    const { modelName, data } = action.payload;

    return {
      ...state,
      syncStatus: {
        ...syncStatus,
        [modelName]: data
      }
    };
  },

  [SYNC_SUCCESS]: (state, action) => {
    const { syncedAt, syncStatus, syncError } = state;
    const { modelName, syncedAt: modelSyncedAt } = action.payload;

    return {
      ...state,
      syncedAt: {
        ...syncedAt,
        [modelName]: modelSyncedAt
      },
      syncStatus: {
        ...syncStatus,
        [modelName]: undefined
      },
      syncError: {
        ...syncError,
        [modelName]: undefined
      }
    };
  },

  [SYNC_FAILURE]: (state, action) => {
    const { syncStatus, syncError } = state;
    const { modelName, error } = action.payload;

    return {
      ...state,
      syncStatus: {
        ...syncStatus,
        [modelName]: undefined
      },
      syncError: {
        ...syncError,
        [modelName]: parseError(error)
      }
    };
  },

  [RESET_SUCCESS]: () => {
    return getInitialState();
  }
}, getInitialState());
