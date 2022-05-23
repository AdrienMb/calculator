import { createContext } from 'react';
import { Theme } from '../types/ui';

const defaultTheme : Theme = {theme: 'default', changeTheme: () => {}};

export default createContext(defaultTheme);