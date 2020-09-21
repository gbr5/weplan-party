import React, { HTMLAttributes, MouseEventHandler } from 'react';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

interface WindowContainerProps extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow: MouseEventHandler;
  // children: ;
}

const WindowContainer: React.FC<WindowContainerProps> = (
  { containerStyle = {}, onHandleCloseWindow },
  { children },
) => {
  return (
    <Container style={containerStyle}>
      <button type="button" onClick={onHandleCloseWindow}>
        <MdClose size={30} />
      </button>
      {children}
    </Container>
  );
};

export default WindowContainer;
