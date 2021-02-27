import React, { memo, useEffect } from 'react';

import { Container } from './styles';

interface IProps {
  number: number;
  id: string;
  onScroll: (e: WheelEvent) => void;
}

const Panel: React.FC<IProps> = ({ number, id, onScroll }: IProps) => {
  const numbers = String(number).padStart(2, '0').split('');

  useEffect(() => {
    document
      .getElementById(id)
      ?.addEventListener('wheel', onScroll, { passive: true });
  }, [onScroll, id]);
  return (
    <Container id={id}>
      <strong>{numbers[0]}</strong>
      <strong>{numbers[1]}</strong>
    </Container>
  );
};

export default memo(Panel);
