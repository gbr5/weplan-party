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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > input {
    height: 40px;
    min-height: 40px;
    width: 150px;
    border-radius: 8px;
    border: none;
    background: var(--background-color);
    color: var(--letter-color-4);
  }

  > ul {
    overflow-y: scroll;
  }

  > li {
    font-size: 16px;
    font-weight: 500;
  }

  > li:first-child {
    margin-top: 200px;
  }
`;

export const FriendGroupWindow = styled.div`
  position: fixed;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;
  overflow-y: scroll;

  animation: ${appearFromTop} 0.5s;
`;
