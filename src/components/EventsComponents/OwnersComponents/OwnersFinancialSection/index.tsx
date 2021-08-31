import React, { useState } from 'react';
import { MenuBooleanButton } from '../../../MenuBooleanButton';

import {
  Container,
  MenuContainer,
  MenuButton,
  MenuTitle,
  Body,
} from './styles';

export function OwnersFinancialSection(): JSX.Element {
  const [financialSection, setFinancialSection] = useState('Contracts');

  function handleFinancialSection(data: string): void {
    setFinancialSection(data);
  }

  return (
    <Container>
      <MenuBooleanButton
        firstActive={financialSection === 'Contracts'}
        firstFunction={() => handleFinancialSection('Contracts')}
        firstLabel="Contratos"
        secondFunction={() => handleFinancialSection('Contracts')}
        secondLabel="Transações"
      />
      <Body />
    </Container>
  );
}
