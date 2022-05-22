import React from 'react';
import './IconToggle.scss';

type Props = {
  value: 'first' | 'second',
  firstIcon: React.ReactNode,
  secondIcon: React.ReactNode,
  onClick: (value: 'first' | 'second') => void,
}

function IconToggle({ value, firstIcon, secondIcon, onClick} : Props) {
  return <div className='iconToggle'>
    <div className={`first ${value === 'first' ? 'isSelected' : ''}`} onClick={() => onClick('first')} >
      {firstIcon}
    </div>
    <div className='seperator'></div>
    <div className={`second ${value === 'second' ? 'isSelected' : ''}`} onClick={() => onClick('second')}>
      {secondIcon}
    </div>
  </div>
}

export default IconToggle;