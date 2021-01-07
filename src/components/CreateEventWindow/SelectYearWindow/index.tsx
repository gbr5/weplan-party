import React, { useCallback, useState } from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, BooleanButton, NextButton, PreviousButton } from './styles';

interface IProps {
  closeWindow: Function;
  selectYear: Function;
  changeWindow: Function;
}

const SelectYearWindow: React.FC<IProps> = ({
  closeWindow,
  selectYear,
  changeWindow,
}: IProps) => {
  const [yearOne, setYearOne] = useState(false);
  const [yearTwo, setYearTwo] = useState(false);
  const [yearTree, setYearThree] = useState(false);
  const [yearFour, setYearFour] = useState(false);
  const [yearFive, setYearFive] = useState(false);
  const [yearSix, setYearSix] = useState(false);
  const [yearSeven, setYearSeven] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const today = new Date();
  const thisYear = today.getFullYear();

  const secondYear = thisYear + 1;
  const thirdYear = secondYear + 1;
  const fourthYear = thirdYear + 1;
  const fifthYear = fourthYear + 1;
  const sixthYear = fifthYear + 1;
  const seventhYear = sixthYear + 1;

  const unSelectAll = useCallback(() => {
    setYearOne(false);
    setYearTwo(false);
    setYearThree(false);
    setYearFour(false);
    setYearFive(false);
    setYearSix(false);
    setYearSeven(false);
  }, []);

  const handleSelectYear = useCallback(
    (props: number) => {
      unSelectAll();
      selectYear(props);
      props === thisYear && setYearOne(true);
      props === secondYear && setYearTwo(true);
      props === thirdYear && setYearThree(true);
      props === fourthYear && setYearFour(true);
      props === fifthYear && setYearFive(true);
      props === sixthYear && setYearSix(true);
      props === seventhYear && setYearSeven(true);
      setNextButton(true);
    },
    [
      selectYear,
      unSelectAll,
      thisYear,
      secondYear,
      thirdYear,
      fourthYear,
      fifthYear,
      sixthYear,
      seventhYear,
    ],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 30,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <h2>Selecione 1 ano</h2>
        <BooleanButton
          isActive={yearOne}
          type="button"
          onClick={() => handleSelectYear(thisYear)}
        >
          {thisYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearTwo}
          type="button"
          onClick={() => handleSelectYear(secondYear)}
        >
          {secondYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearTree}
          type="button"
          onClick={() => handleSelectYear(thirdYear)}
        >
          {thirdYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearFour}
          type="button"
          onClick={() => handleSelectYear(fourthYear)}
        >
          {fourthYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearFive}
          type="button"
          onClick={() => handleSelectYear(fifthYear)}
        >
          {fifthYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearSix}
          type="button"
          onClick={() => handleSelectYear(sixthYear)}
        >
          {sixthYear}
        </BooleanButton>
        <BooleanButton
          isActive={yearSeven}
          type="button"
          onClick={() => handleSelectYear(seventhYear)}
        >
          {seventhYear}
        </BooleanButton>
        <div>
          <PreviousButton type="button" onClick={() => changeWindow('3')}>
            Anterior
          </PreviousButton>
          {nextButton && (
            <NextButton type="button" onClick={() => changeWindow('5')}>
              Próximo
            </NextButton>
          )}
        </div>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectYearWindow;
