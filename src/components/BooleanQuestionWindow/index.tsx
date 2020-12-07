import React, { MouseEventHandler } from 'react';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleWeplanUserQuestion: Function;
  question: string;
}

const BooleanQuestionWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleWeplanUserQuestion,
  question,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10000,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Container>
        <h1>{question}</h1>
        <div>
          <button type="button" onClick={() => handleWeplanUserQuestion(true)}>
            Sim
          </button>
          <button type="button" onClick={() => handleWeplanUserQuestion(false)}>
            Não
          </button>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default BooleanQuestionWindow;
