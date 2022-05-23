import React, { useState } from 'react';
import CalculatorKeyboard from './calculatorKeyboard/CalculatorKeyboard';
import CalculatorScreen from './calculatorScreen/CalculatorScreen';
import CalculatorHeader from './calculatorHeader/CalculatorHeader';
import { ArithmeticIO } from '../../types/calculator';

import './Calculator.scss'


function Calculator() {

  const [resultHistory, setResultHistory] = useState<ArithmeticIO[][]>([[]]);
  const [resultIndex, setResultIndex] = useState<number>(0);
  const [isNewResult, setIsNewResult] = useState<boolean>(true);

  const formatCalc = function (arithmeticIOs: ArithmeticIO[]) : string {
    let formattedCalc = '';
    arithmeticIOs.forEach(arithmeticIO => {
      formattedCalc += arithmeticIO.label;
    })
    return formattedCalc;
  }

  const getResult = function (arithmeticIOs: ArithmeticIO[]) : string {
    let formattedCalc = '';
    if(arithmeticIOs[0].type === 'operator') {
      arithmeticIOs = [{
        label: '0',
        value: '0',
        type: 'number'
      }].concat(arithmeticIOs);
    }
    arithmeticIOs.forEach(arithmeticIO => {
      formattedCalc += arithmeticIO.value;
    })
    setIsNewResult(true);
    return (Math.round(eval(formattedCalc)* 10000000) / 10000000).toString();
  }

  const handleClick = function (arithmeticIO: ArithmeticIO) : void {
    let newResultHistory = [...resultHistory];
    let currentCalc = newResultHistory[resultIndex];
    const previousChar = currentCalc[newResultHistory[resultIndex].length - 1];
    let _isNewResult = isNewResult;
    if(_isNewResult) {
      setIsNewResult(false);
    }
    switch(arithmeticIO.type) {
      case 'number': {
        if(_isNewResult) {
          newResultHistory[resultIndex] = [arithmeticIO];
          setResultHistory(newResultHistory);
          setIsNewResult(false);
        } else {
          newResultHistory[resultIndex].push(arithmeticIO);
          setResultHistory(newResultHistory);
        }
        break;
      }
      case 'operator': {
        if(previousChar && previousChar.type === 'operator' && !((previousChar.label === 'x' || previousChar.label === '/') && arithmeticIO.label === '-')) {
          newResultHistory[resultIndex] = currentCalc.slice(0, currentCalc.length - 1);
        }
        newResultHistory[resultIndex].push(arithmeticIO);
        setResultHistory(newResultHistory);
        break;
      }
      case 'action': {
        switch(arithmeticIO.label) {
          case '=': {
            const resultString = getResult(resultHistory[resultIndex]);
            const resultArithmeticIO : ArithmeticIO = {
              label: resultString,
              value: resultString,
              type: 'number'
            }
            newResultHistory.splice(resultIndex+1, 0, [resultArithmeticIO]);
            setResultHistory(newResultHistory);
            setResultIndex(resultIndex + 1);
            break;
          }
          case 'C': {
            newResultHistory[resultIndex] = [];
            setResultHistory(newResultHistory);
            break;
          }
          case 'AC': {
            setResultIndex(0);
            setResultHistory([[]]);
            break;
          }
          case '+/-': {
            if(previousChar && previousChar.value === '-') {
              newResultHistory[resultIndex] = currentCalc.slice(0, currentCalc.length - 1);
            } else if(previousChar && previousChar.type === 'number') {
              let startNumberIndex = 0;
              for(let i = currentCalc.length - 1; i >= 0 ; i--) {
                if(currentCalc[i].type !== 'number') {
                  startNumberIndex = i;
                  break;
                }
              }
              if(currentCalc[startNumberIndex].value === '-') {
                currentCalc = currentCalc.splice(startNumberIndex, 1);
              } else if (currentCalc[startNumberIndex].type === 'operator') {
                currentCalc = currentCalc.splice(startNumberIndex + 1, 0, {label: '-', value: '-', type: 'operator'});
              } else {
                currentCalc = currentCalc.splice(startNumberIndex, 0, {label: '-', value: '-', type: 'operator'});
              }
            } else {
              newResultHistory[resultIndex].push({
                label: '-',
                value: '-',
                type: 'operator'
              })
            }
            setResultHistory(newResultHistory);
            break;
          }
        }
      }
    }
  }

  return (
    <div className='calculator'>
      <CalculatorHeader
        backDisabled={resultIndex <= 0}
        onClickBack={() => setResultIndex(resultIndex - 1)}
        forwardDisabled={resultIndex >= resultHistory.length -1}
        onClickForward={() => setResultIndex(resultIndex + 1)} />
      <div className='calculatorBody'>
        <CalculatorScreen
          pastLine={resultHistory[resultIndex - 2] ? formatCalc(resultHistory[resultIndex - 2]) : ''}
          historyLine={resultHistory[resultIndex - 1] ? formatCalc(resultHistory[resultIndex - 1]) : ''}
          mainLine={resultHistory[resultIndex] ? formatCalc(resultHistory[resultIndex]) : ''} />
        <CalculatorKeyboard
          handleClick={handleClick}
          isCurrentCalcEmpty={resultHistory[resultIndex]?.length === 0} />
      </div>
    </div>
  );
}

export default Calculator;
