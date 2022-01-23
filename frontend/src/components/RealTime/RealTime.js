import { useEffect, useReducer } from 'react'
import { Typography } from '@mui/material'

import dataReducer from '../../dataReducer'
import Result from './Result'

// Our initial state.
const reducerInit = {ongoing: [], finished: [], gameIds: new Set()}

export default function RealTime() {
  // Our reducer holding the live data.
  const [gamesData, dispatch] = useReducer(dataReducer, reducerInit)

  const { ongoing, finished } = gamesData

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WS_URL)

    webSocket.onmessage = e => {
      if (e.data) {
        // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
        const parsedData = JSON.parse(JSON.parse(e.data))

        // Let's get the type straight from the source.
        const { type, ...data } = parsedData

        // Once we have the data ready and in good form, dispatch the action to the reducer.
        dispatch({ type: type, payload: data})
      }
    }
  }, [dispatch])

  // This function builds a list of matches for display.
  const buildGameList = games => {
    let list = []

    if (games[0]) {
      if (games[0].playerA.played) {
        games.forEach(game => list.push(<Result key={game.gameId} game={game}/>))
      }
      else {
        games.forEach(game => list.push(
          <Typography key={game.gameId} sx={{marginBottom: '0.5em'}}>
            {game.playerA.name} vs. {game.playerB.name}
          </Typography>
        ))
      }
    }
    return list
  }

  return (
    <div style={{minHeight: '30vh'}}>

      <div style={{minHeight: '18em'}}>
        <Typography variant='h6' color='red'>Live Games</Typography>
        {buildGameList(ongoing)}
      </div>

      <Typography variant='h6' color='red'>Recently Finished Games</Typography>
      {buildGameList(finished)}

    </div>)
}
