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
  align-items: stretch;
  justify-content: stretch;
  padding: 32px;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  width: 100%;
  animation: ${appearFromTop} 0.5s;

  header {
    position: absolute;
    top: 16px;
    right: 16px;

    button {
      background: transparent;
      border: none;
      border-radius: 10px;
      transition: 0.5s;
      padding: 3px 1px 0 2px;

      &:hover {
        border-radius: 50%;
        background: rgba(150, 70, 70, 0.3);
        font-weight: 600;
        border: 0.5px solid var(--title-color);
        opacity: 0.8;
        box-shadow: var(--box-shadow);
      }
      svg {
        color: red;
        transition: 0.5s;

        &:hover {
          color: rgba(255, 10, 5);
        }
      }
    }
  }
`;
