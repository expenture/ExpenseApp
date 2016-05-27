/**
 * @providesModule models/Transaction
 */

import Model from './_base';

export default class Transaction extends Model {
  static schema = {
    name: 'Transaction',
    primaryKey: 'uid',
    properties: {
      type: { type: 'string', indexed: true, default: 'normal' },
      uid: { type: 'string', indexed: true },
      accountUID: { type: 'string', indexed: true },
      amount: { type: 'int', default: 0, indexed: true },
      description: { type: 'string', optional: true },

      categoryCode: { type: 'string', optional: true, indexed: true },
      tags: { type: 'string', optional: true, indexed: true },
      note: { type: 'string', optional: true },
      datetime: { type: 'date', indexed: true },

      latitude: { type: 'double', optional: true },
      longitude: { type: 'double', optional: true },
      partyType: { type: 'string', optional: true },
      partyCode: { type: 'string', optional: true },
      partyName: { type: 'string', optional: true },

      separated: { type: 'bool', default: false, indexed: true },
      separateTransactionUID: { type: 'string', optional: true, indexed: true },

      onRecord: { type: 'bool', optional: true, indexed: true },
      recordTransactionUID: { type: 'string', optional: true, indexed: true },

      ignoreInStatistics: { type: 'bool', default: true, indexed: true },

      updatedAt: { type: 'date', indexed: true },
      syncedAt: { type: 'date', indexed: true, optional: true },
      deletedAt: { type: 'date', indexed: true, optional: true }
    }
  };

  static constraints = {
    uid: {
      presence: true,
      length: {
        minimum: 8,
        message: 'must be at least 8 characters'
      }
    },
    accountUID: {
      presence: true,
      foreignKey: true
    },
    kind: {},
    amount: {},
    description: {},

    categoryCode: {},
    tags: {},
    note: {},
    datetime: {
      presence: true
    },

    latitude: {},
    longitude: {},
    partyType: {},
    partyCode: {},
    partyName: {},

    separated: {
      uneditable: true
    },
    separateTransactionUID: {
      immutable: true,
      foreignKey: {
        optional: true
      }
    },

    onRecord: {
      uneditable: true
    },
    recordTransactionUID: {
      uneditable: true
    },

    ignoreInStatistics: {}
  };

  constructor(props = {}) {
    super(props);

    if (!this.datetime) this.datetime = new Date();
  }

  beforeRealmSave(action) {
    const { realm } = require('AppRealm').default;
    const account = realm.objects('Account')
                         .filtered('uid == $0', this.accountUID)[0];

    // Transactions added to syncing accounts should not be on record
    if (action === 'create' && account.syncing) {
      this.onRecord = false;
    }

    // Set the transaction type
    if (action === 'create' && account.syncing) {
      if (this.onRecord === false) {
        this.type = 'not_on_record';
      } else if (this.separateTransactionUID) {
        this.type = 'virtual';
      } else {
        this.type = 'normal';
      }
    }

    // For virtual transaction
    if (this.type === 'virtual') {
      const separateTransaction = realm.objects('Transaction')
                                       .filtered('uid == $0', this.separateTransactionUID)[0];
      this.onRecord = null;
      this.accountUID = separateTransaction.accountUID;
    }
  }

  afterRealmSave() {

  }

  beforeRealmDestroy() {

  }

  afterRealmDestroy() {

  }
}
