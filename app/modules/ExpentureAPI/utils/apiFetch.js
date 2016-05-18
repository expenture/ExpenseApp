import fetch from 'utils/fetch';
import DeviceInfo from 'utils/DeviceInfo';
import store from 'store';
import getBackendURL from './getBackendURL';
import asyncGetAccessToken from './asyncGetAccessToken';

import { received401 } from '../actions';

const apiFetch = async (uri, options = {}) => {
  if (!uri.match(/^http/)) {
    uri = `${getBackendURL()}${uri}`;
  }

  const accessToken = await asyncGetAccessToken();
  options = {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': DeviceInfo.getDeviceLocale(),
      'Authorization': accessToken ? `Bearer ${accessToken}` : null,
      ...(options.headers || {})
    }
  };

  return fetch(uri, options).then((response) => {
    if (response.status === 401) {
      const currentState = (store.getState() || {}).expentureAPI || {};
      if (currentState.status === 'ready') {
        store.dispatch(received401());
      }
    }

    return response;
  });
};

export default apiFetch;
