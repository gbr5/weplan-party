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
  /* padding: 2rem; */
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  justify-content: stretch;
  gap: 4vw;
  animation: ${appearFromTop} 0.5s;
  padding: 1vh;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }

  div {
    display: flex;

    border: 1px solid rgba(255, 255, 255,0.5);
    border-radius: 8px;
    height: 300px;
    width: 300px;
  }
`;
