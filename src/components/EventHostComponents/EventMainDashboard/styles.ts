import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
export const Container = styled.div`
  width: 100%;
  flex: 1;
  display: block;
  align-items: center;
  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    /* padding: 2vw; */
  }
`;
