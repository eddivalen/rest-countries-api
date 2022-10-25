import React, { useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = (theme) => {
    setTheme(theme);
    document.body.classList.toggle('light');
  }
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className='header__wrapper__title'>
          <h1>Where in the world?</h1>
        </div>
        <div className='header__wrapper__theme-switcher' onClick={ () => switchTheme( theme === 'dark' ? 'light' : 'dark')}>
            <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun}/>  {theme === 'dark' ? 'Dark mode' : 'Light mode'}
        </div>
      </div>
    </header>
  )
}

export default Header