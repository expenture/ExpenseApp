/**
 * Camelizing utils
 *
 * @providesModule utils/camelize
 */

import acronyms from 'constants/acronyms';

/**
 * Camelize a string.
 *
 * @param {string} str An snake_case, kebab-case or any other string to be camelized.
 * @return {string} The camelized string.
 */
export default function camelize(str) {
  let camelizedStr = str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });

  acronyms.forEach((acronym) => {
    let acronymUnofficialForm = acronym.toLowerCase().replace(/^./, t => t.toUpperCase());
    camelizedStr = camelizedStr.replace(acronymUnofficialForm, acronym);
  });

  return camelizedStr;
}

/**
 * Camelize a object.
 *
 * @param {object} obj An object using snake_case or kebab-case keys to be camelized.
 * @return {object} The camelized object.
 */
export function camelizeObject(obj) {
  var camelizedObj = Object.assign({}, obj);

  for (let prop in camelizedObj) {
    let camelizedProp = camelize(prop);
    if (camelizedProp != prop) {
      camelizedObj[camelizedProp] = camelizedObj[prop];
      delete camelizedObj[prop];
    }
  }

  return camelizedObj;
}
