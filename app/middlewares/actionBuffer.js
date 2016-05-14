/**
 * @providesModule middlewares/actionBuffer
 */

import createActionBuffer from 'redux-action-buffer';
import { REHYDRATE } from 'redux-persist/constants';

const actionBuffer = createActionBuffer(REHYDRATE);

export default actionBuffer;
