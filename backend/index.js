import express from 'express'
import WebSocket from 'ws'
// In DEPLOYMENT, we need to import the path module (uncomment next line).
// import * as path from 'path'

import data from './routes/data.js'
import players from './routes/players.js'

import { appConfig } from './config/config.js'
import fetch from './utils/fetch.js'
import insertUtil from './utils/insertUtil.js'

const app = express()

// Using websockets to stay up to date.
const webSocket = new WebSocket(process.env.BAD_WS_URL)

webSocket.onmessage = e => {
  if (e.data) {
    // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
    const parsedData = JSON.parse(JSON.parse(e.data))

    // Let's get the type straight from the source.
    const { type, ...data } = parsedData

    // If it's a game result, add it to the db.
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

      // Try to add the players names as well.
      insertUtil('players', [{name: data.playerA.name}, {name: data.playerB.name}], 'name')
    }
  }
}


// Requests defined in the routing.
app.use('/data', data)
app.use('/players', players)

// Used in DEPLOYMENT for loading the static (frontend) files.
if(process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('/*', (_, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')) })  
}

// Port config is stored in config file (under config folder)
app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`)
  fetch()
})
