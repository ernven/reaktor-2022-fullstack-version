import knex from 'knex'

import { dbConfig } from '../config/config.js'

// Initializing knex for building queries with our config.
const query = knex(dbConfig)

export function listPlayers(_, response) {
  query('players')
    .select('name')
    .orderBy('name')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}
