import getRealm from '../getRealm';
import Transaction from '../../Transaction';

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

export default async function syncTransactions({ throwError = false, perPage = 100, fullSync = false } = {}) {
  /**
   * Progress Segmentation:
   *
   * 0% ~ 10%: Starting
   * 10% ~ 30%: Step 1
   * 30% ~ 50%: Step 2
   * 50% ~ 80%: Step 3
   * 80% ~ 100%: Step 4
   */
  store.dispatch(syncProcessing('transaction', 0, 'starting'));

  try {
    const lastSyncedAt = getSyncedAt('transaction');
    const syncedAt = new Date();
    let promises = [];
    let errors = [];
    const realm = getRealm();
    const transactions = realm.objects('Transaction');

    store.dispatch(syncProcessing('transaction', 0.09, 'started'));

    // STEP 1: Delete local transactions that are deleted on the server

    await (async () => {
      store.dispatch(syncProcessing('transaction', 0.10, 's-1-local-deletion'));

      let deletedTransactionsURL =
        `/me/transactions?per_page=${perPage}&deleted=true&sort=-deleted_at`;
      let pageCount = 1;
      let processedPages = 0;
      while (lastSyncedAt && deletedTransactionsURL) {
        let response = await ExpentureAPI.fetch(deletedTransactionsURL);
        let json = await response.json();
        pageCount = json.pagination.pages_count || json.pagination.page_count;
        deletedTransactionsURL = json.pagination.links &&
                                 json.pagination.links.next;
        processedPages += 1;
        store.dispatch(syncProcessing('transaction', 0.10 + (0.20 * (processedPages / pageCount)), 's-1-local-deletion'));

        for (let remoteTransaction of json.transactions) {
          let remoteTransactionDeletedAt = new Date(remoteTransaction.deleted_at);

          // If we met with a record that is not deleted after the last sync,
          // skip and stop fetching remaining pages
          if (!fullSync &&
              lastSyncedAt &&
              remoteTransactionDeletedAt < lastSyncedAt) {
            deletedTransactionsURL = undefined; // this breaks the while (deletedTransactionsURL) loop
            continue;
          }

          let localTransaction = realm.objects('Transaction')
                                      .filtered('uid == $0', remoteTransaction.uid)[0];

          if (localTransaction) {
            realm.write(() => {
              realm.delete(localTransaction);
            });
          }
        }
      }
    })();

    await Promise.all(promises);

    // STEP 2: Delete remote transactions that are deleted locally

    await (async () => {
      store.dispatch(syncProcessing('transaction', 0.30, 's-2-remote-deletion'));

      const deletedTransactions = transactions.filtered('deletedAt != NULL');
      const deletedTransactionsCount = deletedTransactions.length;
      let processedTransactions = 0;

      deletedTransactions.forEach((transaction) => {
        let f = ExpentureAPI.fetch(`/me/transactions/${transaction.uid}`, {
          method: 'DELETE'
        }).then(async (r) => {
          processedTransactions += 1;
          store.dispatch(syncProcessing('transaction', 0.30 + (0.20 * (processedTransactions / deletedTransactionsCount)), 's-2-remote-deletion'));

          if (r !== 404 && r !== 200) {
            let text = await r.text();
            throw new Error(text);
          }

          realm.write(() => {
            realm.delete(transaction);
          });
        }).catch((e) => {
          realm.write(() => {
            transaction.syncError = e.toString();
          });
          errors.push(e.toString());
        });

        promises.push(f);
      });
    })();

    await Promise.all(promises);

    // STEP 3: Fetch transactions from the server and update the local ones

    await (async () => {
      store.dispatch(syncProcessing('transaction', 0.50, 's-3-local-update'));

      let transactionsURL = `/me/transactions?per_page=${perPage}&sort=-updated_at`;
      let newTransactions = [];
      let pageCount = 1;
      let processedPages = 0;
      while (transactionsURL) {
        let response = await ExpentureAPI.fetch(transactionsURL);
        let json = await response.json();
        pageCount = json.pagination.pages_count || json.pagination.page_count;
        transactionsURL = json.pagination.links &&
                          json.pagination.links.next;
        processedPages += 1;
        store.dispatch(syncProcessing('transaction', 0.50 + (0.30 * (processedPages / pageCount)), 's-3-local-update'));

        for (let remoteTransaction of json.transactions) {
          let remoteTransactionUpdateAt = new Date(remoteTransaction.updated_at);

          // If we met with a record that has no updates after the last sync,
          // skip and stop fetching remaining pages
          if (!fullSync &&
              lastSyncedAt &&
              remoteTransactionUpdateAt < lastSyncedAt) {
            transactionsURL = undefined; // this breaks the while (transactionsURL) loop
            continue;
          }

          let localTransaction = realm.objects('Transaction')
                                      .filtered('uid == $0', remoteTransaction.uid)[0];

          if (!localTransaction) {
            // Create the transaction locally
            let newTransaction = new Transaction(camelizeObject(remoteTransaction));
            newTransactions.push(newTransaction);
          } else {
            // Update the local transaction if needed
            if (remoteTransactionUpdateAt < localTransaction.updatedAt) continue;

            let updatedTransaction = new Transaction(camelizeObject(remoteTransaction));
            realm.write(() => {
              localTransaction.update({
                ...updatedTransaction,
                syncedAt
              });
            });
          }
        }
      }
      if (newTransactions.length > 0) {
        realm.write(() => {
          newTransactions.forEach((newTransaction) => {
            try {
              realm.create('Transaction', {
                ...newTransaction,
                syncedAt
              });
            } catch (e) {
              errors.push(e);
            }
          });
        });
      }
    })();

    // STEP 4: Send updated or newly created transactions to the server

    await (async () => {
      store.dispatch(syncProcessing('transaction', 0.80, 's-4-remote-update'));

      const updatedTransactions = lastSyncedAt ?
                                  transactions.filtered('syncedAt == NULL || updatedAt > $0 && syncedAt <= $0', lastSyncedAt) :
                                  transactions.filtered('syncedAt == NULL');
      const updatedTransactionsCount = updatedTransactions.length;
      let processedTransactions = 0;

      updatedTransactions.forEach((transaction) => {
        let f = ExpentureAPI.fetch(`/me/transactions/${transaction.uid}`, {
          method: transaction.syncedAt ? 'PATCH' : 'PUT',
          body: {
            transaction: JSON.stringify(snakelizeObject(transaction))
          }
        }).then((r) => {
          processedTransactions += 1;
          store.dispatch(syncProcessing('transaction', 0.80 + (0.20 * (processedTransactions / updatedTransactionsCount)), 's-4-remote-update'));

          return r.json();
        }).then((json) => {
          if (json.error) throw json.error;
          realm.write(() => {
            transaction.syncedAt = new Date(json.transaction.updated_at);
            transaction.syncError = null;
          });
        }).catch((e) => {
          realm.write(() => {
            transaction.syncError = e.toString();
          });
          errors.push(e);
        });

        promises.push(f);
      });
    })();

    await Promise.all(promises);

    if (errors.length > 0) {
      store.dispatch(syncFailure('transaction', errors));
      if (throwError) throw errors;
    } else {
      store.dispatch(syncSuccess('transaction', syncedAt));
    }
  } catch (e) {
    store.dispatch(syncFailure('transaction', e));
    if (throwError) throw e;
  }
}
