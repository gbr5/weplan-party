import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  display: flex;
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
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;
