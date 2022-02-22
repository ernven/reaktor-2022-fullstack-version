import type { Response } from 'express'
import knex from 'knex'

import { dbConfig } from '../config/config.js'

const query = knex(dbConfig)

export function listPlayers(_request: any, response: Response) {
  query('players')
    .select('name')
    .orderBy('name')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}
