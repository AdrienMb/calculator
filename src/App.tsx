import React, { useState, useEffect } from 'react';
import Calculator from './views/calculator/Calculator';
import ThemeContext from './contexts/ThemeContext';
import { Theme, ThemeColors } from './types/ui';

import './App.scss';


function App() {
  const [themeColor, setThemeColor] = useState<ThemeColors>('default');

  const theme : Theme = {
    theme: themeColor,
    changeTheme: setThemeColor,
  }

  useEffect(() => {
    if(themeColor === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app'>
        <Calculator />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
