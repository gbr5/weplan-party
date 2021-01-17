import React, { useCallback, useState } from 'react';
import IEventDTO from '../../../dtos/IEventDTO';
import IShowEventDTO from '../../../dtos/IShowEventDTO';
import IUserDTO from '../../../dtos/IUserDTO';
import api from '../../../services/api';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';

import { Container } from './styles';

interface IProps {
  event: IEventDTO;
  master: IUserDTO;
}

const EventMainDashboard: React.FC<IProps> = ({ event, master }: IProps) => {
  const [updatedEvent, setUpdatedEvent] = useState({} as IEventDTO);

  const getEvent = useCallback(() => {
    try {
      api.get<IShowEventDTO>(`events/${event.id}`).then(response => {
        setUpdatedEvent(response.data.event);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [event]);

  return (
    <Container>
      {!!updatedEvent && (
        <>
          <FirstSection
            getEvent={getEvent}
            event={updatedEvent}
            master={master}
          />
          <SecondSection event={updatedEvent} />
        </>
      )}
    </Container>
  );
};

export default EventMainDashboard;
