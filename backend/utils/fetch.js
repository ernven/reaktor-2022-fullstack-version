import axios from 'axios'

import insertUtil from './insertUtil.js'

const timeout = time => new Promise(resolve => setTimeout(resolve, time))

// Function for fetching gameData from the bad API.
export default async function fetch() {
  const url = process.env.BAD_API_URL
  let endpoint = '/rps/history'
  let players = []
  
  while (true) {
    // Fetch requests go every second as to not flood the API.
    const [res] = await Promise.all([axios.get(url + endpoint), timeout(1000)])

    const cursor = res.data.cursor
    const gameData = res.data.data

    // If history gameData came back, process it (checking players names and adding it).
    if (gameData) {
      let newPlayers = []

      // Update the games history gameData.
      for (let i = 0; i < gameData.length; i++) {

      // We can also keep track of the players so we can use it later.
        if (!players.includes(gameData[i].playerA.name)) { newPlayers.push(gameData[i].playerA.name) }
        if (!players.includes(gameData[i].playerB.name)) { newPlayers.push(gameData[i].playerB.name) }

        gameData[i] = {
          id: gameData[i].gameId,
          date: new Date(gameData[i].t),
          first_name: gameData[i].playerA.name,
          first_played: gameData[i].playerA.played,
          second_name: gameData[i].playerB.name,
          second_played: gameData[i].playerB.played,
        }
      }
      insertUtil('games', gameData, 'id')

      // Update the player list if needed.
      if (newPlayers !== []) {

        players.concat(newPlayers)

        for (let i = 0; i < newPlayers.length; i++) {
          newPlayers[i] = {name: newPlayers[i]}
        }

        insertUtil('players', newPlayers, 'name')
      }
    }

    // Set the next url for continue fetching
    if (cursor) { endpoint = cursor}
    else { break }
  }
}
