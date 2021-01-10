import React from 'react';

import { Container } from './styles';

interface IProps {
  onClick: Function;
}

const Backdrop: React.FC<IProps> = ({ onClick }: IProps) => {
  return <Container onClick={() => onClick()} />;
};

export default Backdrop;
