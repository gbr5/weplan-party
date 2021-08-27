import React, { MouseEventHandler } from 'react';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleDelete: MouseEventHandler;
}

const DeleteConfirmationWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleDelete,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 50,
        top: '25%',
        left: '30%',
        height: '50%',
        width: '40%',
      }}
    >
      <Container>
        <h1>Confirma que deseja deletar?</h1>
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
