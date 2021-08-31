import React from 'react';
import { AddButton } from '../AddButton';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

interface IProps {
  title: string;
  handleInfoButton: () => void;
  handleAddButton: () => void;
}

export function SectionHeader({
  title,
  handleAddButton,
  handleInfoButton,
}: IProps): JSX.Element {
  return (
    <Container>
      <WindowHeader title={title} />
      <AddButton onClick={handleAddButton} top="0%" right="2%" />
    </Container>
  );
}
