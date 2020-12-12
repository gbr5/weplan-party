import React, { memo } from 'react';

import IEventDTO from '../../dtos/IEventDTO';

import { Container, EventDate } from './styles';
// import api from '../../services/api';
// import { useToast } from '../../hooks/toast';

interface IPropsDTO {
  event: IEventDTO;
  // refreshEvents: Function;
}

const EventCard: React.FC<IPropsDTO> = ({
  event,
}: // refreshEvents,
IPropsDTO) => {
  // const { addToast } = useToast();

  let eventMessage = '';
  if (event.daysTillDate) {
    if (event.daysTillDate === 0) {
      eventMessage = `${event.name} é HOJE!!`;
    } else {
      eventMessage =
        event.daysTillDate > 0
          ? `Faltam ${event.daysTillDate} dias para o seu evento!`
          : 'Este evento já aconteceu!';
    }
  }

  return (
    <Container key={event.id}>
      <div>
        <h1>{event.name}</h1>
      </div>
      <EventDate title={eventMessage}>
        <h3>{event.date}</h3>
      </EventDate>
    </Container>
  );
};

export default memo(EventCard);
