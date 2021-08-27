import React, { ReactElement } from 'react';

import { FirstSection } from './FirstSection';
import { SecondSection } from './SecondSection';

import { Container } from './styles';

interface IProps {
  currentNumberOfGuests: number;
}

export function EventMainDashboard(): ReactElement {
  return (
    <Container>
      <FirstSection />
      <SecondSection />
    </Container>
  );
}
