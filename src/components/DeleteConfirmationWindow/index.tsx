/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { MouseEventHandler } from 'react';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleDelete: MouseEventHandler;
  title: string;
}

const DeleteConfirmationWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleDelete,
  title,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 50,
        top: '25%',
        left: '0%',
        height: '50%',
        width: '100%',
      }}
    >
      <Container>
        <h1>{title}</h1>
        <div>
          <button type="button" onClick={handleDelete}>
            Sim
          </button>
          <button type="button" onClick={onHandleCloseWindow}>
            Não
          </button>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default DeleteConfirmationWindow;
