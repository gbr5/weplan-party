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
  gap: 2vh;
  animation: ${appearFromTop} 0.5s;
  padding: 1vh;

  @media (max-width: 1000px) {
    display: block;
  }

  img {
    width: 300px;
    height: 300px;
    margin: auto;

    @media (max-width: 1000px) {
      margin-top: 2px;
      width: 100%;
    }
  }

  div {
    /* border: 1px solid rgba(255, 255, 255,0.5); */
    /* border-radius: 8px; */
    height: 300px;
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    padding: 1vh;
    overflow-y: scroll;

    h1 {
      border-bottom: 1px solid var(--title-color);
      width: 100%;
      text-align: center;
      margin: 2vh auto 4vh;
    }

    span {
      display: grid;
      grid-template-columns: 2fr 3fr;
      align-items: stretch;
      justify-content: stretch;
      gap: 2vh;
      margin: 2vh auto;

      p {
        font-size: 14px;
      }
    }

    @media (max-width: 1000px) {
      margin: 1vh auto 2vh;
      padding: 0;
      border-bottom: 1px solid var(--secondary-color);
    }
  }
`;
