import { Typography } from '@mui/material'

import { getGameOutcome } from '../../utils/statsUtils'
import type { gameRealTime } from '../../utils/types'

interface propTypes {
  key: string,
  game: gameRealTime
}

export default function Result({ game }: propTypes) {

  const result = getGameOutcome(game.playerA.played, game.playerB.played)

  let textResult

  if (result === 0) {
    textResult = 'It\'s a tie!'
  } else {
    const winner = result === 1 ? game.playerA.name : game.playerB.name
    textResult = 'Winner: ' + winner
  }

  return (
    <div>
      <Typography variant='body2' >
        {game.playerA.name + ' (' + game.playerA.played.toLowerCase() + ')'} vs. 
        {game.playerB.name + ' (' + game.playerB.played.toLowerCase() + ')'}
      </Typography>
      <Typography color='green'>
        {textResult}
      </Typography>
    </div>
  )
}
