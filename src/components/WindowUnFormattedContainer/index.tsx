import React, { HTMLAttributes, MouseEventHandler } from 'react';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

interface WindowUnFormattedContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow: MouseEventHandler;
  // children: ;
}

const WindowUnFormattedContainer: React.FC<WindowUnFormattedContainerProps> = props => {
  const { containerStyle = {}, onHandleCloseWindow, children } = props;
  return (
    <Container style={containerStyle}>
      <header>
        <button type="button" onClick={onHandleCloseWindow}>
          <MdClose size={40} />
        </button>
      </header>
      {children}
    </Container>
  );
};

export default WindowUnFormattedContainer;
