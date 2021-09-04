import React, { useEffect } from 'react';
import { Container } from './styles';
import { useEvent } from '../../../hooks/event';
import { EventButton } from '../../EventHostComponents/EventButton';

export function MyNextEventSection(): JSX.Element {
  const { nextEvent, getNextEvent } = useEvent();

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

  return (
    <Container>
      {nextEvent && nextEvent.id ? (
        <EventButton event={nextEvent} />
      ) : (
        <>
          <strong>Meu próximo evento:</strong>
          <h2>Você não tem nenhum evento futuro.</h2>
          <span>-</span>
        </>
      )}
    </Container>
  );
}
