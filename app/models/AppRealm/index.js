/**
 * @providesModule AppRealm
 */

import getRealm from './getRealm';
import getRealmFromID from './getRealmFromID';

import resetRealm from './resetRealm';

import syncAccounts from './sync/syncAccounts';
import syncTransactions from './sync/syncTransactions';

class AppRealmClass {
  get realm() {
    return getRealm();
  }

  getRealmFromID(id) {
    return getRealmFromID(id);
  }

  reset(args) {
    return resetRealm(args);
  }

  syncAccounts(args) {
    return syncAccounts(args);
  }

  syncTransactions(args) {
    return syncTransactions(args);
  }
}

const AppRealm = new AppRealmClass();

export default AppRealm;
