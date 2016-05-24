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
      uid: { type: 'string', indexed: true },
      type: { type: 'string', indexed: true, default: 'normal' },
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
      immutable: {
        type: 'Account'
      }
    },
    kind: {},
    name: {
      presence: true
    },
    currency: {
      presence: true
    },
    balance: {
      immutable: {
        type: 'Account',
        if: (o) => o.syncing
      }
    },

    syncing: {
      immutable: {
        type: 'Account'
      }
    },
    synchronizerUID: {
      immutable: {
        type: 'Account'
      }
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
