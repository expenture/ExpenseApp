/**
 * @providesModule store
 */

import { createStore, applyMiddleware } from 'redux';
import persistStore from 'utils/persistStore';

import Storage from 'Storage';

import middlewares from 'middlewares';
import reducers from 'reducers';

export const store = createStore(reducers, {}, applyMiddleware(...middlewares));
persistStore(store, { storage: Storage });

export default store;


/**
 * The following code is for providing convenience in integration testing.
 *
 * An additional `enableTesting` function is added to the store which will
 * enable some testing functionality after called.
 *
 * It enables you to:
 *
 * 1. Directly set the state in the store using `store.setStateForTesting()`.
 * 2. Reset store to the initial state using `store.resetStateForTesting()`.
 */

store.enableTesting = () => {
  // A new reducer for the store, that combines the existing reducers and a
  // reducer that set and resets the whole state
  const reducerWithTestingEnabled = (state, action) => {
    if (action.type === 'SET_STATE') {
      return action.newState || {};
    } else if (action.type === 'RESET_STATE') {
      return reducers(undefined, {});
    } else {
      return reducers(state, action);
    }
  };

  store.replaceReducer(reducerWithTestingEnabled);

  store.setStateForTesting = (newState) => {
    store.dispatch({ type: 'SET_STATE', newState });
  };

  store.resetStateForTesting = () => {
    store.dispatch({ type: 'RESET_STATE' });
  };
};
