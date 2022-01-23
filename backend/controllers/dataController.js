import knex from 'knex'

import { dbConfig } from '../config/config.js'

// Initializing knex for building queries with our config.
const query = knex(dbConfig)

export function listData(request, response) {
  // We create the basic query structure.
  let listQuery = query('games')
  listQuery
    .select('id', 'date', 'first_name', 'first_played', 'second_name', 'second_played')

  // If the request contains query parameters, values should be valid or the query returns No Content.
  // If they are valid, we use .modify to handle optional parameters (using the helper function).
  if (request.query.name) {
    listQuery.where('first_name', request.query.name).orWhere('second_name', request.query.name)
  }
  
  // We use promises to deal with our query returns.
  listQuery
    .orderBy('date', 'desc')
    .then(r => r.length !== 0 ? response.status(200).json(r) : response.status(204).end())
    .catch(err => response.status(500).json({error: err}))
}
