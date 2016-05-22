/**
 * @providesModule utils/parseError
 */

export default function parseError(e) {
  let type, code, message;

  if (e) {
    message = e.message;
    code = e.code;
    if (e.constructor) type = e.constructor.name;
  }

  return {
    type,
    code,
    message,
    raw: e
  };
}
