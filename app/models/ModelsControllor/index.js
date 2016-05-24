/**
 * @providesModule ModelsControllor
 */

import getDefaultBackendName from './getDefaultBackendName';
import validate from './validate';

class ModelsControllorClass {
  constructor({ backendName = getDefaultBackendName() } = {}) {
    this.setBackend(backendName);
  }

  get query() {
    return this.getBackendModule().query;
  }

  get find() {
    return this.getBackendModule().find;
  }

  get create() {
    return this.getBackendModule().create;
  }

  get update() {
    return this.getBackendModule().update;
  }

  get destroy() {
    return this.getBackendModule().destroy;
  }

  validate(...args) {
    return validate(...args);
  }

  setBackend = (backendName) => {
    this.backendName = backendName;
  }

  getBackendModule = () => {
    const { backendName } = this;
    if (this[backendName]) return this[backendName];

    switch (backendName) {
    case 'realm':
      this[backendName] = require('./realm').default;
      break;
    case 'api':
    default:
      this[backendName] = require('./api').default;
      break;
    }

    return this[backendName];
  }
}

const ModelsControllor = new ModelsControllorClass();

export default ModelsControllor;
