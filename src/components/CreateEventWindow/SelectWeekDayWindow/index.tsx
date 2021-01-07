import React, { useCallback, useEffect, useState } from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, BooleanButton, NextButton, PreviousButton } from './styles';

interface IProps {
  closeWindow: Function;
  selectWeekDay: Function;
  changeWindow: Function;
}

const SelectWeekDayWindow: React.FC<IProps> = ({
  closeWindow,
  selectWeekDay,
  changeWindow,
}: IProps) => {
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    if (
      monday ||
      tuesday ||
      wednesday ||
      thursday ||
      friday ||
      saturday ||
      sunday
    ) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  const handleSelectDay = useCallback(
    (props: string) => {
      selectWeekDay(props);
      props === '1' && setMonday(!monday);
      props === '2' && setTuesday(!tuesday);
      props === '3' && setWednesday(!wednesday);
      props === '4' && setThursday(!thursday);
      props === '5' && setFriday(!friday);
      props === '6' && setSaturday(!saturday);
      props === '7' && setSunday(!sunday);
    },
    [
      selectWeekDay,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
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
        <h2>Selecione os dias de interesse</h2>
        <BooleanButton
          isActive={monday}
          type="button"
          onClick={() => handleSelectDay('1')}
        >
          Segunda
        </BooleanButton>
        <BooleanButton
          isActive={tuesday}
          type="button"
          onClick={() => handleSelectDay('2')}
        >
          Terça
        </BooleanButton>
        <BooleanButton
          isActive={wednesday}
          type="button"
          onClick={() => handleSelectDay('3')}
        >
          Quarta
        </BooleanButton>
        <BooleanButton
          isActive={thursday}
          type="button"
          onClick={() => handleSelectDay('4')}
        >
          Quinta
        </BooleanButton>
        <BooleanButton
          isActive={friday}
          type="button"
          onClick={() => handleSelectDay('5')}
        >
          Sexta
        </BooleanButton>
        <BooleanButton
          isActive={saturday}
          type="button"
          onClick={() => handleSelectDay('6')}
        >
          Sábado
        </BooleanButton>
        <BooleanButton
          isActive={sunday}
          type="button"
          onClick={() => handleSelectDay('7')}
        >
          Domingo
        </BooleanButton>
        <div>
          <PreviousButton type="button" onClick={() => changeWindow('2')}>
            Anterior
          </PreviousButton>
          {nextButton && (
            <NextButton type="button" onClick={() => changeWindow('4')}>
              Próximo
            </NextButton>
          )}
        </div>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectWeekDayWindow;
