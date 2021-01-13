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
  display: inline-flexbox;
  align-items: stretch;
  justify-content: stretch;
  gap: 4vw;
  animation: ${appearFromTop} 0.5s;
  padding: 1vh;

  /* @media (max-width: 1000px) { */
  overflow-x: scroll;
  /* } */
`;

export const Section = styled.div`
  width: 360px;
  height: 400px;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 2vh;
  border: 1px solid rgba(255, 255, 255, 0.5);

  h1 {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
    text-align: center;
    margin: 2vh auto 4vh;
  }

  span {
    display: flex;
    gap: 2vh;
    width: 100%;

    p {
      width: 100%;
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    margin: 1vh auto 2vh;
    padding: 0;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
