import React from 'react';

import {
  Container,
  Title,
  EventTypeButton,
  EventTypeButtonText,
} from './styles';

interface IProps {
  selectEventType: (type: string) => void;
  eventType: string;
}

export function SelectEventType({
  eventType,
  selectEventType,
}: IProps): JSX.Element {
  return (
    <Container>
      <Title>Selecione o tipo de evento</Title>
      <EventTypeButton
        onClick={() => selectEventType('Wedding')}
        isActive={eventType === 'Wedding'}
      >
        <EventTypeButtonText isActive={eventType === 'Wedding'}>
          Casamento
        </EventTypeButtonText>
      </EventTypeButton>
      <EventTypeButton
        onClick={() => selectEventType('Prom')}
        isActive={eventType === 'Prom'}
      >
        <EventTypeButtonText isActive={eventType === 'Prom'}>
          Formatura
        </EventTypeButtonText>
      </EventTypeButton>
      <EventTypeButton
        onClick={() => selectEventType('Others')}
        isActive={eventType === 'Others'}
      >
        <EventTypeButtonText isActive={eventType === 'Others'}>
          Outros
        </EventTypeButtonText>
      </EventTypeButton>
    </Container>
  );
}
