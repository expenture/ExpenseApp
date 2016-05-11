import store from 'store';

export default function getBackendURL() {
  return store.getState().expentureAPI.backendURL;
}
