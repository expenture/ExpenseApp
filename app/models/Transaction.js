/**
 * @providesModule models/Transaction
 */

import AppModel from './AppModel';

export default class Transaction extends AppModel {
  static schema = {
    name: 'Transaction',
    primaryKey: 'uid',
    properties: {
      uid: { type: 'string', indexed: true },
      accountUID: { type: 'string', indexed: true },
      kind: { type: 'string', optional: true, indexed: true },
      amount: { type: 'int', indexed: true },
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

      onRecord: { type: 'bool', default: true, indexed: true },
      recordTransactionUID: { type: 'string', optional: true, indexed: true },

      ignoreInStatistics: { type: 'bool', default: true, indexed: true },

      updatedAt: { type: 'date', indexed: true },
      syncedAt: { type: 'date', indexed: true, optional: true },
      deletedAt: { type: 'date', indexed: true, optional: true }
    }
  };

  constructor(props = {}) {
    super(props);
  }
}
