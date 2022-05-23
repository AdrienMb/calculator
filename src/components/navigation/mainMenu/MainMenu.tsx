import React, { useState, useEffect, useRef } from 'react';
import { Menu, WbSunny, Bedtime, Close } from '@mui/icons-material';
import Button from '../../inputs/button/Button';
import ThemeContext from '../../../contexts/ThemeContext';
import IconToggle from '../../inputs/iconToggle/IconToggle';

import { Theme } from '../../../types/ui';

import './MainMenu.scss';

function MainMenu() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return <div ref={menuRef} className={`mainMenu ${isMenuOpen ? 'menuOpen' : ''}`}>
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
                  <a href='https://github.com/AdrienMb/calculator' target='_blank' rel='noreferrer'>Github</a>
                </div>
                <div className='menuLink'>
                  <a href='https://www.figma.com/file/ZhvRR566vwI7AgaV8UZD6Y/calc?node-id=8%3A29' target={'_blank'} rel='noreferrer'>Figma</a>
                </div>
              </div>
            </>
          }}
       </ThemeContext.Consumer>
        </div> : null}

  </div>
}

export default MainMenu;