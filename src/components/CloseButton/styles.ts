import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: var(--letter-color-1);
  color: var(--red-color);
  border-radius: 16px;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transform: rotateZ(45deg);
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
`;
