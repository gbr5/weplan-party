import React from 'react';
import IEventDTO from '../../../dtos/IEventDTO';
import IUserDTO from '../../../dtos/IUserDTO';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';

import { Container } from './styles';

interface IProps {
  event: IEventDTO;
  master: IUserDTO;
  getEvents: Function;
}

const EventMainDashboard: React.FC<IProps> = ({
  event,
  master,
  getEvents,
}: IProps) => {
  return (
    <Container>
      <FirstSection getEvents={getEvents} event={event} master={master} />
      <SecondSection />
    </Container>
  );
};

export default EventMainDashboard;
