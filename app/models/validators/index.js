import validate from 'validate.js';
import ModelsControllor from '../ModelsControllor';

validate.validators.immutable = async (value, options, key, attributes, globalOptions) => {
  const className = options.className || options.type || options.objectType ||
                    globalOptions.className || globalOptions.type || globalOptions.objectType;

  if (!className) throw new Error('You should specify the option "type" or "className" for the immutable validator');

  if (typeof options.if === 'function') {
    if (!options.if(attributes)) return null;
  }

  const prevRecord = await ModelsControllor.find(className, attributes.uid);

  if (prevRecord && prevRecord[key] !== value) {
    return 'should be immutable';
  } else {
    return null;
  }
};
