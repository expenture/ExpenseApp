/**
 * Generates an uuid.
 *
 * @return {string} An random unique uuid.
 *
 * @providesModule utils/generateUUID
 */
export default function generateUUID() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
