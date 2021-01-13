import React from 'react';

import FirstSection from './FirstSection';
import SecondSection from './SecondSection';

import { Container } from './styles';

const EventMainDashboard: React.FC = () => {
  return (
    <Container>
      <FirstSection />
      <SecondSection />
    </Container>
  );
};

export default EventMainDashboard;
