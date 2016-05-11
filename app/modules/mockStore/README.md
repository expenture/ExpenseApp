# mockStore

This module uses `redux-mock-store` to provide a mocked store for testing. The same middlewares as the real store will be applied to the mocked store.

Note that all reducers will not work on the mocked store.

See https://github.com/arnaudbenard/redux-mock-store for reference.

## API

```js
const store = mockStore({}); // initial state of the store

store.dispatch(action)
store.getState() // => state: Object
store.subscribe()

store.getActions() // => actions: Array
store.clearActions()
```
