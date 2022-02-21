import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

import DropdownMenu from './DropdownMenu'
import PlayerCard from './PlayerCard/PlayerCard'

import type { player } from '../../utils/types'

// This component (using the sub-components) should ask the user for a player and then show its details.
export default function Historical() {
  const [playerList, setPlayerList] = useState<string[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  useEffect(() => {
    fetch('/players')
      .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
      .then(data => {
        if (data) {
          const playerNames = data.map((i: player) => i.name)
          setPlayerList(playerNames)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Typography variant='h4' color='darkblue' >Historical Stats</Typography>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <DropdownMenu players={playerList} selected={selectedPlayer} setSelected={setSelectedPlayer} />

        <PlayerCard player={selectedPlayer} />

      </div>

    </div>
  )
}
