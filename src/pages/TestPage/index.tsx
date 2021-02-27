import React from 'react';
import DigitalClock from '../../functionalComponents/DigitalClock';

import { Container } from './styles';

const TestPage: React.FC = () => {
  return (
    <Container>
      <DigitalClock />
    </Container>
  );
};

export default TestPage;
