import React, { ReactElement } from 'react';

import { Container, OverTitle, Title, TitleUnderline } from './styles';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  overTitle?: string;
  title: string;
}

export function WindowHeader({ title, overTitle }: IProps): ReactElement {
  return (
    <Container>
      {overTitle && <OverTitle>{overTitle}</OverTitle>}
      <Title>{title}</Title>
      <TitleUnderline />
    </Container>
  );
}
