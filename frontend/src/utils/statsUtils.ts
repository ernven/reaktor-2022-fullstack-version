import type { gameHistorical } from './types'

type hand = {
  name: string,
  count: number
}

type choiceCount = {
  name: string,
  count: number
}

export const getPlayerStats = (player: string, data: gameHistorical[]) => {

  const numberOfGames = data.length

  let wins = 0

  const handsCount = [{name: 'Rock', count: 0}, {name: 'Paper', count: 0}, {name: 'Scissors', count: 0}]

  data.forEach(entry => {

    const outcome = analyzeGame(entry, player, handsCount)

    if (outcome === 1) { wins++ }

  })

  const mostPlayed = getMostFrequentHand(handsCount)

  const winRatio = Math.round((wins / numberOfGames) * 1000) / 1000

  return {gameCount: numberOfGames, winRatio: winRatio, mostPlayed: mostPlayed}
}

const analyzeGame = (game: gameHistorical, player: string, handsCount: hand[]) => {
  let outcome = -1

  if (game.first_name === player) {

    outcome = getGameOutcome(game.first_played, game.second_played)

    keepCount(game.first_played, handsCount)

  } else if (game.second_name === player) {
    
    outcome = getGameOutcome(game.second_played, game.first_played)

    keepCount(game.second_played, handsCount)
  }

  return outcome
}

// Returns 1 if player A won, 2 if player B won or 0 if the game was tied.
export const getGameOutcome = (handA: string, handB: string) => {
  switch (handA) {
    case 'ROCK':
      if (handB === 'SCISSORS') {
        return 1
      } else if (handB === 'PAPER') {
        return 2
      } else {
        return 0
      }
    case 'PAPER':
      if (handB === 'ROCK') {
        return 1
      } else if (handB === 'SCISSORS') {
        return 2
      } else {
        return 0
      }
    case 'SCISSORS':
      if (handB === 'PAPER') {
        return 1
      } else if (handB === 'ROCK') {
        return 2
      } else {
        return 0
      }
    default:
      return -1
  }
}

const keepCount = (played: string, handsCount: choiceCount[]) => {
  if (played === 'ROCK') { handsCount[0].count++ }
  else if (played === 'PAPER') { handsCount[1].count++ }
  else if (played === 'SCISSORS') { handsCount[2].count++ }
}

const getMostFrequentHand = (array: choiceCount[]) => {
  const sorted = array.sort((a, b) => b.count - a.count)

  // Dealing with entries tied for top spot.
  if (sorted[0].count === sorted[1].count) {
    return (sorted[1].count === sorted[2].count) ?
      [sorted[0].name, sorted[1].name, sorted[2].name] : [sorted[0].name, sorted[2].name]
  } else {
    return sorted[0].name
  }
}
