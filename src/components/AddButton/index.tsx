import React from 'react';
import { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container } from './styles';

interface IProps {
  top: string;
  right: string;
  onClick: () => void;
}

export function AddButton({ top, right, onClick }: IProps): ReactElement {
  return (
    <Container
      style={{
        top: `${top}`,
        right: `${right}`,
      }}
      onClick={onClick}
    >
      <FiPlus size={32} color="#000" />
    </Container>
  );
}
