import React, { MouseEventHandler } from 'react';

import { BooleanButton, Container } from './styles';

interface IProps {
  firstLabel: string;
  secondLabel: string;
  firstActive: boolean;
  firstClick: MouseEventHandler;
  secondClick: MouseEventHandler;
}

const BooleanButtonContainer: React.FC<IProps> = ({
  firstLabel,
  secondLabel,
  firstActive,
  firstClick,
  secondClick,
}: IProps) => {
  return (
    <Container>
      <BooleanButton type="button" isActive={firstActive} onClick={firstClick}>
        {firstLabel}
      </BooleanButton>
      <BooleanButton
        type="button"
        isActive={!firstActive}
        onClick={secondClick}
      >
        {secondLabel}
      </BooleanButton>
    </Container>
  );
};

export default BooleanButtonContainer;
