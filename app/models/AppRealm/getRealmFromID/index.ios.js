/**
 * @providesModule getRealmFromID
 */
import Realm from 'realm';

import schema, { schemaVersion } from '../schema';

const realms = {};

export default function getRealmFromID(id, { loadSchema = true } = {}) {
  if (realms[id]) return realms[id];

  if (!loadSchema) {
    return new Realm({ path: `${id}.realm` });
  }

  realms[id] = new Realm({
    path: `${id}.realm`,
    schema,
    schemaVersion
  });

  return realms[id];
}
