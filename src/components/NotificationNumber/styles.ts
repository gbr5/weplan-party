import styled from 'styled-components/';

const iconSize = 32;

export const Container = styled.div`
  position: absolute;
  top: -16px;
  left: -16px;
  border-radius: ${iconSize / 2}px;
  height: ${iconSize}px;
  width: ${iconSize}px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  background-color: var(--red-color);
`;
export const Number = styled.p`
  color: var(--letter-color-1);
  font-size: ${iconSize / 2}px;
`;
