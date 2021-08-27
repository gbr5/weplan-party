import React, { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
}

export function CloseButton({ closeFunction }: IProps): ReactElement {
  return (
    <Container onClick={closeFunction}>
      <FiPlus size={30} />
    </Container>
  );
}
