jest.unmock('../reducer');

import reducer, { initialState } from '../reducer';
import stringifyJSON from 'utils/stringifyJSON';

describe('reducer', () => {
  it('returns the initial state: \n' + stringifyJSON(initialState, 4), () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('handles SIGN_IN_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: 'SIGN_IN_REQUEST'
      })
    ).toEqual({
      ...initialState,
      status: 'signing-in'
    });
  });

  it('handles SIGN_IN_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: 'SIGN_IN_SUCCESS',
        accessToken: 'a',
        accessTokenCreatedAt: 1,
        accessTokenExpiresIn: 2,
        refreshToken: 'b'
      })
    ).toEqual({
      ...initialState,
      status: 'ready',
      accessToken: 'a',
      accessTokenCreatedAt: 1,
      accessTokenExpiresIn: 2,
      refreshToken: 'b'
    });
  });

  it('handles SIGN_IN_FAILURE', () => {
    expect(
      reducer(initialState, {
        type: 'SIGN_IN_FAILURE',
        error: 'e'
      })
    ).toEqual({
      ...initialState,
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
      backendURL: 'http://example.com',
      status: 'not-authorized'
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
