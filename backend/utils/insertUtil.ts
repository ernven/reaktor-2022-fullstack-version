import knex from 'knex'

import { dbConfig } from '../config/config.js'
import type { gameDB, player } from './types.js'

const query = knex(dbConfig)

export default function(tableName: string, data: gameDB | gameDB[] | player[], column: string) {
  query(tableName).insert(data).onConflict(column).ignore()
}
