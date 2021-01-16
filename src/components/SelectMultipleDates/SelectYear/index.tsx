import React, { useCallback } from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, BooleanButton } from './styles';

interface IProps {
  closeWindow: Function;
  selectYear: Function;
  changeWindow: Function;
}

const SelectYear: React.FC<IProps> = ({
  closeWindow,
  selectYear,
  changeWindow,
}: IProps) => {
  const today = new Date();
  const thisYear = today.getFullYear();

  const secondYear = thisYear + 1;
  const thirdYear = secondYear + 1;
  const fourthYear = thirdYear + 1;
  const fifthYear = fourthYear + 1;
  const sixthYear = fifthYear + 1;
  const seventhYear = sixthYear + 1;

  const handleSelectYear = useCallback(
    (props: number) => {
      selectYear(props);
      changeWindow('Month');
    },
    [changeWindow, selectYear],
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
        <h2>Selecione os anos de interesse</h2>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(thisYear)}
        >
          {thisYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(secondYear)}
        >
          {secondYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(thirdYear)}
        >
          {thirdYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(fourthYear)}
        >
          {fourthYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(fifthYear)}
        >
          {fifthYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(sixthYear)}
        >
          {sixthYear}
        </BooleanButton>
        <BooleanButton
          isActive
          type="button"
          onClick={() => handleSelectYear(seventhYear)}
        >
          {seventhYear}
        </BooleanButton>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectYear;
