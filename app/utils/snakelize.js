/**
 * Snakelizing utils
 *
 * @providesModule utils/snakelize
 */

import acronyms from 'constants/acronyms';

/**
 * Snakelize a string.
 *
 * @param {string} str An camelCase string to be snakelize.
 * @return {string} The snakelize string.
 */
export default function snakelize(str) {
  acronyms.forEach((acronym) => {
    let acronymUnofficialForm = acronym.toLowerCase().replace(/^./, t => t.toUpperCase());
    str = str.replace(acronym, acronymUnofficialForm);
  });

  return str.replace(/([A-Z])/g, function (match, w, offset) {
    if (offset === 0) return w.toLowerCase();
    else return '_' + w.toLowerCase();
  });
}

/**
 * Snakelize a object.
 *
 * @param {object} obj An object using camelCase keys to be snakelize.
 * @return {object} The snakelized object.
 */
export function snakelizeObject(obj) {
  var snakelizedObj = Object.assign({}, obj);

  for (let prop in snakelizedObj) {
    let snakelizedProp = snakelize(prop);
    if (snakelizedProp !== prop) {
      snakelizedObj[snakelizedProp] = snakelizedObj[prop];
      delete snakelizedObj[prop];
    }
  }

  return snakelizedObj;
}
