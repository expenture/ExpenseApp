/**
 * Realm adapter for data models
 *
 * Note: We will not return Realm objects directly, so you can set attributes
 * on the returned object without affecting the Realm DB. Use update() and pass
 * in the new object if you really want to update it in DB.
 */

import AppRealm from 'AppRealm';
import getModelClass from '../getModelClass';
import validate from '../validate';

const query = async (modelName, {
  filter = {},
  sort = '-updatedAt',
  limit = 100,
  deleted = false
} = {}) => {
  const ModelClass = getModelClass(modelName);
  const { realm } = AppRealm;

  let filterIndex = 0;
  let filterArgs = [];
  let filterString =
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

  let deletedFilter = deleted ?
                      'deletedAt != NULL' :
                      'deletedAt == NULL';
  filterString = [filterString, deletedFilter].filter(s => s).join(' && ');

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
};

const find = async (modelName, uid, { deleted = false } = {}) => {
  const ModelClass = getModelClass(modelName);
  const { realm } = AppRealm;

  const filterString = deleted ?
                       'uid == $0 && deletedAt != NULL' :
                       'uid == $0 && deletedAt == NULL';

  const realmObject = realm.objects(modelName).filtered(filterString, uid)[0];
  return realmObject && new ModelClass(realmObject);
};

const create = async (modelName, object) => {
  const ModelClass = getModelClass(modelName);
  const { realm } = AppRealm;

  const updatedAt = new Date();
  let newObject = new ModelClass({ ...object, updatedAt });

  await validate(modelName, newObject, { throwError: true });

  if (typeof newObject.beforeRealmSave === 'function') {
    newObject.beforeRealmSave('create');
  }

  realm.write(() => {
    realm.create(modelName, newObject);

    if (typeof newObject.afterRealmSave === 'function') {
      newObject.afterRealmSave('create');
    }
  });

  return newObject;
};

const update = async (modelName, uid, newAttrsOrObj) => {
  const ModelClass = getModelClass(modelName);
  const { realm } = AppRealm;

  let realmObject = realm.objects(modelName).filtered('uid == $0', uid)[0];
  if (!realmObject) throw new Error(`${modelName} with uid ${uid} does not exists`);
  const updatedAt = new Date();
  let updateObject = new ModelClass(realmObject);
  updateObject.update({ ...newAttrsOrObj, updatedAt });

  await validate(modelName, updateObject, { throwError: true });

  if (typeof updateObject.beforeRealmSave === 'function') {
    updateObject.beforeRealmSave('update');
  }

  if (realmObject.uid !== updateObject.uid) throw new Error(`${modelName} UID changed on update (${realmObject.uid} -> ${updateObject.uid})`);

  realm.write(() => {
    realmObject.update(updateObject);

    if (typeof updateObject.afterRealmSave === 'function') {
      updateObject.afterRealmSave('update');
    }
  });

  return updateObject;
};

const destroy = async (modelName, uidOrObject) => {
  const ModelClass = getModelClass(modelName);
  const { realm } = AppRealm;
  let uid = (typeof uidOrObject === 'object') ? uidOrObject.uid : uidOrObject;

  let realmObject = realm.objects(modelName).filtered('uid == $0', uid)[0];

  if (realmObject) {
    if (typeof realmObject.beforeRealmDestroy === 'function') {
      realmObject.beforeRealmDestroy();
    }

    realm.write(() => {
      realmObject.deletedAt = new Date();

      if (typeof realmObject.afterRealmDestroy === 'function') {
        realmObject.afterRealmDestroy();
      }
    });
  }

  return realmObject && new ModelClass(realmObject);
};

const realmBackend = {
  query,
  find,
  create,
  update,
  destroy
};

export default realmBackend;
