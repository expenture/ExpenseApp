import validate from 'validate.js';
import '../validators';
import getModelClass from './getModelClass';

class ValidationError extends Error {
  constructor(object) {
    const { _errors: errors } = object;
    const message = `${object.constructor.name} has the following errors:\n` +
      Object.keys(errors)
      .map(k => errors[k])
      .reduce((arr, flatArr) => flatArr.concat(arr), [])
      .map(s => ` - ${s}`)
      .join('\n');

    super(message, object);

    this.object = object;
    this.errors = errors;
  }
}

export default function validateModel(modelName, object, options = {}) {
  const ModelClass = getModelClass(modelName);

  if (typeof object.beforeValidate === 'function') {
    object.beforeValidate();
  }

  options = {
    ...options,
    modelName
  };

  return validate.async(object, ModelClass.constraints, options)
    .then(() => {
      return true;
    })
    .catch((errors) => {
      object._errors = errors;

      if (options.throwError) {
        throw new ValidationError(object);
      }

      return false;
    });
}
