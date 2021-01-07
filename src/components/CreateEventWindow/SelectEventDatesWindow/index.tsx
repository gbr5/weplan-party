import React, { useCallback, useState } from 'react';
import formatDateToString from '../../../utils/formatDateToString';
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

const SelectEventDatesWindow: React.FC<IProps> = ({
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
        <h2>Selecione os meses de interesse</h2>
        <MonthContainer>
          {selectedPossibleEventDates.length > 0 &&
            selectedPossibleEventDates.map(date => {
              const isActive = selectedEventDates.find(xDate => xDate === date);
              const milliseconds = date.getMilliseconds();
              const seconds = date.getSeconds();
              const key = `${date}-${seconds}-${milliseconds}`;
              return (
                <BooleanButton
                  key={key}
                  isActive={!!isActive}
                  type="button"
                  onClick={() => handleSelectedDates(date)}
                >
                  {formatDateToString(String(date))}
                </BooleanButton>
              );
            })}
        </MonthContainer>
        <footer>
          <PreviousButton type="button" onClick={() => changeWindow('5')}>
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

export default SelectEventDatesWindow;
