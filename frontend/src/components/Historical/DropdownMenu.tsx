import { useState, Fragment, Dispatch, SetStateAction } from 'react'
import { Autocomplete, TextField, CircularProgress } from '@mui/material'

interface propTypes {
  players: string[],
  selected: string | null,
  setSelected: Dispatch<SetStateAction<string | null>>
}

export default function DropdownMenu({ players, selected, setSelected }: propTypes) {
  const [inputValue, setInputValue] = useState('')

  const loadingMenu = (
    <TextField
      disabled
      placeholder='Loading'
      sx={{ width: 400, padding: '3em 0' }}
      InputProps={{ endAdornment: (<Fragment>{<CircularProgress color="inherit" size={20} />}</Fragment>), }}
    />
  )

  const menu = (
    <Autocomplete
      options={players}
      value={selected}
      onChange={(_, newValue) => setSelected(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      sx={{ width: 400, padding: '3em 0' }}
      renderInput={params => (<TextField {...params} label="Player" />)}
    />
  )

  return players.length === 0 ? loadingMenu : menu
}
