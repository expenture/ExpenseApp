jest.unmock('middlewares');

import configureStore from 'redux-mock-store';
import middlewares from 'middlewares';

export default configureStore(middlewares);
