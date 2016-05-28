/**
 * @providesModule utils/getGlobal
 */

export default function getGlobal() {
  if (typeof global === 'object') {
    return global;
  } else if (typeof window === 'object') {
    return window;
  }
}
