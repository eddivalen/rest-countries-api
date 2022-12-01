import React, { useContext, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = (theme) => {
    setTheme({theme});
  }

  useEffect( () => {
    if(theme.theme === 'light'){
      document.body.classList.add('light');
    }
    if(theme.theme === 'dark'){
      document.body.classList.remove('light');
    }
  },[theme]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className='header__wrapper__title'>
          <h1>Where in the world?</h1>
        </div>
        <div className='header__wrapper__theme-switcher' onClick={ () => switchTheme( theme.theme === 'dark' ? 'light' : 'dark')}>
            <FontAwesomeIcon icon={theme.theme === 'dark' ? faMoon : faSun}/>  {theme.theme === 'dark' ? 'Dark mode' : 'Light mode'}
        </div>
      </div>
    </header>
  )
}

export default Header;