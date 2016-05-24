import validate from 'validate.js';
import ModelsController from '../ModelsController';

/* eslint valid-jsdoc: "off" */

/**
 * Immutable: Can't be changed once created
 */
validate.validators.immutable = async (value, options, key, attributes, globalOptions) => {
  const className = options.className || options.modelName || options.type || options.objectType ||
                    globalOptions.className || globalOptions.modelName || globalOptions.type || globalOptions.objectType;

  if (!className) throw new Error('You should specify the option "type" or "className" for the immutable validator');

  if (typeof options.if === 'function') {
    if (!options.if(attributes)) return null;
  }

  const prevRecord = await ModelsController.find(className, attributes.uid);

  if (prevRecord && prevRecord[key] !== value) {
    return 'should be immutable';
  } else {
    return null;
  }
};

/**
 * Uneditable: Can't be edited (should be blank in new record, and be
 *             immutable if created)
 */
validate.validators.uneditable = async (value, options, key, attributes, globalOptions) => {
  const className = options.className || options.modelName || options.type || options.objectType ||
                    globalOptions.className || globalOptions.modelName || globalOptions.type || globalOptions.objectType;

  if (!className) throw new Error('You should specify the option "type" or "className" for the immutable validator');

  if (typeof options.if === 'function') {
    if (!options.if(attributes)) return null;
  }

  const prevRecord = await ModelsController.find(className, attributes.uid);

  if (prevRecord && prevRecord[key] !== value) {
    return 'should not be changed';
  } else if (!prevRecord && prevRecord[key]) {
    return 'should not be changed';
  } else {
    return null;
  }
};

/**
 * Foreign Key: The related object exists
 */
validate.validators.foreignKey = async (value, options, key, attributes) => {
  const foreignClassName = options.className || options.modelName ||
                           options.type || options.objectType ||
                           capitalize(key.replace(/U?[iI][dD]$/, ''));
  const foreignObjIdentifier = value;

  if (options.optional) {
    if (!foreignObjIdentifier) return null;
  }

  if (typeof options.if === 'function') {
    if (!options.if(attributes)) return null;
  }

  const foreignObj = await ModelsController.find(foreignClassName, foreignObjIdentifier);

  if (!foreignObj) {
    return `is not a valid ${foreignClassName} identifier`;
  } else {
    return null;
  }
};

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
