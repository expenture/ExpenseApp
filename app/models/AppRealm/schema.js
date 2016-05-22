/**
 * @providesModule models/schema
 */

import Account from '../Account';
import Transaction from '../Transaction';

export const schemaVersion = 1;

const schema = [
  Account,
  Transaction
];

export default schema;
