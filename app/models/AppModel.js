/**
 * This is the base model for all models to inherit
 */

import generateUUID from 'utils/generateUUID';

export default class AppModel {
  constructor(props = {}) {
    this.update(props);

    // Set Common Defaults
    if (this.hasProperty('uid') && !this.uid) this.uid = `${generateUUID()}-${generateUUID()}`;
    if (this.hasProperty('updatedAt') && !this.updatedAt) this.updatedAt = new Date();
  }

  update = (props = {}) => {
    for (let k in props) {
      if (!this.hasProperty(k)) continue;

      switch (k) {
      case 'createdAt':
      case 'updatedAt':
      case 'deletedAt':
      case 'datetime':
        this[k] = new Date(props[k]);
        break;

      default:
        this[k] = props[k];
        break;
      }
    }
  }

  clone = () => {
    let clonedObj = new this.constructor(this);
    for (let k in this) clonedObj[k] = this[k];
    return clonedObj;
  }

  getSchema = () => {
    if (this._schema) return this._schema;
    this._schema = this.constructor.schema;
    return this._schema;
  }

  getProperties = () => {
    if (this._properties) return this._properties;
    const schema = this.getSchema();
    this._properties = schema.properties;
    return this._properties;
  }

  getPropertyKeys = () => {
    if (this._propertyKeys) return this._propertyKeys;
    this._propertyKeys = Object.keys(this.getProperties());
    return this._propertyKeys;
  }

  hasProperty = (propName) => {
    return this.getPropertyKeys().indexOf(propName) >= 0;
  }
}
