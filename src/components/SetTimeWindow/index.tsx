import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, Roll, RollContainer } from './styles';

interface IProps {
  setTime: Function;
  closeWindow: Function;
  message: string;
}

interface IFormData {
  hour: string;
  minutes: string;
}

const SetTimeWindow: React.FC<IProps> = ({
  setTime,
  message,
  closeWindow,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (e: IFormData) => {
      const time = `${e.hour}:${e.minutes}`;
      setTime(time);
    },
    [setTime],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 20,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>{message}</h2>
          <RollContainer>
            <Roll>
              <h3>Hora</h3>
              <Input mask="hour" placeholder="00" name="hour" type="text" />
            </Roll>
            <Roll>
              <h3>Minutos</h3>
              <Input
                mask="minute"
                placeholder="00"
                name="minutes"
                type="text"
              />
            </Roll>
          </RollContainer>
          <button type="submit">Salvar</button>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default SetTimeWindow;
