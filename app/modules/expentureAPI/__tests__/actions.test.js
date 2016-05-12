jest.unmock('../actions');

import nock from 'nock';
import mockStore from 'mockStore';
import getBackendURL from '../utils/getBackendURL';
import * as actions from '../actions';

describe('main actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('changeBackendURL', () => {
    it('dispatchs CHANGE_BACKEND_URL with the new backendURL', () => {
      const store = mockStore();

      store.dispatch(actions.changeBackendURL('http://exp.com'));
      expect(store.getActions()).toEqual([{
        type: 'CHANGE_BACKEND_URL',
        backendURL: 'http://exp.com'
      }]);
    });
  });

  describe('signIn', () => {
    it('dispatchs SIGN_IN_SUCCESS when signed in successfully', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=password')
        .reply(200, {
          "access_token": "access_token",
          "token_type": "bearer",
          "expires_in": 7200,
          "refresh_token": "refresh_token",
          "created_at": 1400000000
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'SIGN_IN_REQUEST' },
        {
          type: 'SIGN_IN_SUCCESS',
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
          accessTokenCreatedAt: 1400000000,
          accessTokenExpiresIn: 7200
        }
      ];

      await store.dispatch(actions.signIn('username', 'password'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatchs SIGN_IN_FAILURE when signed in faild with wrong credentials', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=password')
        .reply(401, {
          "error": "invalid_resource_owner",
          "error_description": "The provided resource owner credentials are not valid, or resource owner cannot be found"
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'SIGN_IN_REQUEST' },
        {
          type: 'SIGN_IN_FAILURE',
          error: 'invalid_resource_owner'
        }
      ];

      await store.dispatch(actions.signIn('username', 'password'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatchs SIGN_IN_FAILURE if the server response is invalid', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=password')
        .reply(200, {
          "ahhh": "oh"
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'SIGN_IN_REQUEST' },
        {
          type: 'SIGN_IN_FAILURE',
          error: {
            hint: 'Possible network error?'
          }
        }
      ];

      await store.dispatch(actions.signIn('username', 'password'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('refreshAccessToken', () => {
    it('dispatchs REFRESH_ACCESS_TOKEN_SUCCESS when token refreshed successfully', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=refresh_token')
        .reply(200, {
          "access_token": "new_access_token",
          "token_type": "bearer",
          "expires_in": 7200,
          "refresh_token": "new_refresh_token",
          "created_at": 1400000001
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'REFRESH_ACCESS_TOKEN_REQUEST' },
        {
          type: 'REFRESH_ACCESS_TOKEN_SUCCESS',
          accessToken: 'new_access_token',
          refreshToken: 'new_refresh_token',
          accessTokenCreatedAt: 1400000001,
          accessTokenExpiresIn: 7200
        }
      ];

      await store.dispatch(actions.refreshAccessToken());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatchs REFRESH_ACCESS_TOKEN_FAILURE when token refreshing faild', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=refresh_token')
        .reply(401, {
          "error": "some_error"
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'REFRESH_ACCESS_TOKEN_REQUEST' },
        {
          type: 'REFRESH_ACCESS_TOKEN_FAILURE',
          error: 'some_error'
        }
      ];

      await store.dispatch(actions.refreshAccessToken());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatchs REFRESH_ACCESS_TOKEN_INVALID_GRANT when token refreshing faild with invalid_grant', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=refresh_token')
        .reply(401, {
          "error": "invalid_grant",
          "error_description": "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'REFRESH_ACCESS_TOKEN_REQUEST' },
        {
          type: 'REFRESH_ACCESS_TOKEN_INVALID_GRANT'
        }
      ];

      await store.dispatch(actions.refreshAccessToken());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatchs REFRESH_ACCESS_TOKEN_FAILURE if the server response is invalid', async (done) => {
      nock(getBackendURL())
        .post('/oauth/token?grant_type=refresh_token')
        .reply(200, {
          "ahhh": "oh"
        });
      const store = mockStore();

      const expectedActions = [
        { type: 'REFRESH_ACCESS_TOKEN_REQUEST' },
        { type: 'REFRESH_ACCESS_TOKEN_FAILURE' }
      ];

      await store.dispatch(actions.refreshAccessToken());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('signOut', () => {
    it('dispatchs SIGN_OUT_REQUEST and SIGN_OUT_SUCCESS', async (done) => {
      const store = mockStore();

      const expectedActions = [
        { type: 'SIGN_OUT_REQUEST' },
        { type: 'SIGN_OUT_SUCCESS' }
      ];

      await store.dispatch(actions.signOut());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
