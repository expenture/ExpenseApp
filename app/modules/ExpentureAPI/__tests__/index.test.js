jest.disableAutomock();

import ExpentureAPI from '../index';
import nock from 'nock';
import store from 'store';
import getCurrentUnixTime from 'utils/getCurrentUnixTime';

store.enableTesting();

describe('ExpentureAPI', () => {
  afterEach(() => {
    jest.clearAllTimers();
    nock.cleanAll();
    store.resetStateForTesting();
  });

  describe('signIn', () => {
    it('sign in the user', async (done) => {
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'not-authorized'
        }
      });
      nock('http://exp.com')
        .post('/oauth/token?grant_type=password')
        .reply(200, {
          "access_token": "access_token",
          "token_type": "bearer",
          "expires_in": 7200,
          "refresh_token": "refresh_token",
          "created_at": 1400000000
        });

      await ExpentureAPI.signIn('username', 'password');
      expect(store.getState().expentureAPI.status).toEqual('ready');
      done();
    });
  });

  describe('signOut', () => {
    it('sign out the user', async (done) => {
      nock('http://exp.com')
        .delete('/current_oauth_application')
        .reply(200, {});
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready'
        }
      });

      expect(store.getState().expentureAPI.status).toEqual('ready');

      await ExpentureAPI.signOut();
      expect(store.getState().expentureAPI.status).toEqual('not-authorized');
      done();
    });
  });

  describe('asyncGetAccessToken', () => {
    it('returns the access token if the API status is ready', async (done) => {
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'a',
          accessTokenCreatedAt: getCurrentUnixTime(),
          accessTokenExpiresIn: 7200,
          refreshToken: 'b'
        }
      });

      const accessToken = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken).toEqual('a');
      done();
    });

    it('returns undefined if the API status is not ready and not token-refreshing', async (done) => {
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'not-authorized'
        }
      });

      const accessToken = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken).toBeUndefined();

      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'yay'
        }
      });

      const accessToken2 = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken2).toBeUndefined();
      done();
    });

    it('waits for token-refreshing and rejects after timeout', async (done) => {
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'token-refreshing',
          accessToken: 'a',
          accessTokenCreatedAt: getCurrentUnixTime(),
          accessTokenExpiresIn: 7200,
          refreshToken: 'b'
        }
      });

      ExpentureAPI.asyncGetAccessToken().then(() => {
        throw 'this should not be resolved, timeout rejecttion is expected';
      }).catch(() => {
        done();
      });
      jest.runAllTimers(); // because the timeout mechanism rely on setTimeout
    });

    it('automatically refreshes the token before returning if the access token is about to expire', async (done) => {
      // Token refreshing success
      nock('http://exp.com')
        .post('/oauth/token?grant_type=refresh_token')
        .reply(200, {
          "access_token": "new_access_token",
          "token_type": "bearer",
          "expires_in": 7200,
          "refresh_token": "new_refresh_token",
          "created_at": getCurrentUnixTime()
        });

      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'a',
          accessTokenCreatedAt: getCurrentUnixTime() - 7100,
          accessTokenExpiresIn: 7200,
          refreshToken: 'b'
        }
      });

      const accessToken = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken).toEqual('new_access_token');
      done();
    });

    it('automatically refreshes the token before returning if the access token is about to expire (and failure)', async (done) => {
      // Token refreshing failure
      nock('http://exp.com')
        .post('/oauth/token?grant_type=refresh_token')
        .reply(500, {});

      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'a',
          accessTokenCreatedAt: getCurrentUnixTime() - 7100,
          accessTokenExpiresIn: 7200,
          refreshToken: 'b'
        }
      });

      const accessToken = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken).toEqual('a');
      done();
    });

    it('automatically refreshes the token before returning if the access token is about to expire (and failure with invalid_grant)', async (done) => {
      // Token refreshing failure with invalid_grant
      nock('http://exp.com')
        .post('/oauth/token?grant_type=refresh_token')
        .reply(401, {
          "error": "invalid_grant",
          "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
        });

      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'a',
          accessTokenCreatedAt: getCurrentUnixTime() - 7100,
          accessTokenExpiresIn: 7200,
          refreshToken: 'b'
        }
      });

      const accessToken = await ExpentureAPI.asyncGetAccessToken();
      expect(accessToken).toBeUndefined();
      done();
    });
  });

  describe('fetch', () => {
    it('works like fetch (await)', async (done) => {
      nock('http://exp.com')
        .get('/sample-path')
        .reply(200, {
          "ping": "pong"
        });
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'not-authorized'
        }
      });

      // Using await syntax
      const fetchResponse = await ExpentureAPI.fetch('/sample-path');
      expect(fetchResponse.status).toEqual(200);
      const fetchJSON = await fetchResponse.json();
      expect(fetchJSON).toEqual({ ping: 'pong' });

      done();
    });

    it('works like fetch (.then)', async (done) => {
      nock('http://exp.com')
        .get('/sample-path')
        .reply(200, {
          "ping": "pong"
        });
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'not-authorized'
        }
      });

      // Using .then syntax
      ExpentureAPI.fetch('/sample-path').then(response => {
        expect(response.status).toEqual(200);
        return response.json();
      }).then(json => {
        expect(json).toEqual({ ping: 'pong' });
        done();
      });
    });

    it('sets authorization header automatically', async (done) => {
      nock('http://exp.com', {
        reqheaders: {
          'Authorization': 'Bearer access_token'
        }
      }).get('/sample-path')
        .reply(200, {
          "ping": "pong"
        });
      nock('http://exp.com')
        .get('/sample-path')
        .reply(401, {});
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'access_token',
          accessTokenCreatedAt: getCurrentUnixTime(),
          accessTokenExpiresIn: 7200,
          refreshToken: 'refresh_token'
        }
      });

      const fetchResponse = await ExpentureAPI.fetch('/sample-path');
      expect(fetchResponse.status).toEqual(200);
      const fetchJSON = await fetchResponse.json();
      expect(fetchJSON).toEqual({ ping: 'pong' });
      done();
    });

    it('sets authorization header automatically (after token refresh)', async (done) => {
      nock('http://exp.com')
        .post('/oauth/token?grant_type=refresh_token')
        .reply(200, {
          "access_token": "access_token",
          "token_type": "bearer",
          "expires_in": 7200,
          "refresh_token": "new_refresh_token",
          "created_at": getCurrentUnixTime()
        });
      nock('http://exp.com', {
        reqheaders: {
          'Authorization': 'Bearer access_token'
        }
      }).get('/sample-path')
        .reply(200, {
          "ping": "pong"
        });
      nock('http://exp.com')
        .get('/sample-path')
        .reply(401);
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'expired_access_token',
          accessTokenCreatedAt: getCurrentUnixTime() - 99999,
          accessTokenExpiresIn: 7200,
          refreshToken: 'refresh_token'
        }
      });

      const fetchResponse = await ExpentureAPI.fetch('/sample-path');
      expect(fetchResponse.status).toEqual(200);
      const fetchJSON = await fetchResponse.json();
      expect(fetchJSON).toEqual({ ping: 'pong' });
      done();
    });

    it('states that authorization has lost if 401 is received', async (done) => {
      nock('http://exp.com', {
        reqheaders: {
          'Authorization': 'Bearer access_token'
        }
      }).get('/sample-path')
        .reply(401);
      store.setStateForTesting({
        expentureAPI: {
          backendURL: 'http://exp.com',
          status: 'ready',
          accessToken: 'access_token',
          accessTokenCreatedAt: getCurrentUnixTime(),
          accessTokenExpiresIn: 7200,
          refreshToken: 'refresh_token'
        }
      });

      const fetchResponse = await ExpentureAPI.fetch('/sample-path');
      expect(fetchResponse.status).toEqual(401);
      expect(store.getState().expentureAPI.status).toEqual('not-authorized');
      done();
    });
  });

  describe('setBackendURL', () => {
    it('changes the backend URL', () => {
      ExpentureAPI.setBackendURL('https://example.com');

      expect(store.getState().expentureAPI.backendURL).toEqual('https://example.com');
      expect(ExpentureAPI.getBackendURL()).toEqual('https://example.com');
    });
  });
});
