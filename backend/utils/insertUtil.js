import knex from 'knex'

import { dbConfig } from '../config/config.js'

const query = knex(dbConfig)

// Fn for inserting data into the DB.
export default function(tableName, data, column) {
  query(tableName).insert(data).onConflict(column).ignore()
}
