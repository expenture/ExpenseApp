# BackendSession

The Backend Session Controller (`BackendSession`) is a high-level module handling the connection with the backend server. It wraps up low-level modules like `ExpentureAPI`, `PushNotification`, `FBAPI` and uses UI (mostly alert boxes) to interact with the user during its workflow.

It store and updates its state in the redux store, so that other module or components can access the current state.

## State Tree

```json
{
  "backendSession": {
    "status": "activated",
    "activity": null,
    "user": {
      "name": "User Name",
      "email": "email@user.com",
      "profilePicture": "http://placehole.it/500x500"
    }
  }
}
```

- status: Can be `"activated"` or `"inactivated"`.
- activity: Current activity, see `./reducer.js` for activity values.
- user: The user's profile and settings.

## APIs

### `BackendSession.signIn(username, password)`

Sign in.

The difference between `ExpentureAPI.signIn` and `BackendSession.signIn` is that `BackendSession.signIn` handles the whole sign in flow, including sign in the API (using `ExpentureAPI`), request and sends the push notification device token to backend (using `PushNotification`), download the user's account data and triggers the first data syncing (`TODO`). Unlike `ExpentureAPI.signIn`, the `signIn` function of `BackendSession` means the whole sign in flow when the user uses this app (not just getting an access token), and will be treated as a failure if any step has failed. It also display alert if failure.

### `BackendSession.fbSignIn()`

Sign in with Facebook.

### `BackendSession.signOut()`

Sign out. Displays alert if error occured.

### `BackendSession.updateUserData(newData)`

Updates the user's data.

Parameters:

- `newData`: An optional object that contains the new data.

### `BackendSession.fetch(url, options)`

Send fetch request, just like `fetch(...)`. It makes alerts if known errors occured, and the rest is same as `ExpentureAPI.fetch(...)`.
