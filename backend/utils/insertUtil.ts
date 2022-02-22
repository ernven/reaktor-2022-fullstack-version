import knex from 'knex'

import { dbConfig } from '../config/config.js'
import type { game, player } from './types.js'

const query = knex(dbConfig)

export default function(tableName: string, data: game | player[], column: string) {
  query(tableName).insert(data).onConflict(column).ignore()
}
