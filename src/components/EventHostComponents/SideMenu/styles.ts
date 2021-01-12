import styled, { keyframes } from 'styled-components';
import '../../../styles/global';

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
  z-index: 5;
  position: fixed;
  top: 0px;
  left: 0;
  border-radius: 0 8px 8px 0;
  margin: 32px 0 0 0;
  background: var(--header-background-color);
  width: 22%;
  min-width: 220px;
  height: 100%;
  padding: 86px 16px 11px;
  display: flex;
  flex-direction: column;

  animation: ${appearFromLeft} 0.5s;

  @media (max-width: 1000px) {
    width: 70%;
    overflow-y: scroll;
    padding-bottom: 8vh;
  }

  > button {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    color: var(--letter-color-2);
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    position: relative;
    gap: 16px;

    > h5 {
      font-size: 22px;
      color: var(--title-color);
      display: flex;
      justify-content: center;
      align-items: unset;
      margin-top: 16px;
      margin-bottom: 16px;

      > svg {
        color: var(--title-color);
        opacity: 0.3;
      }
    }

    > h1 {
      left: 0;
      font-size: 20px;
      color: var(--primary-color);
      margin: 8px 0 4px;
      opacity: 0.9;
    }

    > h3 {
      left: 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--title-color);
      margin: 8px 0 4px;
      opacity: 0.9;
    }

    svg {
      position: absolute;
      color: var(--primary-color);
      right: 0;
      margin: 6px 0 4px;
    }

    &:hover {
      opacity: 0.8;

      > h5 {
        > svg {
          opacity: 1;
        }
      }
    }
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
    margin-bottom: 8px;

    > button {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: center;

      &:hover {
        opacity: 0.8;
      }
      h2 {
        font-size: 18px;
        color: var(--letter-color-3);
      }

      h3 {
        font-size: 18px;
        color: var(--letter-color-2);
      }
    }

    p {
      margin-right: auto;
      margin-top: 8px;
      margin-top: 4px;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;
