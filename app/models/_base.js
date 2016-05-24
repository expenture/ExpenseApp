/**
 * This is the base model for all models to inherit
 */

import autobind from 'autobind-decorator';
import generateUUID from 'utils/generateUUID';

export default class Model {
  static getSchema() {
    return this.schema;
  }

  static getProperties() {
    return this.getSchema().properties;
  }

  static getPropertyKeys() {
    if (this._propertyKeys) return this._propertyKeys;
    this._propertyKeys = Object.keys(this.getProperties());
    return this._propertyKeys;
  }

  static hasProperty(propName) {
    this.getPropertyKeys().indexOf(propName) >= 0;
    if (this._propertyKeys) return this._propertyKeys;
    this._propertyKeys = Object.keys(this.getProperties());
    return this._propertyKeys;
  }

  static getPropertyType(propName) {
    const property = this.getProperties()[propName];
    let propertyType = (typeof property === 'object') ?
                       property.type :
                       property;
    switch (propertyType) {
    case 'bool':
      return 'boolean';
    case 'int':
    case 'float':
    case 'double':
      return 'number';
    default:
      return propertyType;
    }
  }

  constructor(props = {}) {
    this.update(props);

    // Set Common Defaults
    if (this.hasProperty('uid') && !this.uid) this.uid = `${generateUUID()}-${generateUUID()}`;
    if (this.hasProperty('updatedAt') && !this.updatedAt) this.updatedAt = new Date();
  }

  @autobind
  update(props = {}) {
    for (let k in props) {
      if (!this.hasProperty(k)) continue;
      if (!props[k]) continue;

      switch (this.getPropertyType(k)) {
      case 'boolean':
        this[k] = !!props[k];
        break;

      case 'number':
        this[k] = parseFloat(props[k]);
        break;

      case 'date':
        this[k] = new Date(props[k]);
        break;

      default:
        this[k] = props[k];
        break;
      }
    }
  }

  @autobind
  clone() {
    let clonedObj = new this.constructor(this);
    for (let k in this) clonedObj[k] = this[k];
    return clonedObj;
  }

  @autobind
  getSchema() {
    return this.constructor.getSchema();
  }

  @autobind
  getProperties() {
    return this.constructor.getProperties();
  }

  @autobind
  getPropertyKeys() {
    return this.constructor.getPropertyKeys();
  }

  @autobind
  hasProperty(propName) {
    return this.constructor.hasProperty(propName);
  }

  @autobind
  getPropertyType(propName) {
    return this.constructor.getPropertyType(propName);
  }
}
