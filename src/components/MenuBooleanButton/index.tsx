import React from 'react';
import { ReactElement } from 'react';

import { Container, MenuButton, MenuText } from './styles';

interface IProps {
  firstActive: boolean;
  firstLabel: string;
  firstFunction: () => void;
  secondLabel: string;
  secondFunction: () => void;
}

export function MenuBooleanButton({
  firstActive,
  firstFunction,
  firstLabel,
  secondFunction,
  secondLabel,
}: IProps): ReactElement {
  return (
    <Container>
      <MenuButton onClick={firstFunction} isActive={firstActive}>
        <MenuText isActive={firstActive}>{firstLabel}</MenuText>
      </MenuButton>
      <MenuButton onClick={secondFunction} isActive={!firstActive}>
        <MenuText isActive={!firstActive}>{secondLabel}</MenuText>
      </MenuButton>
    </Container>
  );
}
