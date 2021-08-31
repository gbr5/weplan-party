import React, { MouseEventHandler } from 'react';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  selectEventType: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const EventTypeWindow: React.FC<IProps> = ({
  selectEventType,
  onHandleCloseWindow,
}: IProps) => {
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 16,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
      zIndex={15}
    >
      <Container>
        <button type="button" onClick={() => selectEventType('Wedding')}>
          Casamento
        </button>
        <button type="button" onClick={() => selectEventType('Prom')}>
          Formatura
        </button>
        <button type="button" onClick={() => selectEventType('Birthday')}>
          Aniversário
        </button>

        <button type="button" onClick={() => selectEventType('Sweet_15')}>
          15 Anos
        </button>
        <button type="button" onClick={() => selectEventType('Sweet_16')}>
          Sweet 16
        </button>
        <button
          type="button"
          onClick={() => selectEventType('Wedding_Anniversary')}
        >
          Bodas
        </button>

        <button type="button" onClick={() => selectEventType('Corporate')}>
          Corporativo
        </button>
        <button type="button" onClick={() => selectEventType('Christmas')}>
          Natal
        </button>
        <button type="button" onClick={() => selectEventType('New_Year')}>
          Reveillón
        </button>

        <button type="button" onClick={() => selectEventType('Baptism')}>
          Batismo
        </button>
        <button type="button" onClick={() => selectEventType('Hanukkah')}>
          Hanukkah
        </button>
        <button type="button" onClick={() => selectEventType('Others')}>
          Outros
        </button>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default EventTypeWindow;
