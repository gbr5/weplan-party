import React from 'react';

import WindowUnFormattedContainer from '../../../components/WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
  deleteEvent: Function;
  question: string;
}

const DeleteEventQuestionWindow: React.FC<IProps> = ({
  closeWindow,
  deleteEvent,
  question,
}: IProps) => {
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 40,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
      zIndex={39}
    >
      <Container>
        <h1>{question}</h1>
        <div>
          <button type="button" onClick={() => deleteEvent(true)}>
            Sim
          </button>
          <button type="button" onClick={() => closeWindow()}>
            Não
          </button>
        </div>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default DeleteEventQuestionWindow;
