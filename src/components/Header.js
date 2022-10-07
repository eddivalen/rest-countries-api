import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  return (
    <>
    <header className="header">
      <div className="header__wrapper">
        <div className='header__wrapper__title'>
          <h1>Where in the world?</h1>
        </div>
        <div className='header__wrapper__theme-switcher'>
        <FontAwesomeIcon icon={faMoon}/>  Dark Mode
        </div>
      </div>
    </header>
    
    </>
  )
}

export default Header