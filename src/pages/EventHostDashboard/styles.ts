import styled, { keyframes } from 'styled-components';
import '../../styles/global';

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

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  animation: ${appearFromTop} 0.5s;

  margin-bottom: 4vh;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 80px;
  gap: 80px;
  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    padding: 0 2vw;
    gap: 0;
  }

  > button {
    z-index: 5;
    background: transparent;
    border: none;
    border-radius: 8px;
    position: fixed;
    top: 100px;
    left: -8px;
    transition: 0.25s;

    color: var(--primary-color);

    &:hover {
      color: var(--letter-color-4);
    }
  }

  > span {
    > button {
      z-index: 5;
      background: transparent;
      border: none;
      border-radius: 8px;
      position: fixed;
      top: 100px;
      left: 22%;
      transition: 0.25s;

      color: var(--letter-color-4);
      animation: ${appearFromLeft} 0.5s;

      @media (max-width: 1000px) {
        left: 70%;
      }
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 150px;
  position: relative;

  > button {
    z-index: 5;
    position: fixed;
    top: 5vh;
    left: 47.7%;
    background: transparent;
    border: none;
    transition: 0.25s;

    > svg {
      color: var(--primary-color);
      transition: 0.25s;

      &:hover {
        color: var(--letter-color-4);
      }
    }
  }

  > span {
    > button {
      z-index: 5;
      position: absolute;
      top: 4vh;
      left: 47.5%;
      background: transparent;
      border: none;
      transition: 0.25s;
      animation: ${appearFromTop} 0.5s;

      > svg {
        color: var(--letter-color-4);
        transition: 0.25s;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;
