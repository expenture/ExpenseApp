import models from '../index';

export default function getModelClass(modelName) {
  const ModelClass = models[modelName];
  if (!ModelClass) throw new UnknownModelError('Unknown model: ' + modelName + '. Available models: ' + Object.keys(models).join(', ') + '.');
  return ModelClass;
}

class UnknownModelError extends Error {}
