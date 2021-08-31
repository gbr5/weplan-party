import React from 'react';
import { FiDollarSign, FiHome, FiUsers } from 'react-icons/fi';

import { Container, MenuButton, MenuText } from './styles';

interface IProps {
  section: string;
  handleSection: (section: string) => void;
}

export function OwnersFooterMenu({
  handleSection,
  section,
}: IProps): JSX.Element {
  const iconSize = 24;
  return (
    <Container>
      <MenuButton
        isActive={section === 'Owners'}
        onClick={() => handleSection('Owners')}
      >
        <MenuText>Anfitriões</MenuText>
        <FiUsers size={iconSize} />
      </MenuButton>
      <MenuButton
        isActive={section === 'Main'}
        onClick={() => handleSection('Main')}
      >
        <MenuText>Principal</MenuText>
        <FiHome size={iconSize} />
      </MenuButton>
      <MenuButton
        isActive={section === 'Financial'}
        onClick={() => handleSection('Financial')}
      >
        <MenuText>Financeiro</MenuText>
        <FiDollarSign size={iconSize} />
      </MenuButton>
    </Container>
  );
}
