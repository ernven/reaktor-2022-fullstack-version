import type { gameHistorical } from '@utils/types'

export const getPlayerStats = (player: string, data: gameHistorical[]) => {

  // Let's store here just the data we need now. We could have all the win, losses and ties, or even more stats.
  const total = data.length

  let wins = 0

  // Saving the counts of what has been played to an array.
  let handsCount = [{name: 'Rock', count: 0}, {name: 'Paper', count: 0}, {name: 'Scissors', count: 0}]

  for (let i = 0; i < total; i++) {
    // Analyze the game if our selected player has been found.
    if (data[i].first_name === player) {

      const outcome = getGameOutcome(data[i].first_played, data[i].second_played)

      // If outcome === 1, means the first player input (our found one) won the match.
      // At the moment we don't need losses nor ties.
      if (outcome === 1) { wins++ }

      keepCount(data[i].first_played, handsCount)

    } else if (data[i].second_name === player) {
      
      const outcome = getGameOutcome(data[i].second_played, data[i].first_played)

      if (outcome === 1) { wins++ }

      keepCount(data[i].first_played, handsCount)
    }
  }

  const mostPlayed = getMostFrequentHand(handsCount)

  // Win ratio rounded to 3 decimals.
  const winRatio = Math.round((wins / total) * 1000) / 1000

  const playerStats = {gameCount: total, winRatio: winRatio, mostPlayed: mostPlayed}

  return playerStats
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
      return null
  }
}

interface choiceCount {
  name: string,
  count: number
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
