import React from "react";
import './CalculatorScreen.scss';

type Props = {
  pastLine: string,
  historyLine: string,
  mainLine: string,
}

function CalculatorScreen({pastLine, historyLine, mainLine} : Props) {
  return <div className="calculatorScreenWrapper">
    <div className="calculatorScreen">
      <div className="pastLine">
        { pastLine }
      </div>
      <div className="historyLine">
        { historyLine }
      </div>
      <div className="mainLine">
        { mainLine }
      </div>
    </div>
  </div>
}

export default CalculatorScreen;