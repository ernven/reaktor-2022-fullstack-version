import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

import DropdownMenu from './DropdownMenu'
import PlayerCard from './PlayerCard/PlayerCard'

// This component (using the sub-components) should ask the user for a player and then show its details.
export default function Historical() {

  // A state holding the list of players for our dropdown menu to use.
  const [playerList, setPlayerList] = useState([])

  // A state for our currently selected player.
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/players')
      .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
      .then(data => {
        if (data) {
          const playerNames = data.map(i => i.name)
          setPlayerList(playerNames)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Typography variant='h4' color='darkblue' >Historical Stats</Typography>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <DropdownMenu players={playerList} selected={selected} setSelected={setSelected} />

        <PlayerCard player={selected} />

      </div>

    </div>
  )
}
