import styled, { keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  /* 40% {
    opacity: 0.5;
    transform: translateY(-100px);
  }
  80% {
    opacity: 0.9;
    transform: translateY(-50px);
  } */
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;

  @media (max-width: 1000px) {
    overflow-y: scroll;
    display: block;
  }

  animation: ${appearFromTop} 0.5s;

  > form {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: 24px;
    }
  }

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;

    svg {
      color: red;
    }
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;

    button {
      background: var(--primary-color);
      color: var(--letter-color-5);
      font-weight: 500;
      font-size: 24px;
      border: none;
      border-radius: 8px;
      height: 40px;
      width: 100%;
      box-shadow: var(--box-shadow);
    }

    /* &:hover {
      color: var(--primary-color);
      box-shadow: 2px 2px 5px 1px var(--title-color);
      border-radius: 8px;
      opacity: 0.8;
    } */
  }
`;
