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
        top: '30%',
        left: '10%',
        height: '30%',
        width: '80%',
      }}
    >
      {timeWindow && (
        <SetTimeWindow
          closeWindow={() => setTimeWindow(false)}
          setTime={(e: string) => handleThenFunction(e)}
          containerStyle={{
            zIndex: 15,
            top: '30%',
            left: '10%',
            height: '30%',
            width: '80%',
          }}
          message="Defina o horário"
        />
      )}
      <Container>
        <h1>Defina a data</h1>

        <Input
          pattern="\d*"
          onChange={e => setUpdatedDate(e.target.value)}
          mask="brlDateFormat"
          placeholder={dateToFormattedDate(String(new Date()))}
          name="date"
          type="text"
          containerStyle={{
            width: '128px',
            height: '40px',
          }}
        />
        {updatedDate !== '' && (
          <button type="button" onClick={() => setTimeWindow(true)}>
            Salvar
          </button>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SetDateWindow;
