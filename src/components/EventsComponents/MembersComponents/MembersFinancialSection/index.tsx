import React, { useState } from 'react';
import { MenuBooleanButton } from '../../../MenuBooleanButton';

import {
  Container,
  Body,
  MenuContainer,
  MenuButton,
  MenuTitle,
} from './styles';

export function MembersFinancialSection(): JSX.Element {
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
