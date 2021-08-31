import React from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
  addNewImage: Function;
  selectExistingImage: Function;
}

const AddImageQuestion: React.FC<IProps> = ({
  closeWindow,
  addNewImage,
  selectExistingImage,
}: IProps) => {
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
      zIndex={14}
    >
      <Container>
        <h3>
          Deseja adicionar uma nova foto, ou selecionar dentre as fotos
          existentes?
        </h3>

        <div>
          <button type="button" onClick={() => selectExistingImage()}>
            Selecionar Existente
          </button>
          <button type="button" onClick={() => addNewImage()}>
            Adicionar Nova
          </button>
        </div>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default AddImageQuestion;
