import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-440px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 8px;
  background: var(--card-color);
  height: 400px;
  box-sizing: border-box;
  animation: ${appearFromTop} 1s;
`;
