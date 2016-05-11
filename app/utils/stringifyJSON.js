/**
 * @providesModule utils/stringifyJSON
 */

export default function (obj, padding = 0) {
  let jsonString = JSON.stringify(obj, null, 2);

  if (padding > 0) {
    let paddingBlanks = (new Array(padding)).fill(' ').join('');
    jsonString = paddingBlanks + jsonString;
    jsonString = jsonString.replace(/\n/gm, '\n' + paddingBlanks);
  }

  return jsonString;
}
