# Models

Universal data models with the same API for different backends.

Using data models to access data is more convenient and safe, but for performance or more advanced features, consider accessing the API or Realm DB directly (not recommended for normal usage).

## ModelsController

The `ModelsController` provides CRUD for data models.

```js
import ModelsController from 'ModelsController';

// Change the data backend
ModelsController.setBackend('api');
ModelsController.setBackend('realm');
```

### Query

Sample usage:

```js
ModelsController.query('Transaction', {
  filter: {
    tags: ['~=', 'food'], // contains 'food'
    amount: ['>', 0], // greater then 0
    datetime: ['><', 1464011233982, 1464011456497] // in range 1464011233982 ~ 1464011456497
  },
  sort: '-datetime',
  limit: 20
}).then((transactions) => {
  alert(JSON.stringify(transactions, null, 2));
}).catch((e) => {
  alert('Error: ' + e);
});
```

> Notes:
>
> - Operators `=`, `<`, `>`, `!=`, `<=`, `>=`, `~=`, `><` are supported with `filter`.
> - In `filter`, the date format should be something that can be parsed into a `Date`.
> - `~=` means `CONTAINS`, or say `ILIKE %something%`.
> - `><` means `BETWEEN`, between `min, max` (order sensitive).
> - For `sort`, adding a minus sign (`-`) before the property name means `DESC`, or say reverse order.

### Find

Sample usage:

```js
ModelsController.find('Account',
  'account-uid'
).then((account) => {
  alert(JSON.stringify(account, null, 2));
}).catch((e) => {
  alert('Error: ' + e);
});
```

### Create

Sample usage:

```js
var account = new Account({ name: 'My Account' });

ModelsController.create('Account', account) // or ModelsController.create('Account', { name: 'My Account' })
  .then((account) => {
    alert(JSON.stringify(account, null, 2));
  })
  .catch((e) => {
    alert('Error: ' + e);
  });
```

### Upate

Sample usage:

```js
ModelsController.update('Account', 'account-uid', { name: 'My Updated Account' })
  .then((account) => {
    alert(JSON.stringify(account, null, 2));
  })
  .catch((e) => {
    alert('Error: ' + e);
  });
```

### Destroy

Sample usage:

```js
ModelsController.destroy('Account', 'account-uid')
  .then((account) => {
    alert(JSON.stringify(account, null, 2));
  })
  .catch((e) => {
    alert('Error: ' + e);
  });
```

### Validate

Sample usage:

```js
var account = new Account({ name: 'My Account' });

ModelsController.validate('Account', account)
  .then((result) => {
    if (result === true) {
      alert('No problem!');
    } else {
      alert('Errors detected: ' + JSON.stringify(account.getErrors(), null, 2));
    }
  });

// or

ModelsController.validate('Account', account, { throwError: true })
  .then((result) => {
    alert('No problem!');
  })
  .catch((e) => {
    alert('Error: ' + e);
  });
```

## Misc

### Fun Facts About The Realm

- Validation will not run on Realm sync, so `immutable` or `uneditable` props may be changed by the server.
- When create or update, the sequence of callback and validation is (`beforeValidate()` -> Validate) -> (`beforeRealmSave()` -> Save -> `afterRealmSave()`), this means that `immutable` or `uneditable` props can be initialized or mutated on the `beforeRealmSave()` callback.
- The `afterRealmSave()` callback is runned in a transaction together with save.
