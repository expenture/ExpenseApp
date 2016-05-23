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
      kind: { type: 'string', optional: true, indexed: true },
      type: { type: 'string', indexed: true },
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

  constructor(props = {}) {
    super(props);

    if (!this.type) this.type = 'cash';
    if (!this.currency) this.currency = Account.defaultCurrency || 'USD';
  }

  get displayedBalance() {
    return parseMoney(this.balance, true);
  }
}
