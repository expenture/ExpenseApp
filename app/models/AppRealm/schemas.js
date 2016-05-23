/**
 * Historical and the current schema with their migrations
 */

import models from 'models';

const currentSchema = Object.keys(models).map(k => models[k]);

const schemas = [
  {
    schema: [
      {
        name: 'Account',
        primaryKey: 'uid',
        properties: {
          uid: { type: 'string', indexed: true },
          kind: { type: 'string', optional: true, indexed: true },
          type: { type: 'string', indexed: true },
          name: 'string',
          currency: { type: 'string', indexed: true },
          balance: { type: 'int', default: 0 }
        }
      },
      {
        name: 'Transaction',
        primaryKey: 'uid',
        properties: {
          uid: { type: 'string', indexed: true },
          accountUID: { type: 'string', indexed: true },
          kind: { type: 'string', optional: true, indexed: true },
          amount: { type: 'int', indexed: true },
          description: { type: 'string', optional: true }
        }
      }
    ],
    schemaVersion: 1,
    migration: () => {}
  },

  { schema: currentSchema, schemaVersion: 2, migration: () => {} }
];

export default schemas;
