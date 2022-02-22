import type { gameRealTime } from './utils/types'

type gameState = {
  ongoing: gameRealTime[],
  finished: gameRealTime[],
  gameIds: Set<string>
}

type action = {
  type: string,
  payload: gameRealTime
}

export default function gameDataReducer (state: gameState, action: action): gameState {
  const { type, payload } = action

  switch (type) {

    case 'GAME_BEGIN':
      const liveGames = state.ongoing

      // Double check to avoid adding repeats.
      if (!(liveGames.some(e => e.gameId === payload.gameId))) {
        liveGames.push(payload)
      }
      return {...state, ongoing: liveGames}

    case 'GAME_RESULT':
      return analyzeGameResult(state, payload)

    default:
      return state
  }
}

const analyzeGameResult = (state: gameState, game: gameRealTime) => {
  const ongoingGames = state.ongoing
  let finishedGames = state.finished

  // Remove the finished game from ongoing matches.
  ongoingGames.forEach((entry, index) => {
    if (entry.gameId === game.gameId) { ongoingGames.splice(index, 1) }
  })
  
  // Then add the finished game to the list of last results (5 entries max). Double check to avoid adding repeats.
  //if (!(finishedGames.some(e => e.gameId === game.gameId))) {

    if (finishedGames.length === 5) {
      finishedGames.splice(0,1)
    }

    finishedGames.push(game)
  //}

  if (!state.gameIds.has(game.gameId)) {
    const newGameIds = state.gameIds.add(game.gameId)

    return { ongoing: ongoingGames, finished: finishedGames, gameIds: newGameIds }
  }
    
  return { ...state, ongoing: ongoingGames, finished: finishedGames }
}