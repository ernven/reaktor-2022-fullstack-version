import { Divider } from '@mui/material'

import RealTime from './RealTime/RealTime'
import Historical from './Historical/Historical'

import './Main.css'

export default function Main() {
  
  return (
    <div id='main-container'>
      <div id='live-container'>  
        <RealTime />
      </div>
      <Divider orientation='vertical' flexItem={true} />
      <div id='historical-container'>
        <Historical />  
      </div>
    </div>
  )
}
