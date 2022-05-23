import React from "react";
import MainMenu from "../../../components/navigation/mainMenu/MainMenu";
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Button from "../../../components/inputs/button/Button";

import './CalculatorHeader.scss';

type Props = {
  backDisabled: boolean,
  onClickBack: () => void,
  forwardDisabled: boolean,
  onClickForward: () => void,
}

function CalculatorHeader({backDisabled, onClickBack, forwardDisabled, onClickForward} : Props) {
  return <div className="calculatorHeader">
    <div className='previousNextCalc'>
      <Button id='back' disabled={backDisabled} onClick={onClickBack}>
        <ArrowBack sx={{ fontSize: 32 }}/>
      </Button>
      <Button id='forward' disabled={forwardDisabled} onClick={onClickForward}>
        <ArrowForward sx={{ fontSize: 32 }} />
      </Button>
    </div>
    <MainMenu />
  </div>
}

export default CalculatorHeader;