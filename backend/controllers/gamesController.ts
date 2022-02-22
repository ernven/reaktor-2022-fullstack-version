import type { Request, Response } from 'express'
import knex from 'knex'

import { dbConfig } from '../config/config.js'

const query = knex(dbConfig)

interface customReq extends Request {
  query: {
    name: string
  }
}

export function listGamesHistory(request: customReq, response: Response) {
  
  let listQuery =
    query('games').select('id', 'date', 'first_name', 'first_played', 'second_name', 'second_played')

  if (request.query.name) {
    listQuery.where('first_name', request.query.name).orWhere('second_name', request.query.name)
  }
  
  listQuery
    .orderBy('date', 'desc')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}
