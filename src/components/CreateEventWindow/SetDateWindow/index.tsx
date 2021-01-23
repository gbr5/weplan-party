import React, { useCallback, useState } from 'react';
import dateToFormattedDate from '../../../utils/dateToFormattedDate';
import Input from '../../Input';
import SetTimeWindow from '../../SetTimeWindow';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IFormData {
  date: string;
}

interface IProps {
  closeWindow: Function;
  thenFunction: Function;
}

const SetDateWindow: React.FC<IProps> = ({
  thenFunction,
  closeWindow,
}: IProps) => {
  const [timeWindow, setTimeWindow] = useState(false);
  const [updatedDate, setUpdatedDate] = useState('');

  const handleThenFunction = useCallback(
    (props: string) => {
      const day = `${updatedDate.split('')[0]}${updatedDate.split('')[1]}`;
      const month = `${updatedDate.split('')[2]}${updatedDate.split('')[3]}`;
      const year = `${updatedDate.split('')[4]}${updatedDate.split('')[5]}${
        updatedDate.split('')[6]
      }${updatedDate.split('')[7]}`;
      const hour = props.split(':')[0];
      const minute = props.split(':')[1];
      const date = new Date(`${Number(month)}/${Number(day)}/${Number(year)}`);

      date.setHours(Number(hour));
      date.setMinutes(Number(minute));
      thenFunction(String(date));
    },
    [thenFunction, updatedDate],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      {timeWindow && (
        <SetTimeWindow
          closeWindow={() => setTimeWindow(false)}
          setTime={(e: string) => handleThenFunction(e)}
          containerStyle={{
            zIndex: 15,
            top: '0%',
            left: '0%',
            height: '100%',
            width: '100%',
          }}
          message="Que horas começa?"
        />
      )}
      <Container>
        <h1>Dia do evento</h1>

        <p>Dia/Mês/Ano</p>

        <Input
          onChange={e => setUpdatedDate(e.target.value)}
          mask="brlDateFormat"
          placeholder={dateToFormattedDate(String(new Date()))}
          name="date"
          type="text"
          pattern="\d*"
          containerStyle={{
            width: '128px',
            height: '40px',
          }}
        />
        {updatedDate !== '' && (
          <button type="button" onClick={() => setTimeWindow(true)}>
            Próximo
          </button>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SetDateWindow;
