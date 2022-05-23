import React from 'react';
import { render, RenderResult, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

let calculator : RenderResult;
let one : Element;
let two : Element;
let three : Element;
let four : Element;
let five : Element;
let multiple : Element;
let plus : Element;
let minus : Element;
let equal : Element;
let leftParenthesis : Element;
let rightParenthesis : Element;
let backButton : Element;
let forwardButton : Element;
let plusMinusButton : Element;

beforeEach(() => {
  calculator = render(<Calculator />);
  one = calculator.container.querySelector('#key_1') as Element;
  two = calculator.container.querySelector('#key_2') as Element;
  three = calculator.container.querySelector('#key_3') as Element;
  four = calculator.container.querySelector('#key_4') as Element;
  five = calculator.container.querySelector('#key_5') as Element;
  multiple = calculator.container.querySelector('#key_\\x') as Element;
  plus = calculator.container.querySelector('#key_\\+') as Element;
  minus = calculator.container.querySelector('#key_\\-') as Element;
  equal = calculator.container.querySelector('#key_\\=') as Element;
  leftParenthesis = calculator.container.querySelector('#key_\\(') as Element;
  rightParenthesis = calculator.container.querySelector('#key_\\)') as Element;
  backButton = calculator.container.querySelector('#back') as Element;
  forwardButton = calculator.container.querySelector('#forward') as Element;
  plusMinusButton = calculator.container.querySelector('#key_\\+\\/\\-') as Element;
})

describe('Calculator', () => {
  describe('simple calculation', () => {
    test('2+3', async () => {
      const clicks = [two, plus, three, equal];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('5');
      expect(historyLine).toBe('2+3');
    });
    test('4x5', async () => {
      const clicks = [four, multiple, five, equal];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('20');
      expect(historyLine).toBe('4x5');
    });
    test('11x11', async () => {
      const clicks = [one, one, multiple, one, one, equal];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('121');
      expect(historyLine).toBe('11x11');
    });
  });

  describe('priority', () => {
    test('2+3x5', async () => {
      const clicks = [two, plus, three, multiple, five, equal];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('17');
      expect(historyLine).toBe('2+3x5');
    });
    test('(2+3)x5', async () => {
      const clicks = [leftParenthesis, two, plus, three, rightParenthesis, multiple, five, equal];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('25');
      expect(historyLine).toBe('(2+3)x5');
    });
  });

  describe('operations after new result', () => {
    test('number after result should replace result', async () => {
      const clicks = [two, plus, three, equal, two];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('2');
      expect(historyLine).toBe('2+3');
    });
    test('operator after result should continue operation', async () => {
      const clicks = [two, plus, three, equal, plus];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      const historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      expect(mainLine).toBe('5+');
      expect(historyLine).toBe('2+3');
    });
  });

  describe('navigation', () => {
    test('should navigate in history with back and forward', async () => {
      const clicks = [two, plus, three, equal, two, plus, two, equal];
      clicks.forEach(click => fireEvent.click(click));
      let mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      let historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      let pastLine = calculator.container.querySelector('.pastLine')?.innerHTML;
      expect(mainLine).toBe('4');
      expect(historyLine).toBe('2+2');
      expect(pastLine).toBe('2+3');
      fireEvent.click(backButton);
      mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      pastLine = calculator.container.querySelector('.pastLine')?.innerHTML;
      expect(mainLine).toBe('2+2');
      expect(historyLine).toBe('2+3');
      expect(pastLine).toBe('');
      fireEvent.click(forwardButton);
      mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      pastLine = calculator.container.querySelector('.pastLine')?.innerHTML;
      expect(mainLine).toBe('4');
      expect(historyLine).toBe('2+2');
      expect(pastLine).toBe('2+3');
    });
    test('should insert new calculation in history', async () => {
      const clicks = [two, plus, three, equal, two, plus, two, equal];
      clicks.forEach(click => fireEvent.click(click));
      let mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      let historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      let pastLine = calculator.container.querySelector('.pastLine')?.innerHTML;
      expect(mainLine).toBe('4');
      expect(historyLine).toBe('2+2');
      expect(pastLine).toBe('2+3');
      fireEvent.click(plus);
      fireEvent.click(two);
      fireEvent.click(equal);
      mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      historyLine = calculator.container.querySelector('.historyLine')?.innerHTML;
      pastLine = calculator.container.querySelector('.pastLine')?.innerHTML;
      expect(mainLine).toBe('6');
      expect(historyLine).toBe('4+2');
      expect(pastLine).toBe('2+2');
    });
  });

  describe('+/-', () => {
    test('should switch number sign', async () => {
      const clicks = [two, three, plusMinusButton];
      clicks.forEach(click => fireEvent.click(click));
      let mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('-23');
      fireEvent.click(plusMinusButton);
      mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('23');
    });
    test('should switch number sign after operator', async () => {
      const clicks = [two, multiple, three, plusMinusButton];
      clicks.forEach(click => fireEvent.click(click));
      let mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('2x-3');
      fireEvent.click(plusMinusButton);
      mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('2x3');
    });
  });

  describe('operator followed by operator', () => {
    test('should replace previous operator', async () => {
      const clicks = [two, three, multiple, plus];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('23+');
    });
    test('should keep previous operator if - after x | +', async () => {
      const clicks = [two, three, multiple, minus];
      clicks.forEach(click => fireEvent.click(click));
      const mainLine = calculator.container.querySelector('.mainLine')?.innerHTML;
      expect(mainLine).toBe('23x-');
    });
  });
});