/**
 * @providesModule getRealmFromID
 */

import Realm from 'realm';

import schemas from '../schemas';

const realms = {};

export default function getRealmFromID(id, { loadSchema = true, withCache = true } = {}) {
  if (withCache && realms[id]) return realms[id];

  const path = `${id}.realm`;

  if (!loadSchema) {
    return new Realm({ path });
  }

  // run migrations if needed
  let nextSchemaIndex = Realm.schemaVersion(path);
  while (nextSchemaIndex < schemas.length) {
    let schema = schemas[nextSchemaIndex++];
    let migratedRealm = new Realm({
      path,
      schema
    });
    migratedRealm.close();
  }

  // open the Realm with the latest schema
  let schema = schemas[schemas.length-1];
  let realm = new Realm({
    path,
    schema
  });

  realms[id] = realm;

  return realms[id];
}
