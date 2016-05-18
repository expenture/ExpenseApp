jest.unmock('../reducer');

import reducer, { getInitialState } from '../reducer';
import stringifyJSON from 'utils/stringifyJSON';

describe('reducer', () => {
  it('returns the initial state: \n' + stringifyJSON(getInitialState(), 4), () => {
    expect(
      reducer(undefined, {})
    ).toEqual(getInitialState());
  });

  it('handles CHANGE_BACKEND_URL', () => {
    expect(
      reducer(getInitialState(), {
        type: 'CHANGE_BACKEND_URL',
        backendURL: 'http://exp.com'
      })
    ).toEqual({
      ...getInitialState(),
      backendURL: 'http://exp.com'
    });
  });

  it('handles SIGN_IN_REQUEST', () => {
    expect(
      reducer(getInitialState(), {
        type: 'SIGN_IN_REQUEST'
      })
    ).toEqual({
      ...getInitialState(),
      status: 'signing-in'
    });
  });

  it('handles SIGN_IN_SUCCESS', () => {
    expect(
      reducer(getInitialState(), {
        type: 'SIGN_IN_SUCCESS',
        accessToken: 'a',
        accessTokenCreatedAt: 1,
        accessTokenExpiresIn: 2,
        refreshToken: 'b'
      })
    ).toEqual({
      ...getInitialState(),
      status: 'ready',
      accessToken: 'a',
      accessTokenCreatedAt: 1,
      accessTokenExpiresIn: 2,
      refreshToken: 'b'
    });
  });

  it('handles SIGN_IN_FAILURE', () => {
    expect(
      reducer(getInitialState(), {
        type: 'SIGN_IN_FAILURE',
        error: 'e'
      })
    ).toEqual({
      ...getInitialState(),
      error: 'e'
    });
  });

  it('handles REFRESH_ACCESS_TOKEN_REQUEST', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'ready',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'REFRESH_ACCESS_TOKEN_REQUEST'
      })
    ).toEqual({
      backendURL: 'http://example.com',
      status: 'token-refreshing',
      accessToken: 'a',
      refreshToken: 'r',
      accessTokenCreatedAt: 0,
      accessTokenExpiresIn: 10
    });
  });

  it('handles REFRESH_ACCESS_TOKEN_SUCCESS', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'token-refreshing',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'REFRESH_ACCESS_TOKEN_SUCCESS',
        accessToken: 'new_access_token',
        accessTokenCreatedAt: 10,
        accessTokenExpiresIn: 10,
        refreshToken: 'new_refresh_token'
      })
    ).toEqual({
      backendURL: 'http://example.com',
      status: 'ready',
      accessToken: 'new_access_token',
      refreshToken: 'new_refresh_token',
      accessTokenCreatedAt: 10,
      accessTokenExpiresIn: 10
    });
  });

  it('handles REFRESH_ACCESS_TOKEN_INVALID_GRANT', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'token-refreshing',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'REFRESH_ACCESS_TOKEN_INVALID_GRANT'
      })
    ).toEqual({
      backendURL: 'http://example.com',
      status: 'not-authorized'
    });
  });

  it('handles REFRESH_ACCESS_TOKEN_FAILURE', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'token-refreshing',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'REFRESH_ACCESS_TOKEN_FAILURE',
        error: 'failure'
      })
    ).toEqual({
      backendURL: 'http://example.com',
      status: 'ready',
      accessToken: 'a',
      refreshToken: 'r',
      accessTokenCreatedAt: 0,
      accessTokenExpiresIn: 10,
      error: 'failure'
    });
  });

  it('handles SIGN_OUT_SUCCESS', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'ready',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'SIGN_OUT_SUCCESS'
      })
    ).toEqual({
      ...getInitialState(),
      backendURL: 'http://example.com',
      status: 'not-authorized'
    });
  });

  it('handles SIGN_OUT_FAILURE', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'ready',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'SIGN_OUT_FAILURE',
        error: 'error'
      })
    ).toEqual({
        backendURL: 'http://example.com',
        status: 'ready',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10,
        error: 'error'
    });
  });

  it('handles RECEIVED_401', () => {
    expect(
      reducer({
        backendURL: 'http://example.com',
        status: 'ready',
        accessToken: 'a',
        refreshToken: 'r',
        accessTokenCreatedAt: 0,
        accessTokenExpiresIn: 10
      }, {
        type: 'RECEIVED_401'
      })
    ).toEqual({
      backendURL: 'http://example.com',
      status: 'not-authorized'
    });
  });
});
