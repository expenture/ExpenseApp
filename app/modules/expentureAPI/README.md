# expentureAPI

A module that is in charge to authenticate and send requests to the backend server. It store and updates its state in the redux store, so that other module or components can access the current API state (e.g. signed in or not).

It relies on the redux store to work.

## API

Some samples of the API (read the test or code for details):

```js
import expentureAPI from 'expentureAPI';

expentureAPI.signIn('username', 'password');

expentureAPI.fetch('/transactions');

expentureAPI.signOut();
```

## State Tree

A sample of the state tree (read the test or code for details):

```js
{
  expentureAPI: {
    backendURL: 'https://api.expenture.io',
    status: 'ready',
    accessToken: 'ef83kgv93k...'
    accessTokenCreatedAt: 1400000000,
    accessTokenExpiresIn: 7200,
    refreshToken: 'wk49fks32...'
  }
}
```
