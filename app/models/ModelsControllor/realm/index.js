/**
 * Realm adapter for data models
 *
 * Note: We will not return Realm objects directly, so you can set attributes
 * on the returned object without affecting the Realm DB. Use update() and pass
 * in the new object if you really want to update it in DB.
 */

import AppRealm from 'AppRealm';
import getModelClass from '../getModelClass';

const realmBackend = {
  query: async (modelName, { filter = {}, sort = '-updatedAt', limit = 100 } = {}) => {
    const ModelClass = getModelClass(modelName);
    const { realm } = AppRealm;

    let filterIndex = 0;
    let filterArgs = [];
    const filterString =
      filter && Object.keys(filter).length > 0 &&
      Object.keys(filter).map(k => {
        let prop = k;
        let operator = filter[k][0];
        let arg = filter[k][1];
        let arg2 = filter[k][2];

        if (ModelClass.getPropertyType(prop) === 'date') {
          arg = new Date(arg);
          arg2 = new Date(arg2);
        }

        switch (operator) {
        case '><':
          filterArgs.push(arg);
          filterArgs.push(arg2);
          return `${prop} >= $${filterIndex++} && ${prop} <= $${filterIndex++}`;
        case '~=':
          filterArgs.push(arg);
          return `${prop} CONTAINS $${filterIndex++}`;
        default:
          filterArgs.push(arg);
          return `${prop} ${operator} $${filterIndex++}`;
        }
      }).join(' && ');

    let sortString = sort;
    let sortReverse = false;
    if (sort && sort.match(/^-/)) {
      sortString = sort.replace(/^-/, '');
      sortReverse = true;
    }

    let realmObjectCollection = realm.objects(modelName);

    if (filterString) {
      realmObjectCollection = realmObjectCollection.filtered(filterString, ...filterArgs);
    }

    realmObjectCollection = realmObjectCollection.sorted(sortString, sortReverse);

    return realmObjectCollection.slice(0, limit).map(realmObj => new ModelClass(realmObj));
  },

  find: async (modelName, uid) => {
    const ModelClass = getModelClass(modelName);
    const { realm } = AppRealm;

    const realmObject = realm.objects(modelName).filtered('uid == $0', uid)[0];
    return realmObject && new ModelClass(realmObject);
  },

  create: async () => {
    throw new Error('realmBackend: Not yet implemented');
  },

  update: async () => {
    throw new Error('realmBackend: Not yet implemented');
  },

  delete: async () => {
    throw new Error('realmBackend: Not yet implemented');
  }
};

function transformFilterQuery(prop, condition) {
  if (typeof condition === 'object') {
    return condition.map(c => {
      return `${prop} ${transformFilterCondition(c)}`;
    }).join(' && ');
  } else {
    return `${prop} ${transformFilterCondition(condition)}`;
  }
}

function transformFilterCondition(condition) {
  if (!condition.match(/^[=<>(!=)(<=)(>=)(~=)]/)) {
    condition = `= ${condition}`;
  }
  condition = condition.replace(/^~=/, 'CONTAINS');
  condition = condition.replace(/'/mg, '"');
  return condition;
}

export default realmBackend;
