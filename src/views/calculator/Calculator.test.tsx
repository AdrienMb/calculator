import React from 'react';
import { render, RenderResult, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

test('test simple calculation', async () => {
  const calculator : RenderResult = render(<Calculator />);
  const twoButton = calculator.container.querySelector('#key_2');
  const threeButton = calculator.container.querySelector('#key_3');
  const plusButton = calculator.container.querySelector('#key_\\+');
  const equalButton = calculator.container.querySelector('#key_\\=');

  if(twoButton && threeButton && plusButton && equalButton) {
    fireEvent.click(twoButton);
    fireEvent.click(plusButton);
    fireEvent.click(threeButton);
    fireEvent.click(equalButton);
  }
  const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
  const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;

  expect(mainLine).toBe('5');
  expect(historyLine).toBe('2+3');
});
