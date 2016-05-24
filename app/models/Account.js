/**
 * @providesModule models/Account
 */

import Model from './_base';

import parseMoney from 'utils/parseMoney';

export default class Account extends Model {
  static schema = {
    name: 'Account',
    primaryKey: 'uid',
    properties: {
      type: { type: 'string', indexed: true, default: 'normal' },
      uid: { type: 'string', indexed: true },
      kind: { type: 'string', optional: true, indexed: true },
      name: 'string',
      currency: { type: 'string', indexed: true },
      balance: { type: 'int', default: 0 },

      syncing: { type: 'bool', default: false, indexed: true },
      synchronizerUID: { type: 'string', optional: true, indexed: true },

      updatedAt: { type: 'date', indexed: true },
      syncedAt: { type: 'date', indexed: true, optional: true },
      deletedAt: { type: 'date', indexed: true, optional: true },
      syncError: { type: 'string', optional: true }
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
    type: {
      uneditable: true
    },
    kind: {
      presence: true,
      inclusion: ['cash', 'credit_card', 'debit_card']
    },
    name: {
      presence: true
    },
    currency: {
      presence: true,
      immutable: {
        if: (o) => o.syncing
      }
    },
    balance: {
      immutable: {
        if: (o) => o.syncing
      }
    },

    syncing: {
      uneditable: true
    },
    synchronizerUID: {
      uneditable: true
    }
  };

  constructor(props = {}) {
    super(props);

    if (!this.kind) this.kind = 'cash';
    if (!this.currency) this.currency = Account.defaultCurrency || 'USD';
  }

  get displayedBalance() {
    return parseMoney(this.balance, true);
  }
}
