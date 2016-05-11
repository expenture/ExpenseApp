/**
 * @return {number} Current unix timestamp.
 *
 * @providesModule utils/getCurrentUnixTime
 */
export default function getCurrentUnixTime() {
  return parseInt((new Date()).getTime()/1000, 10);
}
