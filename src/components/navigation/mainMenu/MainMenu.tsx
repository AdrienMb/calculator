import React, { useState } from 'react';
import { Menu, WbSunny, Bedtime, Close } from '@mui/icons-material';
import Button from '../../inputs/button/Button';
import ThemeContext from '../../../contexts/ThemeContext';
import IconToggle from '../../inputs/iconToggle/IconToggle';

import { Theme } from '../../../types/ui';

import './MainMenu.scss';

function MainMenu() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return <div className={`mainMenu ${isMenuOpen ? 'menuOpen' : ''}`}>
     {isMenuOpen ? null : <Button
        color='secondary'
        onClick={() => setIsMenuOpen(true)}>
        <Menu sx={{ fontSize: 32 }}/>
      </Button>}
      {isMenuOpen ? <div className='menuModal'>
          <ThemeContext.Consumer>
          {({theme, changeTheme}: Theme) => {
            return <>
              <div className='menuModalHeader'>
                <IconToggle 
                  firstIcon={<WbSunny sx={{ fontSize: 40 }}/>}
                  secondIcon={<Bedtime sx={{ fontSize: 40 }}/>}
                  value={theme === 'default' ? 'first' : 'second'}
                  onClick={(value) => {changeTheme(value === 'first' ? 'default' : 'dark')}}
                />
                <Button
                  color='primary'
                  onClick={() => setIsMenuOpen(false)}>
                  <Close sx={{ fontSize: 32 }}/>
                </Button>
              </div>
              <div className='separator'></div>
              <div className='menuLinks'>
                <div className='menuLabel'>
                  About
                </div>
                <div className='menuLink'>
                  <a href='#'>Github</a>
                </div>
                <div className='menuLink'>
                  <a href='#'>Figma</a>
                </div>
              </div>
              
              
            </>
          }}
       </ThemeContext.Consumer>
        </div> : null}

  </div>
}

export default MainMenu;