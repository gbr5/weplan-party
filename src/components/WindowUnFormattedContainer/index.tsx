import React, { HTMLAttributes, useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Backdrop from '../Backdrop';

import { Container } from './styles';

interface WindowUnFormattedContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow: Function;
  // children: ;
  zIndex: number;
}

const WindowUnFormattedContainer: React.FC<WindowUnFormattedContainerProps> = props => {
  const { containerStyle = {}, onHandleCloseWindow, children, zIndex } = props;
  const [backdrop, setBackdrop] = useState(true);

  const closeAll = useCallback(() => {
    setBackdrop(false);
    onHandleCloseWindow();
  }, [onHandleCloseWindow]);
  return (
    <>
      {backdrop && <Backdrop zIndex={zIndex} onClick={closeAll} />}
      <Container style={containerStyle}>
        <header>
          <button type="button" onClick={() => closeAll()}>
            <MdClose size={40} />
          </button>
        </header>
        {children}
      </Container>
    </>
  );
};

export default WindowUnFormattedContainer;
