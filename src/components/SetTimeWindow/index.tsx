import React, { useCallback, useState } from 'react';
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
  const [startMinute, setStartMinute] = useState('');
  const [startHour, setStartHour] = useState('');
  const handleSubmit = useCallback(() => {
    const time = `${startHour}:${startMinute}`;
    console.log(`${startHour}:${startMinute}`);
    setTime(time);
  }, [setTime, startHour, startMinute]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={containerStyle}
    >
      <Container>
        <h2>{message}</h2>
        <RollContainer>
          <Input
            mask="hour"
            pattern="\d*"
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
        <button type="button" onClick={handleSubmit}>
          Salvar
        </button>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SetTimeWindow;
