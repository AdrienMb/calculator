import React, { useState } from 'react';
import logo from './logo.svg';
import CalculatorKeyboard from './calculatorKeyboard/CalculatorKeyboard';
import CalculatorScreen from './calculatorScreen/CalculatorScreen';
import { ArithmeticIO } from '../../types/calculator';

import './Calculator.scss'


function Calculator() {

  const [currentCalc, setCurrentCalc] = useState<ArithmeticIO[]>([]);
  const [resultHistory, setResultHistory] = useState<ArithmeticIO[][]>([]);
  const [resultIndex, setResultIndex] = useState<number>(0);

  const formatCalc = function (arithmeticIOs: ArithmeticIO[]) : string {
    let formattedCalc = '';
    arithmeticIOs.map(arithmeticIO => {
      formattedCalc += arithmeticIO.label;
    })
    return formattedCalc;
  }

  const getResult = function (arithmeticIOs: ArithmeticIO[]) : string {
    let formattedCalc = '';
    arithmeticIOs.map(arithmeticIO => {
      formattedCalc += arithmeticIO.value;
    })
    return eval(formattedCalc);
  }

  const handleClick = function (arithmeticIO: ArithmeticIO) : void {
    if(arithmeticIO.type === 'operand' || arithmeticIO.type === 'number') {
      setCurrentCalc(currentCalc.concat(arithmeticIO));
    } else if (arithmeticIO.type === 'action') {
      if (arithmeticIO.label === '=') {
        setResultHistory(resultHistory.concat([currentCalc]));
        setResultIndex(resultIndex + 1);
        const resultString = getResult(currentCalc);
        const resultArithmeticIO : ArithmeticIO = {
          label: resultString,
          value: resultString,
          type: 'number'
        }
        setCurrentCalc([resultArithmeticIO]);
      } else if (arithmeticIO.label === 'C') {
        setCurrentCalc([]);
      } else if (arithmeticIO.label === 'AC') {
        setResultHistory([]);
        setResultIndex(0);
        setCurrentCalc([]);
      }
    }
  }

  return (
    <div className='calculator'>
      <CalculatorScreen
        pastLine={resultHistory[resultIndex - 2] ? formatCalc(resultHistory[resultIndex - 2]) : ''}
        historyLine={resultHistory[resultIndex - 1] ? formatCalc(resultHistory[resultIndex - 1]) : ''}
        mainLine={formatCalc(currentCalc)} />
      <CalculatorKeyboard
        handleClick={handleClick}
        isCurrentCalcEmpty={currentCalc.length === 0} />
    </div>
  );
}

export default Calculator;
