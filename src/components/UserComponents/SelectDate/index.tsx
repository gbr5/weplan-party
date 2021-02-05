import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import dateToFormattedDate from '../../../utils/dateToFormattedDate';
import Input from '../../Input';
import SetTimeWindow from '../../SetTimeWindow';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  selectDate: Function;
  closeWindow: Function;
}

const SelectDate: React.FC<IProps> = ({ selectDate, closeWindow }: IProps) => {
  const formRef = useRef<FormHandles>(null);

  const [timeWindow, setTimeWindow] = useState(false);
  const [time, setTime] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const handleSubmit = useCallback(async () => {
    if (updatedDate.length >= 8 && time.length >= 5) {
      const day = `${updatedDate.split('')[0]}${updatedDate.split('')[1]}`;
      const month = `${updatedDate.split('')[2]}${updatedDate.split('')[3]}`;
      const year = `${updatedDate.split('')[4]}${updatedDate.split('')[5]}${
        updatedDate.split('')[6]
      }${updatedDate.split('')[7]}`;
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];
      const date = new Date(`${Number(month)}/${Number(day)}/${Number(year)}`);
      date.setHours(Number(hour));
      date.setMinutes(Number(minute));
      selectDate(date);
      closeWindow();
      setTimeWindow(false);
    }
  }, [closeWindow, time, updatedDate, selectDate]);

  const handleSetTime = useCallback(
    (props: string) => {
      setTime(props);
      handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 14,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h1>Defina a data</h1>
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
          {updatedDate.length >= 8 && !!timeWindow && (
            <SetTimeWindow
              closeWindow={() => setTimeWindow(false)}
              setTime={(e: string) => handleSetTime(e)}
              containerStyle={{
                zIndex: 15,
                top: '0%',
                left: '0%',
                height: '100%',
                width: '100%',
              }}
              message="Defina o horário"
            />
          )}
          {updatedDate.length >= 8 && (
            <button type="button" onClick={() => setTimeWindow(true)}>
              Próximo
            </button>
          )}
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default SelectDate;
