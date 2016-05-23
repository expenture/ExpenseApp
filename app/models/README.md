# Models

Universal data models with the same API for different backends.

Using data models to access data is more convenient and safe, but for performance or more advanced features, consider accessing the API or Realm DB directly (not recommended for normal usage).

## ModelsControllor

The `ModelsControllor` provides CRUD for data models.

```js
import ModelsControllor from 'ModelsControllor';

// Change the data backend
ModelsControllor.setBackend('api');
ModelsControllor.setBackend('realm');
```

### Query

Sample usage:

```js
ModelsControllor.query('Transaction', {
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
ModelsControllor.find('Account',
  'account-uid'
).then((account) => {
  alert(JSON.stringify(account, null, 2));
}).catch((e) => {
  alert('Error: ' + e);
});
```

### Create

> TODO: Complete this.

### Upate

> TODO: Complete this.

### Delete

> TODO: Complete this.
