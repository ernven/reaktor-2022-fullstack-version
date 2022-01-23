import { AppBar, Toolbar, Typography } from '@mui/material'

export default function Header() {

  return (
    <AppBar position='static' sx={{backgroundColor: 'chocolate'}}>
      <Toolbar>
        <Typography variant='h5'>
          Rock, Paper, Scissors App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}