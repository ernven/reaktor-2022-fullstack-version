import express from 'express'
import WebSocket from 'ws'
// In DEPLOYMENT, we need to import the path module.
import * as path from 'path'

import games from './routes/games.js'
import players from './routes/players.js'

import { appConfig } from './config/config.js'
import fetchGamesHistory from './utils/fetch.js'
import insertUtil from './utils/insertUtil.js'

const app = express()

app.use('/games', games)
app.use('/players', players)

// Used in DEPLOYMENT for loading the static (frontend) files.
if(process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('/*', (_, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')) })  
}

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`)
  fetchGamesHistory()
})

// Using websockets to stay up to date.
const webSocket = new WebSocket(process.env.BAD_WS_URL || '')

webSocket.onmessage = e => {
  if (e.data) {
    // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
    const parsedData = JSON.parse(JSON.parse(e.data.toString()))

    const { type, ...data } = parsedData

    if (type === 'GAME_RESULT') {

      const gameEntry = {
        id: data.gameId,
        date: new Date(data.t),
        first_name: data.playerA.name,
        first_played: data.playerA.played,
        second_name: data.playerB.name,
        second_played: data.playerB.played,
      }

      insertUtil('games', gameEntry, 'id')

      insertUtil('players', [{name: data.playerA.name}, {name: data.playerB.name}], 'name')
    }
  }
}
