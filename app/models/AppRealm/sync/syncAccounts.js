import getRealm from '../getRealm';
import Account from '../../Account';

import store from 'store';
import ExpentureAPI from 'ExpentureAPI';

import { camelizeObject } from 'utils/camelize';
import { snakelizeObject } from 'utils/snakelize';

import {
  syncProcessing,
  syncSuccess,
  syncFailure
} from '../actions';

import getSyncedAt from '../utils/getSyncedAt';

export default async function syncAccounts({ throwError = false } = {}) {
  store.dispatch(syncProcessing('account', 0, 'starting'));

  try {
    const lastSyncedAt = getSyncedAt('account');
    const syncedAt = new Date();
    let promises = [];
    let errors = [];
    const realm = getRealm();
    const accounts = realm.objects('Account');

    store.dispatch(syncProcessing('account', 0, 'started'));

    // STEP 1: Delete remote accounts that are deleted locally

    const deletedAccounts = accounts.filtered('deletedAt != NULL');

    deletedAccounts.forEach((account) => {
      let f = ExpentureAPI.fetch(`/me/accounts/${account.uid}`, {
        method: 'DELETE'
      }).then(async (r) => {
        if (r !== 404 && r !== 200) {
          let text = await r.text();
          throw text;
        }

        realm.write(() => {
          realm.delete(account);
        });
      }).catch((e) => {
        realm.write(() => {
          account.syncError = `${e.toString()}: ${JSON.stringify(e)}`;
        });
        errors.push(`${e.toString()}: ${JSON.stringify(e)}`);
      });

      promises.push(f);
    });

    await Promise.all(promises);

    // STEP 2: Fetch accounts from the server and update the local ones

    await ExpentureAPI.fetch('/me/accounts').then((r) => {
      return r.json();
    }).then((json) => {
      const { accounts: remoteAccounts } = json;
      remoteAccounts.forEach((remoteAccount) => {
        let localAccount = realm.objects('Account').filtered('uid == $0', remoteAccount.uid)[0];

        if (!localAccount) {
          // Create the account locally
          let newAccount = new Account(camelizeObject(remoteAccount));
          realm.write(() => {
            realm.create('Account', {
              ...newAccount,
              syncedAt
            });
          });
        } else {
          // Update the local account if needed
          let remoteAccountUpdateAt = new Date(remoteAccount.updated_at);
          if (remoteAccountUpdateAt < localAccount.updatedAt) return;

          let updatedAccount = new Account(camelizeObject(remoteAccount));
          realm.write(() => {
            localAccount.update({
              ...updatedAccount,
              syncedAt
            });
          });
        }
      });
    }).catch((e) => {
      errors.push(e.toString());
    });

    // STEP 3: Send updated or newly created accounts to the server

    const updatedAccounts = lastSyncedAt ?
                            accounts.filtered('syncedAt == NULL || updatedAt > $0 && syncedAt <= $0', lastSyncedAt) :
                            accounts.filtered('syncedAt == NULL');

    updatedAccounts.forEach((account) => {
      let f = ExpentureAPI.fetch(`/me/accounts/${account.uid}`, {
        method: account.syncedAt ? 'PATCH' : 'PUT',
        body: {
          account: JSON.stringify(snakelizeObject(account))
        }
      }).then((r) => {
        return r.json();
      }).then((json) => {
        if (json.error) throw json.error;
        realm.write(() => {
          account.syncedAt = new Date(json.account.updated_at);
          account.syncError = null;
        });
      }).catch((e) => {
        realm.write(() => {
          account.syncError = `${e.toString()}: ${JSON.stringify(e)}`;
        });
        errors.push(`${e.toString()}: ${JSON.stringify(e)}`);
      });

      promises.push(f);
    });

    await Promise.all(promises);

    // STEP 4: Delete local accounts that are missing (deleted) on the server

    // Only do this if there are no errors occurred previously!
    if (errors.length === 0) {
      await ExpentureAPI.fetch('/me/accounts').then((r) => {
        return r.json();
      }).then((json) => {
        const { accounts: remoteAccounts } = json;
        const remoteAccountUIDs = remoteAccounts.map(a => a.uid);
        const localAccountUIDs = accounts.map(a => a.uid);
        const localUIDsToDelete = localAccountUIDs.filter((i) => (remoteAccountUIDs.indexOf(i) < 0));

        realm.write(() => {
          localUIDsToDelete.forEach((uid) => {
            const account = realm.objects('Account').filtered('uid == $0', uid);
            realm.delete(account);
          });
        });
      }).catch((e) => {
        errors.push(e.toString());
      });
    }

    await Promise.all(promises);

    if (errors.length > 0) {
      store.dispatch(syncFailure('account', errors));
      if (throwError) throw errors;
    } else {
      store.dispatch(syncSuccess('account', syncedAt));
    }
  } catch (e) {
    store.dispatch(syncFailure('account', e));
    if (throwError) throw e;
  }
}
