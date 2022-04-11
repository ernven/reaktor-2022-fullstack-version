import axios from 'axios'

import insertUtil from './insertUtil.js'
import type { gameBadAPI, gameDB } from './types.js'

const timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export default async function fetchGamesHistory() {
  const url = process.env.BAD_API_URL
  let endpoint = '/rps/history'
  const playerList: string[] = []
  
  while (true) {
    // Fetch requests go every 2 seconds as to not flood the API.
    const [res] = await Promise.all([axios.get(url + endpoint), timeout(2000)])

    const cursor = res.data.cursor
    const gameData = res.data.data

    let newPlayers: string[] = []

    if (gameData) {
      updateGamesHistory(gameData, playerList, newPlayers)
    }

    if (newPlayers !== []) {
      updatePlayerList(playerList, newPlayers)
    }

    if (cursor) { endpoint = cursor}
    else { break }
  }
}

function updateGamesHistory(gameData: gameBadAPI[], players: string[], newPlayers: string[]) {

  const dataToAdd: gameDB[] = []

  gameData.forEach(entry => {
    if (!players.includes(entry.playerA.name)) { newPlayers.push(entry.playerA.name) }
    if (!players.includes(entry.playerB.name)) { newPlayers.push(entry.playerB.name) }

    const game = buildGame(entry)

    if (game) {
      dataToAdd.push(game)
    }
  })

  insertUtil('games', dataToAdd, 'id')
}

function buildGame(entry: gameBadAPI) {
  if (entry.playerA.played && entry.playerB.played) {
    return {
      id: entry.gameId,
      date: new Date(entry.t),
      first_name: entry.playerA.name,
      first_played: entry.playerA.played,
      second_name: entry.playerB.name,
      second_played: entry.playerB.played,
    }
  }

  return null
}

function updatePlayerList(players: string[], newPlayers: string[]) {

  players.concat(newPlayers)

  const playersToAdd = newPlayers.map(playerName => ({name: playerName}))

  insertUtil('players', playersToAdd, 'name')
}
