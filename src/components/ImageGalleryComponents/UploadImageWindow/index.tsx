import React from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
}

const UploadImageWindow: React.FC<IProps> = ({ closeWindow }: IProps) => {
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 20,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <h1>Upload de Imagens</h1>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default UploadImageWindow;
