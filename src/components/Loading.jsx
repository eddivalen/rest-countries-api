import React, { useContext} from 'react'
import ThemeContext from '../context/ThemeContext';

import { Waveform } from '@uiball/loaders'

const Loading = () => {
  const { theme } = useContext(ThemeContext);

  return <div style={{marginTop:'250px'}}><Waveform 
  size={40}
  lineWeight={3.5}
  speed={1} 
  color={theme.theme === 'dark' ? 'white' : 'black'} 
 /></div>
}

export default Loading;