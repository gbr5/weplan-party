/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { Container } from './styles';

interface IProps {
  onClick: Function;
  zIndex?: number;
}

const Backdrop: React.FC<IProps> = ({ onClick, zIndex }: IProps) => {
  return (
    <Container style={{ zIndex: zIndex ?? 2 }} onClick={() => onClick()} />
  );
};

export default Backdrop;
