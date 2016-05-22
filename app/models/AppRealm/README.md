# AppRealm

We use [Realm](https://realm.io/) to provide offline support and data syncing for the iOS and Android app.

The state of Realm is stored in the Redux store, and we will generate an ID for the Realm to support multiple Realms in the same app.

```js
import AppRealm from 'AppRealm';

AppRealm.realm; // returns the current realm
```
