import store from 'store';

export default function getSyncedAt(modelName) {
  let ds = store.getState() &&
           store.getState().realm &&
           store.getState().realm.syncedAt &&
           store.getState().realm.syncedAt[modelName];
  if (ds) return new Date(ds);
}
