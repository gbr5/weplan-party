/* eslint-disable react/require-default-props */
import React, { ReactElement } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container } from './styles';

interface IStyle {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}
interface IProps {
  closeFunction: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  style?: IStyle;
}

export function CloseButton({ closeFunction, style }: IProps): ReactElement {
  return (
    <Container style={style} onClick={closeFunction}>
      <FiPlus size={30} />
    </Container>
  );
}
