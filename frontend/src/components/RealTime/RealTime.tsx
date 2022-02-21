import { useEffect, useReducer } from 'react'
import { Typography } from '@mui/material'

import type { game } from '../../utils/types'
import gameDataReducer from '../../gameDataReducer'
import Result from './Result'

const wsUrl = process.env.REACT_APP_WS_URL || (() => {throw new Error('Cannot load WebSockets URL.')})()

const reducerInit = {ongoing: [], finished: [], gameIds: new Set<string>()}

export default function RealTime() {
  const [gamesData, dispatch] = useReducer(gameDataReducer, reducerInit)

  const { ongoing, finished } = gamesData

  useEffect(() => {
    const webSocket = new WebSocket(wsUrl)

    webSocket.onmessage = e => {
      if (e.data) {
        // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
        const parsedData = JSON.parse(JSON.parse(e.data))

        const { type, ...data } = parsedData

        dispatch({ type: type, payload: data})
      }
    }
  }, [dispatch])

  const buildGameList = (games: game[]) => {
    let list: JSX.Element[] = []

    if (games[0]) {
      games[0].playerA.played ?
        games.forEach(game => list.push(<Result key={game.gameId} game={game}/>))
      :
        games.forEach(game => list.push(
          <Typography key={game.gameId} sx={{marginBottom: '0.5em'}}>
            {game.playerA.name} vs. {game.playerB.name}
          </Typography>
        ))
    }

    return list
  }

  return (
    <div>

      <div style={{minHeight: '13em'}}>
        <Typography variant='h6' color='red'>Live Games</Typography>
        {buildGameList(ongoing)}
      </div>

      <Typography variant='h6' color='red'>Recently Finished Games</Typography>
      {buildGameList(finished)}

    </div>)
}
