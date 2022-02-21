import { useState, useEffect } from 'react'
import { Card, CardContent, CardActions, Typography } from '@mui/material'

import PlayerDataDialog from './PlayerDataDialog'
import { getPlayerStats } from '../../../utils/statsUtils'
import type { gameHistorical } from '../../../utils/types'

interface propTypes {
  player: string | null
}

// This component will display a card with a selected player's details.
export default function PlayerCard({ player }: propTypes) {
  const [playerData, setPlayerData] = useState<gameHistorical[] | null>(null)

  useEffect(() => {
    if (player) {
      fetch('/data?name=' + player)
        .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
        .then(data => setPlayerData(data))
        .catch(err => console.log(err))
    }
  }, [player])

  if (player && playerData) {
    const playerStats = getPlayerStats(player, playerData)

    // Handling many values for most played hand.
    const mostPlayed = () => {
      if (typeof playerStats.mostPlayed === 'string') {
        return playerStats.mostPlayed
      } else {
        let hands = ''
        for (let i = 0; i < playerStats.mostPlayed.length; i++) {
          hands = (i === 0) ? playerStats.mostPlayed[i] : (hands + ', ' + playerStats.mostPlayed[i])
        }
        return hands
      }
    }

    return (
      <Card sx={{width: '26em', height: '20em', borderRadius: '1.2em', backgroundColor: 'lightcyan'}}>

        <CardContent sx={{padding: '2.6em 2em 2em 1em'}}>
          <Typography variant='h4' sx={{paddingBottom: '0.7em'}}>{player}</Typography>
          <Typography variant='h6'>Total games played: {playerStats.gameCount}</Typography>
          <Typography variant='h6'>Win Ratio: {playerStats.winRatio}</Typography>
          <Typography variant='h6'>Most played hand: {mostPlayed()}</Typography>
        </CardContent>

        <CardActions>
          <PlayerDataDialog playerData={playerData} />
        </CardActions>

      </Card>
    )
  } else {
    return null
  }
}
