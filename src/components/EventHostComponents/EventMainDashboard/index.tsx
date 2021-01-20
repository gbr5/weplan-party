import React from 'react';
import IEventDTO from '../../../dtos/IEventDTO';
import IUserDTO from '../../../dtos/IUserDTO';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';

import { Container } from './styles';

interface IProps {
  event: IEventDTO;
  master: IUserDTO;
}

const EventMainDashboard: React.FC<IProps> = ({ event, master }: IProps) => {
  return (
    <Container>
      <FirstSection event={event} master={master} />
      <SecondSection event={event} />
    </Container>
  );
};

export default EventMainDashboard;
