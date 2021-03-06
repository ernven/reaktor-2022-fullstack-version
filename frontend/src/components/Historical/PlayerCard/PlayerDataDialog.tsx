import { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import PlayerDataTable from './PlayerDataTable'

import type { gameHistorical } from '../../../utils/types'

interface propTypes {
  playerData: gameHistorical[]
}

export default function PlayerDataList({ playerData }: propTypes) {
  const [open, setOpen] = useState(false)
  
  // These are used to make the dialog box responsive.
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div style={{width: '100%'}}>
      <Button onClick={()=>setOpen(true)} variant='contained' disableElevation>
        Show full history
      </Button>

      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        fullScreen={fullScreen}
        maxWidth='lg'
      >
        <div style={{display: 'inherit'}}>
          <DialogTitle sx={{marginLeft: '35%'}}>Games History</DialogTitle>
          <DialogActions sx={{marginLeft: 'auto'}}>
            <IconButton onClick={()=>setOpen(false)} color='error'>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <PlayerDataTable data={playerData} />
        </DialogContent>
      </Dialog>

    </div>

  )
}