import store from 'store';
import { resetRealmSuccess } from './actions';
import getRealm from './getRealm';

export default function resetRealm({ force = false } = {}) {
  const realm = getRealm({ loadSchema: false });
  try {
    realm.write(() => {
      realm.deleteAll();
    });
  } catch (e) {
    if (!force) throw e;
  }

  store.dispatch(resetRealmSuccess());
}
