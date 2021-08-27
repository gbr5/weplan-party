import styled, { keyframes } from 'styled-components';
import '../../../styles/global';

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
  top: -100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  gap: 80px;
  margin-top: 2vh;

  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    display: inline-flexbox;
    width: 100%;
    align-items: stretch;
    justify-content: center;
    border-radius: 0;
  }
  div {
    display: flex;
    width: 130px;
    height: 130px;
    border: 3px solid var(--primary-color);
    background: var(--header-background-color);
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    /* @media (max-width: 1000px) {
      border-radius: 8px;
    } */

    &:hover {
      opacity: 0.7;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }

      h2 {
        font-size: 16px;
        color: var(--title-color);
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: var(--letter-color-3);
      }
    }
  }
`;
