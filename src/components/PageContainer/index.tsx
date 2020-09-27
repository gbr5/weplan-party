import React, { HTMLAttributes, MouseEventHandler } from 'react';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow?: MouseEventHandler;
}

const PageContainer: React.FC<PageContainerProps> = props => {
  const { containerStyle = {}, onHandleCloseWindow, children } = props;
  return (
    <Container style={containerStyle}>
      {onHandleCloseWindow && (
        <button type="button" onClick={onHandleCloseWindow}>
          <MdClose size={30} />
        </button>
      )}
      {children}
    </Container>
  );
};

export default PageContainer;
