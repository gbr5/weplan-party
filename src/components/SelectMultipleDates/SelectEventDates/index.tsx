import React, { useCallback, useState } from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import {
  Container,
  MonthContainer,
  BooleanButton,
  NextButton,
  PreviousButton,
} from './styles';

interface IProps {
  closeWindow: Function;
  selectEventDates: Function;
  changeWindow: Function;
  selectedPossibleEventDates: Date[];
}

const SelectEventDates: React.FC<IProps> = ({
  closeWindow,
  selectEventDates,
  changeWindow,
  selectedPossibleEventDates,
}: IProps) => {
  const [selectedEventDates, setSelectedEventDates] = useState(
    selectedPossibleEventDates,
  );

  const handleSelectedDates = useCallback(
    (props: Date) => {
      const updatedSelectedDates: Date[] = [];
      const xDate = selectedEventDates.find(date => date === props);

      if (xDate) {
        const xDates = selectedEventDates.filter(date => date === props);
        xDates.map(date => {
          updatedSelectedDates.push(date);
          return date;
        });
      } else {
        selectedEventDates.map(date => {
          updatedSelectedDates.push(date);
          updatedSelectedDates.push(props);
          return date;
        });
      }
      setSelectedEventDates(updatedSelectedDates);
    },
    [selectedEventDates],
  );

  const defineEventDates = useCallback(() => {
    selectEventDates(selectedEventDates);
    closeWindow();
  }, [selectedEventDates, selectEventDates, closeWindow]);

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
        <h2>Selecione as datas de interesse</h2>
        <MonthContainer>
          {selectedPossibleEventDates.length > 0 &&
            selectedPossibleEventDates.map(date => {
              const isActive = selectedEventDates.find(xDate => xDate === date);
              const weekDay = date.getDay();
              let day = '';
              if (weekDay === 0) {
                day = 'Domingo';
              } else if (weekDay === 1) {
                day = 'Segunda';
              } else if (weekDay === 2) {
                day = 'Terça';
              } else if (weekDay === 3) {
                day = 'Quarta';
              } else if (weekDay === 4) {
                day = 'Quinta';
              } else if (weekDay === 5) {
                day = 'Sexta';
              } else if (weekDay === 6) {
                day = 'Sábado';
              }
              const mDay = String(date.getDate());
              const month = String(date.getMonth() + 1);
              const formattedDate = `${day} - ${
                mDay.length === 1 ? `0${mDay}` : mDay
              }/${
                month.length === 1 ? `0${month}` : month
              }/${date.getFullYear()}`;
              return (
                <BooleanButton
                  key={formattedDate}
                  isActive={!!isActive}
                  type="button"
                  onClick={() => handleSelectedDates(date)}
                >
                  {formattedDate}
                </BooleanButton>
              );
            })}
        </MonthContainer>
        <footer>
          <PreviousButton type="button" onClick={() => changeWindow('4')}>
            Anterior
          </PreviousButton>
          <NextButton type="button" onClick={() => defineEventDates()}>
            Próximo
          </NextButton>
        </footer>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectEventDates;
