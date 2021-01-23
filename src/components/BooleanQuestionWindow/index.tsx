import React, { MouseEventHandler } from 'react';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  selectBooleanOption: Function;
  question: string;
}

const BooleanQuestionWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  selectBooleanOption,
  question,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 40,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <h1>{question}</h1>
        <div>
          <button type="button" onClick={() => selectBooleanOption(true)}>
            Sim
          </button>
          <button type="button" onClick={() => selectBooleanOption(false)}>
            Não
          </button>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default BooleanQuestionWindow;
