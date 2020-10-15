import React from 'react';

import { Container } from './styles';
import FunnelStage from '../FunnelStage';

const Funnel: React.FC = ({ children }) => {
  return (
    <Container>
      <FunnelStage>{children}</FunnelStage>
      <FunnelStage>{children}</FunnelStage>
      <FunnelStage>{children}</FunnelStage>
      <FunnelStage>{children}</FunnelStage>
      <FunnelStage>{children}</FunnelStage>
    </Container>
  );
};

export default Funnel;
