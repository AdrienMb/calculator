import React, { ReactNode } from 'react';
import './Button.scss';

type Props = {
  children?: React.ReactNode;
  disabled?: boolean,
  onClick?: () => void,
  color?: string;
  //'default' | 'grey' | 'blue'
};

function Button({ children, onClick, disabled, color } : Props) {
  return <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${color || ''}`}>
        {children}
      </button>
}

export default Button;