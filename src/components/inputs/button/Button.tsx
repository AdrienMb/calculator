import React from 'react';
import { InputColors } from '../../../types/ui';
import './Button.scss';

type Props = {
  id?: string,
  children?: React.ReactNode;
  disabled?: boolean,
  onClick?: () => void,
  color?: InputColors;
};

function Button({ id, children, onClick, disabled, color } : Props) {
  return <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className={`button ${color || ''} ${disabled ? 'disabled' : ''}`}>
        {children}
      </button>
}

export default Button;