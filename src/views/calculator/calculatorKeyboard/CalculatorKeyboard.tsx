import React, { useEffect } from 'react';
import Button from '../../../components/inputs/button/Button';
import { ArithmeticIO } from '../../../types/calculator';

import './CalculatorKeyboard.scss';


type Props = {
  handleClick: (arithmeticIO: ArithmeticIO) => void,
  isCurrentCalcEmpty: boolean,
};

function CalculatorKeyboard({ handleClick, isCurrentCalcEmpty} : Props) {

  const firstRow : ArithmeticIO[] = [
    {label: '(', type: 'number', value: '(', inputColor: 'grey'},
    {label: ')', type: 'number', value: ')', inputColor: 'grey'},
    {label: '+/-', type: 'action', value: '+/-', inputColor: 'grey'},
    {label: isCurrentCalcEmpty ? 'AC' : 'C', type: 'action', value: isCurrentCalcEmpty ? 'AC' : 'C', inputColor: 'grey'}];

  const secondRow : ArithmeticIO[] = [
    {label: '7', type: 'number', value: '7', inputColor: 'default'},
    {label: '8', type: 'number', value: '8', inputColor: 'default'},
    {label: '9', type: 'number', value: '9', inputColor: 'default'},
    {label: '/', type: 'operator', value: '/', inputColor: 'grey'}];

  const thirdRow : ArithmeticIO[] = [
    {label: '4', type: 'number', value: '4', inputColor: 'default'},
    {label: '5', type: 'number', value: '5', inputColor: 'default'},
    {label: '6', type: 'number', value: '6', inputColor: 'default'},
    {label: 'x', type: 'operator', value: '*', inputColor: 'grey'}];

  const fourthRow : ArithmeticIO[] = [
    {label: '1', type: 'number', value: '1', inputColor: 'default'},
    {label: '2', type: 'number', value: '2', inputColor: 'default'},
    {label: '3', type: 'number', value: '3', inputColor: 'default'},
    {label: '-', type: 'operator', value: '-', inputColor: 'grey'}]

  const fithRow : ArithmeticIO[] = [
    {label: '0', type: 'number', value: '0', inputColor: 'default'},
    {label: '.', type: 'operator', value: '.', inputColor: 'default'},
    {label: '=', type: 'action', value: '=', inputColor: 'primary'},
    {label: '+', type: 'operator', value: '+', inputColor: 'grey'}];

  const keyboard : ArithmeticIO[][] = [firstRow, secondRow, thirdRow, fourthRow, fithRow];
  
  const allKeys : ArithmeticIO[] = firstRow.concat(secondRow).concat(thirdRow).concat(fourthRow).concat(fithRow);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      let key = allKeys.find(key => key.label === event.key);
      if(event.key === 'Enter') {
        key = {label: '=', type: 'action', value: '='};
      } else if (event.key === 'Backspace') {
        key = {label: isCurrentCalcEmpty ? 'AC' : 'C', type: 'action', value: isCurrentCalcEmpty ? 'AC' : 'C'};
      }
      console.log(key)
      if(key) {
        handleClick(key)
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleClick, allKeys, isCurrentCalcEmpty]);

  return (
    <div className='calculatorKeyboardWrapper'>
      <div className='calculatorKeyboard'>
        {keyboard.map((row: ArithmeticIO[], i: number) => row.map((arithmeticIO: ArithmeticIO) => 
            <Button
              id={`key_${arithmeticIO.label}`}
              key={arithmeticIO.label}
              color={arithmeticIO.inputColor}
              onClick={() => handleClick(arithmeticIO)}>
              {arithmeticIO.label}
            </Button>
          )
        )}
      </div>
      <div className='useKeyboardDesc'>
        <div className='separator'></div>
        <div className='text'>or use your keyboard</div>
        <div className='separator'></div>
      </div>
    </div>
  );
}

export default CalculatorKeyboard;
