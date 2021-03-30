import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, RollContainer } from './styles';

interface IContainerStyleDTO {
  zIndex: number;
  top: string;
  left: string;
  height: string;
  width: string;
  position?: string;
}

interface IProps {
  setTime: Function;
  closeWindow: Function;
  message: string;
  containerStyle: IContainerStyleDTO;
}

interface IFormData {
  hour: string;
  minutes: string;
}

const SetTimeWindow: React.FC<IProps> = ({
  setTime,
  message,
  closeWindow,
  containerStyle,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const [startMinute, setStartMinute] = useState('');
  const [startHour, setStartHour] = useState('');
  const handleSubmit = useCallback(() => {
    let hour = startHour;
    if (startHour.length === 0) {
      hour = '00';
    } else if (startHour.length === 1) {
      hour = `0${startHour}`;
    }
    let minute = startMinute;
    if (startMinute.length === 0) {
      minute = '00';
    } else if (startMinute.length === 1) {
      minute = `0${startMinute}`;
    }
    const time = `${hour}:${minute}`;
    setTime(time);
  }, [setTime, startHour, startMinute]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={containerStyle}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>{message}</h2>
          <RollContainer>
            <Input
              mask="hour"
              pattern="\d*"
              defaultValue={startHour !== '' ? '00' : ''}
              placeholder="00"
              name="hour"
              type="text"
              onChange={e => setStartHour(e.target.value)}
              containerStyle={{
                width: '80px',
                height: '40px',
              }}
            />
            :
            <Input
              pattern="\d*"
              mask="minute"
              defaultValue={startMinute !== '' ? '00' : ''}
              placeholder="00"
              onChange={e => setStartMinute(e.target.value)}
              name="minutes"
              type="text"
              containerStyle={{
                width: '80px',
                height: '40px',
              }}
            />
          </RollContainer>
          <button type="submit">Salvar</button>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default SetTimeWindow;
