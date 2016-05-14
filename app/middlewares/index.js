/**
 * @providesModule middlewares
 */

import thunk from 'redux-thunk';

import actionBuffer from 'middlewares/actionBuffer';

const middlewares = [
  thunk,
  actionBuffer
];

export default middlewares;
