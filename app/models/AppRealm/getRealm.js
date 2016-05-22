/**
 * @providesModule getRealm
 */

import store from 'store';
import getRealmFromID from './getRealmFromID';

export default function getRealm(args) {
  let realmID = store.getState() &&
                store.getState().realm &&
                store.getState().realm.id;

  if (!realmID) throw 'getRealm called before the Redux store is ready.';

  return getRealmFromID(realmID, args);
}
