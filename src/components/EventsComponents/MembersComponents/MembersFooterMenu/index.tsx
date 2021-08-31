import React from 'react';
import { FiDollarSign, FiHome, FiUsers } from 'react-icons/fi';

import { Container, MenuButton, MenuText } from './styles';

interface IProps {
  section: string;
  handleSection: (section: string) => void;
}

export function MembersFooterMenu({
  handleSection,
  section,
}: IProps): JSX.Element {
  const iconSize = 30;
  return (
    <Container>
      <MenuButton
        isActive={section === 'Members'}
        onClick={() => handleSection('Members')}
      >
        <MenuText>Membros</MenuText>
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
